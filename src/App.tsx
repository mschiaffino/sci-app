import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';

import { ThemeProvider } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import { browserHistory } from './utils/history';
import { theme } from './theme';
import TestSuiteEditor from './components/TestSuiteEditor';
import ReportPage from './components/ReportPage';

function App() {
  return (
    <Box data-testid="app-outer-box">
      <ThemeProvider theme={theme}>
        <Box padding={3}>
          <Router history={browserHistory}>
            <Switch>
              <Route path="/editor">
                <TestSuiteEditor />
              </Route>
              <Route path="/report/:reportId">
                <ReportPage />
              </Route>
              <Redirect from="*" to="/editor"></Redirect>
            </Switch>
          </Router>
        </Box>
      </ThemeProvider>
    </Box>
  );
}

export default App;
