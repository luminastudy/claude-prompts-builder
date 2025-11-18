import type { ClaudeBrainstormData } from '../types'

export function generateClaudeBrainstormUrl(
  data: ClaudeBrainstormData
): string {
  const baseUrl = 'https://claude.ai/new'

  const queryMessage = `I want to learn how to solve this question without getting the final answer.

**Question:** ${data.questionText}
${data.moduleNames && data.moduleNames.length > 0 ? `**Related Topics:** ${data.moduleNames.join(', ')}` : ''}
${data.answerOptions && data.answerOptions.length > 0 ? `**Answer Options:** ${data.answerOptions.join(', ')}` : ''}

Please guide me step by step in ${data.language === 'he' ? 'Hebrew' : 'English'} to understand how to approach this question. Help me analyze the options if they're provided, but don't tell me which one is correct - let me work through the reasoning.`

  const encodedQuery = encodeURIComponent(queryMessage)

  return `${baseUrl}?q=${encodedQuery}`
}
