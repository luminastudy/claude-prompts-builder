import type { ClaudeMathCharacterData } from '../types'

/**
 * Generates a Claude URL for explaining mathematical characters in context
 * @param data - The mathematical character and context data
 * @returns The complete Claude URL with encoded query parameters
 */
export function generateClaudeMathCharacterUrl(
  data: ClaudeMathCharacterData
): string {
  const baseUrl = 'https://claude.ai/new'

  const languageInstruction =
    data.language === 'he'
      ? 'Please respond in Hebrew.'
      : 'Please respond in English.'

  const queryMessage = `${languageInstruction}

I found the mathematical symbol "${data.char}" (${data.name}) in this question: "${data.questionText}"

The general meaning of this symbol is: ${data.context}

Can you explain what this symbol specifically means in the context of this question? Please provide:
1. The specific meaning in this context
2. How it relates to the mathematical concept being discussed
3. Any relevant formulas or equations where this symbol is commonly used

Keep the explanation concise but educational, suitable for a student learning this topic.`

  const encodedQuery = encodeURIComponent(queryMessage)

  return `${baseUrl}?q=${encodedQuery}`
}
