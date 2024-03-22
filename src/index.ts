import {
  Client,
  Events,
  GatewayIntentBits,
  SlashCommandBuilder,
  REST,
  Routes,
} from 'discord.js'
import { solve } from './solve'
import * as dotenv from 'dotenv'

dotenv.config()

const TOKEN = process.env.DISCORD_TOKEN

if (!TOKEN) {
  throw new Error('Missing DISCORD_TOKEN environment variable')
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

const solveCommand = new SlashCommandBuilder()
  .setName('solve')
  .setDescription('Solves a given problem')
  .addStringOption((option) =>
    option
      .setName('problem')
      .setDescription('The problem to solve')
      .setRequired(true)
  )

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return

  if (interaction.commandName === 'solve') {
    const problem = interaction.options.getString('problem')
    if (problem) {
      // Use the 'problem' string for further processing
      console.log('Problem to solve:', problem)
      // Add your solving logic here
      try {
        await interaction.deferReply()

        const solution = await solve(problem)
        await interaction.editReply(solution)
      } catch (error) {
        console.error(error)
        await interaction.reply('An error occurred while solving the problem.')
      }
    } else {
      await interaction.reply('Please provide a problem to solve.')
    }
  }
})

const rest = new REST({ version: '10' }).setToken(TOKEN)

client.once(Events.ClientReady, async (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`)

  try {
    console.log('Started refreshing application (/) commands.')

    client.user &&
      (await rest.put(Routes.applicationCommands(client.user.id), {
        body: [solveCommand.toJSON()],
      }))

    console.log('Successfully reloaded application (/) commands.')
  } catch (error) {
    console.error(error)
  }
})

client.login(TOKEN)
