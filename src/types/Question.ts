import type { TranslatedText } from './TranslatedText'
import type { Module } from './Module'
import type { Answer } from './Answer'

export interface Question {
  id: string
  text: string | TranslatedText
  Modules?: Module[]
  Answer?: Answer[]
}
