import React from 'react';

import { ThemeProvider } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import TestSuiteEditor from './components/TestSuiteEditor';
import { theme } from './theme';

function App() {
  return (
    <Box data-testid="app-outer-box">
      <ThemeProvider theme={theme}>
        <Box padding={3}>
          <TestSuiteEditor />
        </Box>
      </ThemeProvider>
    </Box>
  );
}

export default App;
