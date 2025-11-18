import type { Language, TranslatedText } from '../types'
import { translate } from './translate'

// Helper function to safely translate mixed string/object types
export function safeTranslate(
  text: string | TranslatedText | null | undefined,
  language: Language
): string {
  if (typeof text === 'string') {
    return text
  }
  return translate(text, language)
}
