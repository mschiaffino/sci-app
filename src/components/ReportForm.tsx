import React from 'react';

import Box from '@material-ui/core/Box';

import { Report, TestCase } from '../types';
import Typography from '@material-ui/core/Typography';
import ReportTestCase from './ReportTestCase';

interface Props {
  report: Report;
  onReportUpdate: (report: Report) => void;
}

export default function ReportForm({ report, onReportUpdate }: Props) {
  const onTestCaseChange = (
    index: number,
    type: 'valid' | 'invalid',
    testCase: TestCase
  ) => {
    if (!report) {
      return;
    }
    const updatedReport: Report = { ...report };
    if (type === 'valid') {
      updatedReport.validSequenceTestCases[index] = testCase;
    } else {
      updatedReport.invalidSequenceTestCases[index] = testCase;
    }
    onReportUpdate(updatedReport);
  };

  return (
    <Box marginTop={1}>
      <Typography variant="h5">Test cases for valid sequences</Typography>
      <Box marginLeft={1}>
        {report.validSequenceTestCases.length === 0 ? (
          <Typography>No test cases</Typography>
        ) : (
          report.validSequenceTestCases.map((testCase, index) => (
            <ReportTestCase
              testCase={testCase}
              symbolMap={report.symbolMap}
              onChange={(testCase) =>
                onTestCaseChange(index, 'valid', testCase)
              }
              testCaseType="valid"
              key={testCaseName(testCase)}
            ></ReportTestCase>
          ))
        )}
      </Box>
      <Box marginTop={1}>
        <Typography variant="h5">Test cases for invalid sequences</Typography>
        <Box marginLeft={1}>
          {report.invalidSequenceTestCases.length === 0 ? (
            <Typography>No test cases</Typography>
          ) : (
            report.invalidSequenceTestCases.map((testCase, index) => (
              <ReportTestCase
                testCase={testCase}
                symbolMap={report.symbolMap}
                onChange={(testCase) =>
                  onTestCaseChange(index, 'invalid', testCase)
                }
                testCaseType="invalid"
                key={testCaseName(testCase)}
              ></ReportTestCase>
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
}

const testCaseName = (testCase: TestCase) =>
  testCase.interactions.map((i) => i.symbol).join('.');
