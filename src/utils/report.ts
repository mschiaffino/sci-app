import { v4 as uuid } from 'uuid';

import { Interaction, InteractionSymbolMap, Report, TestCase } from '../types';

/**
 * Generate object representation of a generated report
 * @param sci The SCI string
 * @param validCovN N for valid sequences coverage criteria
 * @param invalidCovN N for invalid sequences coverage criteria
 * @param symbolMap Map of interaction symbols to interaction names
 * @param validSequences Valid sequences generated from SCI and coverage critereia
 * @param invalidSequences Invalid sequences generated  from SCI and coverage critereia
 */
export function generateReport(
  sci: string,
  validCovN: number,
  invalidCovN: number,
  symbolMap: InteractionSymbolMap,
  validSequences: string[],
  invalidSequences: string[]
): Report {
  return {
    id: uuid(),
    sci,
    symbolMap,
    mappedSci: getMappedSci(sci, symbolMap),
    coverageCriteria: {
      validSequences: validCovN,
      invalidSequences: invalidCovN,
    },
    validSequenceTestCases: validSequences.map(sequenceToTestCase),
    invalidSequenceTestCases: invalidSequences.map(sequenceToTestCase),
    comments: '',
    passed: null,
  };
}

/**
 * Given a SCI and a SymbolMap, returns the mapped SCI
 * @param sci
 * @param symbolMap
 */
export function getMappedSci(
  sci: string,
  symbolMap: InteractionSymbolMap = {}
): string {
  // This implementation does not support multicharacter symbols :(
  return sci
    .split('')
    .map((c) => symbolMap[c] || c)
    .join('');
}
/**
 * Generates test case objects for th given sequences of interactions
 * @param sequences
 */
export function sequenceToTestCase(sequence: string): TestCase {
  return {
    interactions: sequence.split('.').map(symbolToInteraction),
    comment: '',
    passed: null,
  };
}

/**
 * Generates an interaction object for a given symbol
 * @param symbol
 */
export function symbolToInteraction(symbol: string): Interaction {
  return { symbol, comment: '', checked: false };
}
