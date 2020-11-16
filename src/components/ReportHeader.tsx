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
        <Typography variant="h4">Report</Typography>
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
      <Box paddingLeft={2}>
        <Box
          display="flex"
          alignItems="center"
          flexWrap="wrap"
          marginBottom={2}
        >
          <Box width={200}>
            <Typography variant="h5">SCI:</Typography>
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
              <Typography variant="h5">Mapped SCI:</Typography>
            </Box>
            <Typography>{report.mappedSci}</Typography>
          </Box>
        )}
        <Box
          display="flex"
          alignItems="center"
          flexWrap="wrap"
          marginBottom={2}
        >
          <Box width={200}>
            <Typography variant="h5">Coverage criteria:</Typography>
          </Box>
          <Box display="flex" flexDirection="column">
            <Typography>{`Base+${report.coverageCriteria.validSequences}`}</Typography>
            <Typography>
              {`Invalid-${report.coverageCriteria.invalidSequences}`}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
