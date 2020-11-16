import React, { useState } from 'react';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

import { Report } from '../types';

interface Props {
  report: Report;
}

export default function ReportHeeader({ report }: Props) {
  const [visiblePdfIcon, setVisiblePdfIcon] = useState(true);

  const onPdfIconClick = () => {
    setVisiblePdfIcon(false);
    setTimeout(() => {
      window.print();
    }, 0);
    setTimeout(() => {
      setVisiblePdfIcon(true);
    }, 1000);
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" marginBottom={1}>
        <Typography variant="h3">Report</Typography>
        <Box marginLeft={3}>
          {visiblePdfIcon && (
            <PictureAsPdfIcon
              onClick={onPdfIconClick}
              color="primary"
              style={{ cursor: 'pointer' }}
            />
          )}
        </Box>
      </Box>
      <Box display="flex" alignItems="center" flexWrap="wrap" marginBottom={2}>
        <Box width={200}>
          <Typography variant="h5">SCI:&nbsp;</Typography>
        </Box>
        <Typography>{report.sci}</Typography>
      </Box>
      {report.mappedSci !== report.sci && (
        <Box
          display="flex"
          alignItems="center"
          flexWrap="wrap"
          marginBottom={2}
        >
          <Box width={200}>
            <Typography variant="h5">Mapped SCI:&nbsp;</Typography>
          </Box>
          <Typography>{report.mappedSci}</Typography>
        </Box>
      )}
      <Box display="flex" alignItems="center" flexWrap="wrap" marginBottom={2}>
        <Box width={200}>
          <Typography variant="h5">Coverage criteria:&nbsp;</Typography>
        </Box>
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
