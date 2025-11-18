import type { ClaudeModuleLearningData } from '../types'

/**
 * Generates a Claude URL for learning a specific module with context
 * @param data - The module learning data including prerequisites and context
 * @returns The complete Claude URL with encoded query parameters
 */
export function generateClaudeModuleLearningUrl(
  data: ClaudeModuleLearningData
): string {
  const baseUrl = 'https://claude.ai/new'

  const languageInstruction =
    data.language === 'he'
      ? 'Please respond in Hebrew.'
      : 'Please respond in English.'

  let queryMessage = `${languageInstruction}

I want to learn about the module: **${data.moduleName}**

**Learning Context:**`

  if (data.parentModules.length > 0) {
    queryMessage += `
- This module is part of: ${data.parentModules.join(', ')}`
  }

  if (data.prerequisites.length > 0) {
    queryMessage += `
- Prerequisites I should know first: ${data.prerequisites.join(', ')}`
  }

  if (data.postrequisites.length > 0) {
    queryMessage += `
- After learning this module, I can proceed to: ${data.postrequisites.join(', ')}`
  }

  if (data.subModules.length > 0) {
    queryMessage += `
- This module contains the following topics: ${data.subModules.join(', ')}`
  }

  queryMessage += `

**What I need:**
Please teach me this module step by step. Consider the following:

1. If I haven't learned the prerequisites, briefly explain the key concepts I need to know from them
2. Break down the main concepts of this module in a logical learning sequence
3. Provide practical examples and applications where possible
4. Explain how this module connects to the broader learning path
5. Give me actionable steps to master this topic

Please structure your response as a comprehensive learning guide that I can follow to understand this module thoroughly.`

  const encodedQuery = encodeURIComponent(queryMessage)
  return `${baseUrl}?q=${encodedQuery}`
}
