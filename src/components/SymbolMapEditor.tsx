import React from 'react';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';

import { InteractionSymbolMap } from '../types';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';

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
  return (
    <Box>
      <Typography variant="h5">Symbol Map</Typography>
      <List>
        <ListItem>
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
          <ListItem key={symbol}>
            <Box display="flex" alignItems="center">
              <Box
                width={60}
                marginRight={8}
                display="flex"
                justifyContent="center"
              >
                <Typography>{symbol}</Typography>
              </Box>
              <TextField
                variant="outlined"
                defaultValue={symbolMap[symbol]}
                onChange={(e) =>
                  onInteractionInputChange(symbol, e.target.value)
                }
                inputProps={{ 'data-testid': `input-${symbol}` }}
              ></TextField>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
