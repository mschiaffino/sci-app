import React from 'react';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';

import { InteractionSymbolMap } from '../types';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  listItem: {
    paddingRight: 0,
  },
});

interface Props {
  symbols: string[];
  symbolMap: InteractionSymbolMap;
  onInteractionInputChange: (symbol: string, interaction: string) => void;
}

export default function SymbolMapEditor({
  symbols,
  symbolMap,
  onInteractionInputChange,
}: Props) {
  const classes = useStyles();

  return (
    <Box>
      <Box marginBottom={1}>
        <Typography variant="h5">Symbol Map</Typography>
      </Box>
      <Card variant="outlined">
        <Box maxHeight={410} overflow="auto">
          <List>
            <ListItem className={classes.listItem}>
              <Box display="flex" alignItems="center">
                <Box
                  width={60}
                  marginRight={8}
                  display="flex"
                  justifyContent="center"
                >
                  <Typography>Symbol</Typography>
                </Box>
                <Typography>Interaction</Typography>
              </Box>
            </ListItem>
            {symbols.map((symbol) => (
              <ListItem key={symbol} className={classes.listItem}>
                <Box display="flex" alignItems="center" flexGrow={1}>
                  <Box
                    width={60}
                    marginRight={8}
                    display="flex"
                    justifyContent="center"
                  >
                    <Typography>{symbol}</Typography>
                  </Box>
                  <Box flexGrow={1} paddingRight={1}>
                    <TextField
                      variant="outlined"
                      defaultValue={symbolMap[symbol]}
                      onChange={(e) =>
                        onInteractionInputChange(symbol, e.target.value)
                      }
                      inputProps={{ 'data-testid': `input-${symbol}` }}
                      fullWidth
                    ></TextField>
                  </Box>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      </Card>
    </Box>
  );
}
