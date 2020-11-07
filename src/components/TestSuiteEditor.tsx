import React, { useState } from 'react';

import Box from '@material-ui/core/Box/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

export default function TestSuiteEditor() {
  const [rawSci, setRawSci] = useState('');
  const [validSequencesCov, setValidSequencesCov] = useState(
    MIN_VALID_COV_VALUE
  );
  const [invalidSequencesCov, setInvalidSequencesCov] = useState(
    MIN_INVALID_COV_VALUE
  );

  const onSciChange = (e: any) => {
    const { value } = e.target;
    setRawSci(value);
  };

  const onValidSequencesCovInputChange = (e: any) => {
    const { value } = e.target;
    setValidSequencesCov(
      value && value < MIN_VALID_COV_VALUE ? MIN_VALID_COV_VALUE : value
    );
  };
  const onInvalidSequencesCovInputChange = (e: any) => {
    const { value } = e.target;
    setInvalidSequencesCov(
      value && value < MIN_INVALID_COV_VALUE ? MIN_INVALID_COV_VALUE : value
    );
  };

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
            value={validSequencesCov}
            onChange={onValidSequencesCovInputChange}
            inputProps={{
              min: MIN_VALID_COV_VALUE,
            }}
          />
        </Box>
        <Box marginBottom={1}>
          <TextField
            label="Invalid Sequences"
            aria-label="Invalid Sequences"
            variant="outlined"
            type="number"
            value={invalidSequencesCov}
            onChange={onInvalidSequencesCovInputChange}
            inputProps={{
              min: MIN_INVALID_COV_VALUE,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

const MIN_VALID_COV_VALUE = 0;
const MIN_INVALID_COV_VALUE = 1;
