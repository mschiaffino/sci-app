import React from 'react';

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

import { InteractionSymbolMap, TestCase } from '../types';

interface Props {
  testCase: TestCase;
  symbolMap?: InteractionSymbolMap;
  onChange: (testCase: TestCase) => void;
}

export default function ReportTestCase({
  testCase,
  symbolMap,
  onChange,
}: Props) {
  const testCaseName = testCase.interactions.map((i) => i.symbol).join('.');

  const handleInteractionCheckChange = (
    event: any,
    index: number,
    checked: boolean
  ) => {
    const updatedTestCase: TestCase = { ...testCase };
    updatedTestCase.interactions[index].checked = checked;
    onChange(updatedTestCase);
  };

  const handleCommentChange = (event: any) => {
    const updatedTestCase: TestCase = {
      ...testCase,
      comment: event.target.value,
    };
    onChange(updatedTestCase);
  };

  const handleResultChange = (
    event: React.MouseEvent<HTMLElement>,
    passed: boolean
  ) => {
    const updatedTestCase: TestCase = { ...testCase, passed };
    onChange(updatedTestCase);
  };

  return (
    <Box width={500} marginY={2}>
      <Card variant="outlined">
        <Box padding={2}>
          <Typography variant="h6">{`Test Case ${testCaseName}`}</Typography>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
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
                ></Checkbox>
                <Typography>
                  {interactionText(index, interaction.symbol, symbolMap)}
                </Typography>
              </Box>
            ))}
          </Box>
          <TextField
            label="Comment"
            multiline
            fullWidth={true}
            value={testCase.comment}
            inputProps={{ 'aria-label': 'comment' }}
            onChange={handleCommentChange}
          />
          <Box marginTop={2} display="flex" alignItems="center">
            <Typography variant="subtitle1">Result</Typography>
            <Box marginLeft={1}>
              <ToggleButtonGroup
                value={testCase.passed}
                exclusive
                onChange={handleResultChange}
              >
                <ToggleButton value={true} aria-label="passed">
                  <CheckIcon htmlColor={green[800]} />
                </ToggleButton>
                <ToggleButton value={false} aria-label="failed">
                  <CloseIcon color="error" />
                </ToggleButton>
              </ToggleButtonGroup>
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
