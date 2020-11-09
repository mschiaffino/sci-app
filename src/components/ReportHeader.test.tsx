import React from 'react';
import { render, screen } from '@testing-library/react';

import ReportHeader from './ReportHeader';

describe('ReportHeader', () => {
  beforeEach(() => {
    render(<ReportHeader report={reportMock} />);
  });

  test('should display SCI', () => {
    expect(screen.getByText(reportMock.sci)).toBeInTheDocument();
  });

  test('should display mapped SCI', () => {
    expect(screen.getByText(reportMock.mappedSci)).toBeInTheDocument();
  });

  describe('coverage criteria', () => {
    test('should display n for valid sequences', () => {
      expect(
        screen.getByText(`Base+${reportMock.coverageCriteria.validSequences}`)
      ).toBeInTheDocument();
    });

    test('should display n for invalid sequences', () => {
      expect(
        screen.getByText(
          `Invalid-${reportMock.coverageCriteria.invalidSequences}`
        )
      ).toBeInTheDocument();
    });
  });
});

const reportMock = {
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
};
