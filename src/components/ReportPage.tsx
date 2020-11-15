import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { getReport, saveReport } from '../utils/storage';
import { Report } from '../types';
import ReportHeader from './ReportHeader';
import ReportForm from './ReportForm';

export default function ReportPage() {
  const { reportId } = useParams<{ reportId: string }>();
  const [report, setReport] = useState<Report>(getReport(reportId));

  const onReportUpdate = (updatedReport: Report) => {
    setReport(updatedReport);
    saveReport(updatedReport);
  };

  return (
    <Box>
      {report ? (
        <>
          <ReportHeader report={report} />
          <ReportForm report={report} onReportUpdate={onReportUpdate} />
        </>
      ) : (
        <Typography>Report not found</Typography>
      )}
    </Box>
  );
}
