import type { Language } from './Language'

export interface ClaudeQueryData {
  questionText: string
  questionId: string
  userAnswer: string | string[]
  correctAnswers?: string[]
  moduleNames?: string[]
  language: Language
}

export interface ClaudeBrainstormData {
  questionText: string
  moduleNames?: string[]
  answerOptions?: string[]
  language: Language
}

export interface ClaudeMathCharacterData {
  char: string
  name: string
  context: string
  questionText: string
  language: Language
}

export interface ClaudeModuleLearningData {
  moduleName: string
  prerequisites: string[]
  postrequisites: string[]
  parentModules: string[]
  subModules: string[]
  language: Language
}
