import type { TranslatedText } from './TranslatedText'

export interface SelectAnswer {
  id?: string
  isCorrect?: boolean
  text?: string | TranslatedText
}

export interface Answer {
  id?: string
  SelectAnswer?: SelectAnswer[]
  selectAnswers?: SelectAnswer[]
}
