import React from 'react';
import { render, screen } from '@testing-library/react';

import ReportForm from './ReportForm';
import { Report } from '../types';

describe('ReportForm', () => {
  let rerender: Function;
  const onReportUpdateMock = jest.fn();
  beforeEach(() => {
    rerender = render(
      <ReportForm report={reportMock} onReportUpdate={onReportUpdateMock} />
    ).rerender;
  });

  test('should display titles', () => {
    expect(
      screen.getByText('Test cases for valid sequences')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Test cases for invalid sequences')
    ).toBeInTheDocument();
  });

  test("should display 'No test cases' message for valid sequences", async () => {
    const r: Report = { ...reportMock, validSequenceTestCases: [] };

    rerender(<ReportForm report={r} onReportUpdate={onReportUpdateMock} />);
    const messages: any[] = await screen.findAllByText('No test cases');

    expect(messages.length).toBe(1);
    expect(messages[0]).toBeInTheDocument();
  });

  test("should display 'No test cases' message for invvalid sequences", async () => {
    const r: Report = { ...reportMock, invalidSequenceTestCases: [] };

    rerender(<ReportForm report={r} onReportUpdate={onReportUpdateMock} />);
    const messages: any[] = await screen.findAllByText('No test cases');

    expect(messages.length).toBe(1);
    expect(messages[0]).toBeInTheDocument();
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
  passed: false,
  comments: null,
};
