import { validate as validateUuid } from 'uuid';

import { InteractionSymbolMap, Report } from '../types';
import {
  generateReport,
  getMappedSci,
  sequenceToTestCase,
  symbolToInteraction,
} from './report';

type GetMappedSciTestParams = {
  sci: string;
  symbolMap: InteractionSymbolMap;
  mappedSci: string;
};

type GenerateReportTestParams = {
  sci: string;
  validCovN: number;
  invalidCovN: number;
  symbolMap: InteractionSymbolMap;
  validSequences: string[];
  invalidSequences: string[];
  expectedReport: Report;
};

describe('report', () => {
  describe('getMappedSci', () => {
    const testParams: GetMappedSciTestParams[] = [
      {
        sci: 'O.(S|Z)*.C',
        symbolMap: {
          O: 'Open',
          S: 'Select',
          Z: 'Zoom',
          C: 'Close',
        },
        mappedSci: 'Open.(Select|Zoom)*.Close',
      },
    ];
    for (const t of testParams) {
      test(`should return '${t}'`, () => {
        expect(getMappedSci(t.sci, t.symbolMap)).toBe(t.mappedSci);
      });
    }
  });

  describe('generateReport', () => {
    const testParams: GenerateReportTestParams[] = [
      {
        sci: 'O.(S|Z)*.C',
        symbolMap: {
          O: 'Open',
          S: 'Select',
          Z: 'Zoom',
          C: 'Close',
        },
        validCovN: 0,
        invalidCovN: 1,
        validSequences: ['O.C'],
        invalidSequences: ['C', 'O', 'S', 'Z'],
        expectedReport: {
          id: 'this should be replaced before equality comparison',
          sci: 'O.(S|Z)*.C',
          symbolMap: {
            O: 'Open',
            S: 'Select',
            Z: 'Zoom',
            C: 'Close',
          },
          mappedSci: 'Open.(Select|Zoom)*.Close',
          coverageCriteria: {
            validSequences: 0,
            invalidSequences: 1,
          },
          validSequenceTestCases: [
            { interactions: [{ symbol: 'O' }, { symbol: 'C' }] },
          ],
          invalidSequenceTestCases: [
            { interactions: [{ symbol: 'C' }] },
            { interactions: [{ symbol: 'O' }] },
            { interactions: [{ symbol: 'S' }] },
            { interactions: [{ symbol: 'Z' }] },
          ],
        },
      },
    ];

    for (const t of testParams) {
      describe('', () => {
        const generatedReport = generateReport(
          t.sci,
          t.validCovN,
          t.invalidCovN,
          t.symbolMap,
          t.validSequences,
          t.invalidSequences
        );

        test(`should generate the expected report`, () => {
          // Id is a random uuid, we copy it for comparison to pass
          t.expectedReport.id = generatedReport.id;
          expect(generatedReport).toEqual(t.expectedReport);
        });

        test('should have a valid uuid as id', () => {
          expect(validateUuid(generatedReport.id)).toBe(true);
        });
      });
    }
  });

  describe('symbolToInteraction', () => {
    test('should return the proper interaction object', () => {
      expect(symbolToInteraction('B')).toEqual({ symbol: 'B' });
    });
  });

  describe('sequenceToTestCase', () => {
    test('should should return the array of test cases', () => {
      expect(sequenceToTestCase('A.R.C.X.T.S')).toEqual({
        interactions: [
          { symbol: 'A' },
          { symbol: 'R' },
          { symbol: 'C' },
          { symbol: 'X' },
          { symbol: 'T' },
          { symbol: 'S' },
        ],
      });
    });
  });
});
