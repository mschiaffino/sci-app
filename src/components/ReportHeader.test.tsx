import React from 'react';
import { render, screen } from '@testing-library/react';

import ReportHeader from './ReportHeader';
import { Report } from '../types';

describe('ReportHeader', () => {
  beforeEach(() => {
    render(<ReportHeader report={reportMock} />);
  });

  test('should display SCI', () => {
    expect(screen.getByText(reportMock.sci)).toBeInTheDocument();
  });

  test('should display mapped SCI', () => {
    expect(
      screen.getByText(reportMock.mappedSci as string)
    ).toBeInTheDocument();
  });

  describe('coverage criteria', () => {
    test('should display n for valid sequences', () => {
      expect(
        screen.getByText(`Base + ${reportMock.coverageCriteria.validSequences}`)
      ).toBeInTheDocument();
    });

    test('should display n for invalid sequences', () => {
      expect(
        screen.getByText(
          `Invalid + ${reportMock.coverageCriteria.invalidSequences}`
        )
      ).toBeInTheDocument();
    });
  });
});

const reportMock: Report = {
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
        { symbol: 'O', checked: false, comment: '' },
        { symbol: 'C', checked: false, comment: '' },
      ],
      comment: '',
      passed: null,
    },
  ],
  invalidSequenceTestCases: [
    {
      interactions: [{ symbol: 'C', checked: false, comment: '' }],
      comment: '',
      passed: null,
    },
    {
      interactions: [{ symbol: 'O', checked: false, comment: '' }],
      comment: '',
      passed: null,
    },
    {
      interactions: [{ symbol: 'S', checked: false, comment: '' }],
      comment: '',
      passed: null,
    },
    {
      interactions: [{ symbol: 'Z', checked: false, comment: '' }],
      comment: '',
      passed: null,
    },
  ],
  comments: '',
  passed: null,
};
