import type { Module, Language, ClaudeModuleLearningData } from '../types'
import { isModuleForClaude } from '../utils/questionTypeGuards'
import { safeTranslate } from '../utils/safeTranslate'
import {
  extractPrerequisiteNames,
  extractPostrequisiteNames,
} from '../utils/moduleExtractionHelpers'

/**
 * Extracts module data for Claude learning URL generation
 * @param module - The module object from the API
 * @param language - The current language setting
 * @returns ClaudeModuleLearningData object ready for URL generation
 */
export function extractModuleDataForClaude(
  module: Module,
  language: Language
): ClaudeModuleLearningData {
  const moduleName = safeTranslate(module.name, language)

  // Extract prerequisites from Block relationships with type safety
  const prerequisites =
    module.Block &&
    module.Block.postrequisiteOf &&
    Array.isArray(module.Block.postrequisiteOf)
      ? extractPrerequisiteNames(module.Block.postrequisiteOf, language)
      : []

  // Extract postrequisites from Block relationships with type safety
  const postrequisites =
    module.Block &&
    module.Block.prerequisiteFor &&
    Array.isArray(module.Block.prerequisiteFor)
      ? extractPostrequisiteNames(module.Block.prerequisiteFor, language)
      : []

  // Extract parent modules if available with type safety
  const parentModules =
    module.parentModules && Array.isArray(module.parentModules)
      ? module.parentModules
          .filter(isModuleForClaude)
          .map(parent => safeTranslate(parent.name, language))
      : []

  // Extract sub-modules if available with type safety
  const subModules =
    module.subModules && Array.isArray(module.subModules)
      ? module.subModules
          .filter(isModuleForClaude)
          .map(subModule => safeTranslate(subModule.name, language))
      : []

  return {
    moduleName,
    prerequisites,
    postrequisites,
    parentModules,
    subModules,
    language,
  }
}
