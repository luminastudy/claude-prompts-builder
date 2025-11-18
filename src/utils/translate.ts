import type { TranslatedText, Language } from '../types'

/**
 * Return text for the requested language.
 * Fails gracefully (returns empty string) when translation data is missing instead of throwing.
 * This avoids bubbling runtime errors into the UI when responses are still partial
 * or a specific entity has a missing translation row.
 */
export const translate = (
  translation: TranslatedText | undefined | null,
  language: Language
): string => {
  if (!translation) {
    return ''
  }
  const { en_text: enText, he_text: heText } = translation
  return language === 'he' ? heText : enText
}
