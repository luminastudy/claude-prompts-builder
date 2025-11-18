import type { Question, Module, Language } from '../types'

// Type guard for Answer structure with SelectAnswer/selectAnswers
function hasSelectAnswers(answer: unknown): answer is {
  SelectAnswer?: unknown[]
  selectAnswers?: unknown[]
} {
  return (
    typeof answer === 'object' &&
    answer !== null &&
    (('SelectAnswer' in answer &&
      Array.isArray((answer as { SelectAnswer?: unknown }).SelectAnswer)) ||
      ('selectAnswers' in answer &&
        Array.isArray((answer as { selectAnswers?: unknown }).selectAnswers)))
  )
}

// Type guard for SelectAnswer with correct structure
function isSelectAnswerWithCorrectFlag(selectAnswer: unknown): selectAnswer is {
  isCorrect?: boolean
  text?: unknown
} {
  return (
    typeof selectAnswer === 'object' &&
    selectAnswer !== null &&
    'isCorrect' in selectAnswer
  )
}

// Type guard for SelectAnswer text with Translation structure
function hasTranslationText(selectAnswer: { text?: unknown }): selectAnswer is {
  text: {
    he_text?: string
    en_text?: string
  }
} {
  return Boolean(
    selectAnswer.text &&
      typeof selectAnswer.text === 'object' &&
      selectAnswer.text !== null
  )
}

// Type guard for legacy text structure
function hasStringText(selectAnswer: { text?: unknown }): selectAnswer is {
  text: string
} {
  return typeof selectAnswer.text === 'string'
}

// Type guard for Question with proper structure for Claude URL generation
function isQuestionForClaude(question: unknown): question is Question {
  return (
    typeof question === 'object' &&
    question !== null &&
    'id' in question &&
    typeof (question as { id: unknown }).id === 'string' &&
    'text' in question &&
    (question as { text: unknown }).text !== null
  )
}

// Type guard for Module structure
function isModuleForClaude(module: unknown): module is Module {
  return (
    typeof module === 'object' &&
    module !== null &&
    'name' in module &&
    (module as { name: unknown }).name !== null
  )
}

// Extract correct answers safely from question data
function extractCorrectAnswers(
  question: {
    Answer?: Array<{
      SelectAnswer?: unknown[]
      selectAnswers?: unknown[]
    }>
  },
  language: Language
): string[] {
  if (!question.Answer || !Array.isArray(question.Answer)) {
    return []
  }

  const correctAnswers: string[] = []

  for (const answer of question.Answer) {
    if (!hasSelectAnswers(answer)) continue

    const selectAnswers = answer.SelectAnswer || answer.selectAnswers || []

    for (const selectAnswer of selectAnswers) {
      if (
        !isSelectAnswerWithCorrectFlag(selectAnswer) ||
        !selectAnswer.isCorrect
      ) {
        continue
      }

      let text = ''

      if (hasTranslationText(selectAnswer)) {
        const textObj = selectAnswer.text
        text =
          language === 'he'
            ? textObj.he_text || textObj.en_text || ''
            : textObj.en_text || textObj.he_text || ''
      } else if (hasStringText(selectAnswer)) {
        text = selectAnswer.text
      }

      if (text.length > 0) {
        correctAnswers.push(text)
      }
    }
  }

  return correctAnswers
}

// Extract all answer options safely from question data
function extractAnswerOptions(
  question: {
    Answer?: Array<{
      SelectAnswer?: unknown[]
      selectAnswers?: unknown[]
    }>
  },
  language: Language
): string[] {
  if (!question.Answer || !Array.isArray(question.Answer)) {
    return []
  }

  const answerOptions: string[] = []

  for (const answer of question.Answer) {
    if (!hasSelectAnswers(answer)) continue

    const selectAnswers = answer.SelectAnswer || answer.selectAnswers || []

    for (const selectAnswer of selectAnswers) {
      if (typeof selectAnswer !== 'object' || selectAnswer === null) {
        continue
      }

      let text = ''
      const selectAnswerObj = selectAnswer as { text?: unknown }

      if (hasTranslationText(selectAnswerObj)) {
        const textObj = selectAnswerObj.text
        text =
          language === 'he'
            ? textObj.he_text || textObj.en_text || ''
            : textObj.en_text || textObj.he_text || ''
      } else if (hasStringText(selectAnswerObj)) {
        text = selectAnswerObj.text
      }

      if (text.length > 0) {
        answerOptions.push(text)
      }
    }
  }

  return answerOptions
}

export {
  hasSelectAnswers,
  isSelectAnswerWithCorrectFlag,
  hasTranslationText,
  hasStringText,
  isQuestionForClaude,
  isModuleForClaude,
  extractCorrectAnswers,
  extractAnswerOptions,
}
