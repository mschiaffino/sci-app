import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app outer box', () => {
  render(<App />);
  const appOuterBox = screen.getByTestId('app-outer-box');
  expect(appOuterBox).toBeInTheDocument();
});
