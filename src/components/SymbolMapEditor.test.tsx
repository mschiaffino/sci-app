import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SymbolMapEditor from './SymbolMapEditor';

describe('SymbolMapEditor', () => {
  const symbols = ['A', 'B', 'C', 'D'];
  const initialSymbolMap = {};
  const mockOnInteractionInputChange = jest.fn();

  beforeEach(() => {
    render(
      <SymbolMapEditor
        symbols={symbols}
        symbolMap={initialSymbolMap}
        onInteractionInputChange={mockOnInteractionInputChange}
      />
    );
  });

  test('should display title', () => {
    const title = screen.getByText('Symbol Map');
    expect(title).toBeInTheDocument();
  });

  test('should display all the symbols', () => {
    for (const symbol of symbols) {
      expect(screen.getByText(symbol)).toBeInTheDocument();
    }
  });

  test('should display one text field per symbol', () => {
    const textFields = screen.getAllByRole('textbox');
    expect(textFields.length).toBe(symbols.length);
  });

  test('should call callback on input change', () => {
    const symbol = symbols[2];
    const input = screen.getByTestId(`input-${symbol}`);

    userEvent.type(input, 'Close');

    expect(mockOnInteractionInputChange).toHaveBeenCalledWith(
      symbols[2],
      'Close'
    );
  });
});
