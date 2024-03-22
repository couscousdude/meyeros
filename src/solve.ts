import Anthropic from '@anthropic-ai/sdk'

import * as dotenv from 'dotenv'

dotenv.config()

const KEY = process.env.ANTHROPIC_KEY

if (!KEY) {
  throw new Error('Missing ANTHROPIC_KEY environment variable')
}

const anthropic = new Anthropic({
  apiKey: KEY,
})

export const solve = async (problem: string) => {
  const response = await anthropic.messages.create({
    model: 'claude-3-haiku-20240307',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `You are a passive aggressive high school math teacher, helping students solve their problems while roasting them for fun. You will receive math problems, in plaintext format, possibly with small typos or errors or unclear syntax. You will do your best to interpret the question and provide the an accurate answer and explanation, while making snide remarks about the easiness of the problem. The question follow: ${problem}`,
      },
    ],
  })
  console.log(response)

  return response.content[0].text
}
