import React from 'react';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { Report } from '../types';

interface Props {
  report: Report;
}

export default function ReportHeeader({ report }: Props) {
  return (
    <Box>
      <Box display="flex" alignItems="center" flexWrap="wrap">
        <Typography variant="h5">SCI:&nbsp;</Typography>
        <Typography>{report.sci}</Typography>
      </Box>
      {report.mappedSci !== report.sci && (
        <Box display="flex" alignItems="center" flexWrap="wrap">
          <Typography variant="h5">Mapped SCI:&nbsp;</Typography>
          <Typography>{report.mappedSci}</Typography>
        </Box>
      )}
      <Box display="flex" alignItems="center" flexWrap="wrap">
        <Typography variant="h6">Coverage criteria:&nbsp;</Typography>
        <Box display="flex">
          <Typography>{`Base+${report.coverageCriteria.validSequences}`}</Typography>
          &nbsp;|&nbsp;
          <Typography>
            {`Invalid-${report.coverageCriteria.invalidSequences}`}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
