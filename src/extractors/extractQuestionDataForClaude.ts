import type { Question, Module, Language, ClaudeQueryData } from '../types'
import {
  isQuestionForClaude,
  extractCorrectAnswers,
} from '../utils/questionTypeGuards'
import { safeTranslate } from '../utils/safeTranslate'

/**
 * Extracts question data for Claude query generation
 * @param question - The question object from the API
 * @param userAnswer - The user's submitted answer
 * @param language - The current language setting
 * @returns ClaudeQueryData object ready for URL generation
 */
export function extractQuestionDataForClaude(
  question: Question,
  userAnswer: string | string[],
  language: Language
): ClaudeQueryData {
  const questionText = safeTranslate(question.text, language)
  const moduleNames =
    question.Modules &&
    question.Modules.map((module: Module) =>
      safeTranslate(module.name, language)
    ) !== undefined
      ? question.Modules.map((module: Module) =>
          safeTranslate(module.name, language)
        )
      : []

  // Extract correct answers if available using type-safe methods
  const correctAnswers = isQuestionForClaude(question)
    ? extractCorrectAnswers(question, language)
    : []

  return {
    questionText,
    questionId: question.id,
    userAnswer,
    correctAnswers,
    moduleNames,
    language,
  }
}
