import { Interaction, InteractionSymbolMap, Report, TestCase } from '../types';

export function generateReport(
  sci: string,
  validCovN: number,
  invalidCovN: number,
  symbolMap: InteractionSymbolMap,
  validSequences: string[],
  invalidSequences: string[]
): Report {
  return {
    id: null,
    sci,
    symbolMap,
    mappedSci: getMappedSci(sci, symbolMap),
    coverageCriteria: {
      validSequences: validCovN,
      invalidSequences: invalidCovN,
    },
    validSequenceTestCases: validSequences.map(sequenceToTestCase),
    invalidSequenceTestCases: invalidSequences.map(sequenceToTestCase),
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
  return { interactions: sequence.split('.').map(symbolToInteraction) };
}

/**
 * Generates an interaction object for a given symbol
 * @param symbol
 */
export function symbolToInteraction(symbol: string): Interaction {
  return { symbol };
}
