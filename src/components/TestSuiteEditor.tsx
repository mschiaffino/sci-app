import React, { useEffect, useState } from 'react';

import Box from '@material-ui/core/Box/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { SciParser } from 'sci-parser';
import SymbolMapEditor from './SymbolMapEditor';
import { InteractionSymbolMap } from '../types';
import { generateReport } from '../utils/report';
import { saveReport } from '../utils/storage';
import { Sci } from 'sci-parser/build/sci';
import SnackbarNotification from './SnackbarNotification';

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
  };

  const onValidSequencesCovInputChange = (e: any) => {
    const { value } = e.target;
    setValidCovN(value && value < MIN_VALID_COV_N ? MIN_VALID_COV_N : value);
  };

  const onInvalidSequencesCovInputChange = (e: any) => {
    const { value } = e.target;
    setInvalidCovN(
      value && value < MIN_INVALID_COV_N ? MIN_INVALID_COV_N : value
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
    // TODO Compute sequences using web workers to avoid blocking the UI
    const validSequences = parsedSci.validSequences(validCovN);
    const invalidSequences = parsedSci.invalidSequences(invalidCovN);
    const report = generateReport(
      rawSci,
      validCovN,
      invalidCovN,
      symbolMap,
      validSequences,
      invalidSequences
    );
    saveReport(report);
    window.open(`/report/${report.id}`, '_blank');
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
        <TextField
          label="SCI Regex"
          aria-label="SCI Regex"
          variant="outlined"
          placeholder="Please enter a SCI Regex"
          onChange={onSciChange}
          error={!!rawSci && !!errorMessage}
          helperText={rawSci && errorMessage}
        />
        <Box marginTop={3} marginBottom={1}>
          <Typography variant="h5">Coverage Criteria</Typography>
        </Box>
        <Box marginBottom={1}>
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
          />
        </Box>
        <Box marginBottom={1}>
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
          />
        </Box>
        <Box marginTop={3}>
          <SymbolMapEditor
            symbols={symbols}
            symbolMap={symbolMap}
            onInteractionInputChange={onInteractionInputChange}
          />
        </Box>
        <Button
          color="primary"
          variant="contained"
          onClick={onGenerateReportClick}
          disabled={!parsedSci}
        >
          Generate Report
        </Button>
      </Box>
      <SnackbarNotification
        open={openNotification}
        onClose={onNotificationClose}
        message={'Generating report!'}
      />
    </Box>
  );
}

const MIN_VALID_COV_N = 0;
const MIN_INVALID_COV_N = 1;
