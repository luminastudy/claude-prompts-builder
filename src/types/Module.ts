import type { TranslatedText } from './TranslatedText'

export interface Module {
  id?: string
  name: string | TranslatedText
  Block?: {
    postrequisiteOf?: unknown[]
    prerequisiteFor?: unknown[]
  }
  parentModules?: Module[]
  subModules?: Module[]
}
