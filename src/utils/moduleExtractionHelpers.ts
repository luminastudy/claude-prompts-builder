import type { Language } from '../types'
import { isModuleForClaude } from './questionTypeGuards'
import { safeTranslate } from './safeTranslate'

/**
 * Extracts module names from Block relationships with type safety
 */
export function extractModuleNamesFromBlock(
  block: unknown,
  language: Language
): string[] {
  if (
    typeof block !== 'object' ||
    block === null ||
    !('modules' in block) ||
    !Array.isArray((block as Record<string, unknown>)['modules'])
  ) {
    return []
  }

  const blockObj = block as { modules: unknown[] }
  return blockObj['modules']
    .map((module: unknown) => {
      if (isModuleForClaude(module) && module.name) {
        return safeTranslate(module.name, language)
      }
      return null
    })
    .filter((name: string | null): name is string => name !== null)
}

/**
 * Extracts prerequisite module names from Block relationships with type safety
 */
export function extractPrerequisiteNames(
  relationships: unknown[],
  language: Language
): string[] {
  const names: string[] = []

  relationships.forEach(relationship => {
    if (
      typeof relationship === 'object' &&
      relationship !== null &&
      'prerequisite' in relationship
    ) {
      const relationshipObj = relationship as { prerequisite: unknown }
      const moduleNames = extractModuleNamesFromBlock(
        relationshipObj.prerequisite,
        language
      )
      names.push(...moduleNames)
    }
  })

  return [...new Set(names)] // Remove duplicates
}

/**
 * Extracts postrequisite module names from Block relationships with type safety
 */
export function extractPostrequisiteNames(
  relationships: unknown[],
  language: Language
): string[] {
  const names: string[] = []

  relationships.forEach(relationship => {
    if (
      typeof relationship === 'object' &&
      relationship !== null &&
      'postrequisite' in relationship
    ) {
      const relationshipObj = relationship as { postrequisite: unknown }
      const moduleNames = extractModuleNamesFromBlock(
        relationshipObj.postrequisite,
        language
      )
      names.push(...moduleNames)
    }
  })

  return [...new Set(names)] // Remove duplicates
}
