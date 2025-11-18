import type { Question, Module, Language, ClaudeBrainstormData } from '../types'
import {
  isQuestionForClaude,
  extractAnswerOptions,
} from '../utils/questionTypeGuards'
import { safeTranslate } from '../utils/safeTranslate'

export function extractQuestionDataForBrainstorm(
  question: Question,
  language: Language
): ClaudeBrainstormData {
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

  // Extract all answer options (without indicating which are correct) using type-safe methods
  const answerOptions = isQuestionForClaude(question)
    ? extractAnswerOptions(question, language)
    : []

  return {
    questionText,
    moduleNames,
    answerOptions,
    language,
  }
}
