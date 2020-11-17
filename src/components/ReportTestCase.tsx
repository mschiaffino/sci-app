import React, { useCallback } from 'react';

import throttle from 'lodash.throttle';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton/ToggleButton';
import TextField from '@material-ui/core/TextField';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import { capitalize, makeStyles, Tooltip } from '@material-ui/core';

import { InteractionSymbolMap, TestCase } from '../types';

const useStylese = makeStyles({
  activePassedToggle: {
    '&.MuiToggleButton-root': {
      '&.Mui-selected': {
        backgroundColor: green[800],
      },
    },
  },
  activeFailedToggle: {
    '&.MuiToggleButton-root': {
      '&.Mui-selected': {
        backgroundColor: red[800],
      },
    },
  },
  avoidPageBreakInside: {
    pageBreakInside: 'avoid',
  },
  checkbox: {
    paddingTop: 0,
    paddingBottom: 0,
  },
});

interface Props {
  testCase: TestCase;
  symbolMap?: InteractionSymbolMap;
  onChange: (testCase: TestCase) => void;
  testCaseType: 'valid' | 'invalid';
}

export default function ReportTestCase({
  testCase,
  symbolMap,
  onChange,
  testCaseType,
}: Props) {
  const classes = useStylese();
  const testCaseName = testCase.interactions.map((i) => i.symbol).join('.');

  // eslint-disable-next-line
  const throttledOnChange = useCallback(
    throttle(onChange, 500, { leading: true }),
    []
  );

  const handleInteractionCheckChange = (
    event: any,
    index: number,
    checked: boolean
  ) => {
    const updatedTestCase: TestCase = { ...testCase };
    updatedTestCase.interactions[index].checked = checked;
    throttledOnChange(updatedTestCase);
  };

  const handleCommentChange = (event: any) => {
    const updatedTestCase: TestCase = {
      ...testCase,
      comment: event.target.value,
    };
    throttledOnChange(updatedTestCase);
  };

  const handleResultChange = (
    event: React.MouseEvent<HTMLElement>,
    passed: boolean
  ) => {
    const updatedTestCase: TestCase = { ...testCase, passed };
    throttledOnChange(updatedTestCase);
  };

  return (
    <Box width={800} marginY={1} className={classes.avoidPageBreakInside}>
      <Card variant="outlined">
        <Box padding={1}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">{`${capitalize(
              testCaseType
            )} Test Case ${testCaseName}`}</Typography>
            <Box marginLeft={3}>
              <Tooltip title="Result" placement="top" arrow>
                <ToggleButtonGroup
                  value={testCase.passed}
                  exclusive
                  onChange={handleResultChange}
                  size="small"
                >
                  <ToggleButton
                    value={true}
                    selected={testCase.passed || undefined}
                    aria-label="passed"
                    classes={{ selected: classes.activePassedToggle }}
                  >
                    <CheckIcon htmlColor={testCase.passed ? 'white' : ''} />
                  </ToggleButton>
                  <ToggleButton
                    value={false}
                    aria-label="failed"
                    classes={{ selected: classes.activeFailedToggle }}
                  >
                    <CloseIcon
                      htmlColor={testCase.passed === false ? 'white' : ''}
                    />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Tooltip>
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between" marginTop={1}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="flex-start"
              marginBottom={1}
            >
              {testCase.interactions.map((interaction, index) => (
                <Box
                  display="flex"
                  alignItems="center"
                  key={interaction.symbol + index}
                >
                  <Checkbox
                    checked={interaction.checked}
                    onChange={(event, checked) =>
                      handleInteractionCheckChange(event, index, checked)
                    }
                    color="primary"
                    className={classes.checkbox}
                  ></Checkbox>
                  <Typography>
                    {interactionText(index, interaction.symbol, symbolMap)}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Box marginLeft={2} width={400}>
              <TextField
                label="Comments"
                variant="outlined"
                size="small"
                multiline
                fullWidth
                defaultValue={testCase.comment}
                inputProps={{ 'aria-label': 'comment' }}
                onChange={handleCommentChange}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
const interactionText = (
  index: number,
  symbol: string,
  symbolMap?: InteractionSymbolMap
) => {
  let name = symbol;
  if (symbolMap && symbolMap[symbol]) {
    name = symbolMap[symbol];
  }
  return `${index}. ${name}`;
};
