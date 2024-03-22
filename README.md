# MeyerOS

A Discord bot that solves your math homework and yells at you for getting it
wrong.

## Development guide

To run locally, set up the project and make sure you have `pnpm` and `bun`
installed.

1. Install dependencies via `pnpm i`.
2. The source code is located in the `src` directory. Make your edits in here.
3. Create a file in the root directory called `.env`. Set an environment
   variable `DISCORD_TOKEN` to your Discord bot token, and the variable
   `ANTHROPIC_KEY` to your Anthropic API key.
4. Run `pnpm start` to run the bot. Bun supports TypeScript natively, so there
   is no need to compile it.
