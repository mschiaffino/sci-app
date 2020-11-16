import React, { useEffect, useState } from 'react';

import Box from '@material-ui/core/Box/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import { SciParser } from 'sci-parser';
import SymbolMapEditor from './SymbolMapEditor';
import { InteractionSymbolMap } from '../types';
import { generateReport } from '../utils/report';
import { saveReport } from '../utils/storage';
import { Sci } from 'sci-parser/build/sci';
import SnackbarNotification from './SnackbarNotification';
import Tooltip from '@material-ui/core/Tooltip';

export default function TestSuiteEditor() {
  const [rawSci, setRawSci] = useState('');
  const [parsedSci, setParsedSci] = useState<Sci | null>(null);
  const [validCovN, setValidCovN] = useState(MIN_VALID_COV_N);
  const [invalidCovN, setInvalidCovN] = useState(MIN_INVALID_COV_N);
  const [symbols, setSymbols] = useState<string[]>([]);
  const [symbolMap, setSymbolMap] = useState<InteractionSymbolMap>({});
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const [openNotification, setOpenNotification] = useState(false);

  const onSciChange = (e: any) => {
    const { value } = e.target;
    setRawSci(value);
    if (!value) {
      setParsedSci(null);
    }
  };

  const onValidSequencesCovInputChange = (e: any) => {
    const value = e.target.valueAsNumber;
    setValidCovN(
      value && value < MIN_VALID_COV_N ? MIN_VALID_COV_N : value || ''
    );
  };

  const onInvalidSequencesCovInputChange = (e: any) => {
    const value = e.target.valueAsNumber;
    setInvalidCovN(
      value && value < MIN_INVALID_COV_N ? MIN_INVALID_COV_N : value || ''
    );
  };

  const onInteractionInputChange = (symbol: string, interaction: string) => {
    setSymbolMap((prevValue) => ({ ...prevValue, [symbol]: interaction }));
  };

  const onGenerateReportClick = () => {
    if (!parsedSci) {
      return;
    }
    setOpenNotification(true);
    generateReport(rawSci, validCovN, invalidCovN, symbolMap).then((report) => {
      saveReport(report);
      setTimeout(() => {
        window.open(`/report/${report.id}`);
      }, 2000);
    });
  };

  const onNotificationClose = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenNotification(false);
  };

  useEffect(() => {
    if (!rawSci) {
      return;
    }
    const parsed = SciParser.parse(rawSci);
    setParsedSci(parsed);
    if (parsed) {
      setSymbols(parsed.interactionSymbols);
    }
    setErrorMessage(SciParser.syntaxErrorMessage(rawSci));
  }, [rawSci, validCovN, invalidCovN]);

  return (
    <Box display="flex" flexDirection="column" maxWidth={700}>
      <Box marginBottom={2}>
        <Typography variant="h4">Test Suite Editor</Typography>
      </Box>
      <Box marginBottom={1}>
        <Box display="flex">
          <Box marginRight={2} width={450}>
            <TextField
              label="SCI Regex"
              aria-label="SCI Regex"
              variant="outlined"
              placeholder="Please enter a SCI Regex"
              onChange={onSciChange}
              error={!!rawSci && !!errorMessage}
              helperText={rawSci && errorMessage}
              fullWidth
            />
          </Box>

          <Button
            color="primary"
            variant="contained"
            onClick={onGenerateReportClick}
            disabled={!parsedSci || !validCovN || !invalidCovN}
          >
            Generate Report
          </Button>
        </Box>
        <Box marginTop={4} marginBottom={2} display="flex" alignItems="center">
          <Typography variant="h5">Coverage Criteria</Typography>
          <Box marginLeft={2}>
            <Tooltip
              title="High numbers could require a long time to generate the report"
              placement="right"
              arrow
            >
              <ErrorOutlineIcon />
            </Tooltip>
          </Box>
        </Box>
        <Box marginBottom={1} display="flex" width={450}>
          <Box flexGrow={1}>
            <TextField
              label="Valid Sequences"
              aria-label="Valid Sequences"
              variant="outlined"
              type="number"
              value={validCovN}
              onChange={onValidSequencesCovInputChange}
              inputProps={{
                min: MIN_VALID_COV_N,
              }}
              fullWidth
            />
          </Box>
          <Box flexGrow={1} marginLeft={2}>
            <TextField
              label="Invalid Sequences"
              aria-label="Invalid Sequences"
              variant="outlined"
              type="number"
              value={invalidCovN}
              onChange={onInvalidSequencesCovInputChange}
              inputProps={{
                min: MIN_INVALID_COV_N,
              }}
              fullWidth
            />
          </Box>
        </Box>
        <Box marginTop={3} width={450}>
          <SymbolMapEditor
            symbols={symbols}
            symbolMap={symbolMap}
            onInteractionInputChange={onInteractionInputChange}
          />
        </Box>
      </Box>
      <SnackbarNotification
        open={openNotification}
        onClose={onNotificationClose}
        message={
          "Generating report! A new tab with will display it once it's ready."
        }
      />
    </Box>
  );
}

const MIN_VALID_COV_N = 0;
const MIN_INVALID_COV_N = 1;
