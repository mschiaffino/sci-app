import { validate as validateUuid } from 'uuid';

import { Interaction, InteractionSymbolMap, Report, TestCase } from '../types';
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
            {
              interactions: [
                { symbol: 'O', comment: null, checked: false },
                { symbol: 'C', comment: null, checked: false },
              ],
              comment: null,
              passed: null,
            },
          ],
          invalidSequenceTestCases: [
            {
              interactions: [{ symbol: 'C', comment: null, checked: false }],
              comment: null,
              passed: null,
            },
            {
              interactions: [{ symbol: 'O', comment: null, checked: false }],
              comment: null,
              passed: null,
            },
            {
              interactions: [{ symbol: 'S', comment: null, checked: false }],
              comment: null,
              passed: null,
            },
            {
              interactions: [{ symbol: 'Z', comment: null, checked: false }],
              comment: null,
              passed: null,
            },
          ],
          comments: null,
          passed: null,
        },
      },
    ];

    for (const t of testParams) {
      describe('generateReport', () => {
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
      const expectedInteraction: Interaction = {
        symbol: 'B',
        comment: null,
        checked: false,
      };
      expect(symbolToInteraction('B')).toEqual(expectedInteraction);
    });
  });

  describe('sequenceToTestCase', () => {
    test('should should return the array of test cases', () => {
      const expectInteractions: Interaction[] = [
        { symbol: 'A', comment: null, checked: false },
        { symbol: 'R', comment: null, checked: false },
        { symbol: 'C', comment: null, checked: false },
        { symbol: 'X', comment: null, checked: false },
        { symbol: 'T', comment: null, checked: false },
        { symbol: 'S', comment: null, checked: false },
      ];
      const expectedTestCase: TestCase = {
        interactions: expectInteractions,
        comment: null,
        passed: null,
      };

      expect(sequenceToTestCase('A.R.C.X.T.S')).toEqual(expectedTestCase);
    });
  });
});
