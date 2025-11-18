import type { ClaudeQueryData } from '../types'

/**
 * Generates a Claude query URL with all relevant question data
 * @param data - The question and answer data to include in the query
 * @returns The complete Claude URL with encoded query parameters
 */
export function generateClaudeUrl(data: ClaudeQueryData): string {
  const baseUrl = 'https://claude.ai/new'

  // Construct the query message for Claude
  const queryMessage = `I need help understanding this question and my answer:

**Question:** ${data.questionText}
${data.moduleNames && data.moduleNames.length > 0 ? `**Related Topics:** ${data.moduleNames.join(', ')}` : ''}

**My Answer:** ${Array.isArray(data.userAnswer) ? data.userAnswer.join(', ') : data.userAnswer}
${data.correctAnswers && data.correctAnswers.length > 0 ? `**Correct Answer(s):** ${data.correctAnswers.join(', ')}` : ''}

**Language:** ${data.language}

Please help me understand:
1. Why my answer might be incorrect (if it is)
2. What the correct approach to this question should be
3. Any key concepts I might be missing
4. How I can improve my understanding of this topic

Please explain in ${data.language === 'he' ? 'Hebrew' : 'English'}.`

  // URL encode the query message
  const encodedQuery = encodeURIComponent(queryMessage)

  return `${baseUrl}?q=${encodedQuery}`
}
