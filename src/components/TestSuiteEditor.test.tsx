import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TestSuiteEditor from './TestSuiteEditor';

describe('TestSuiteEditor', () => {
  beforeEach(() => {
    render(<TestSuiteEditor />);
  });

  test('should display editor title', () => {
    const title = screen.getByText('Test Suite Editor');
    expect(title).toBeInTheDocument();
  });

  describe('Regex text field', () => {
    const invalidSci = 'A.(C.D';

    test('should display sci regex text field', () => {
      const textField = screen.getByLabelText('SCI Regex');
      expect(textField).toBeInTheDocument();
    });

    test('should have error styling', async () => {
      const textField = screen.getByLabelText('SCI Regex');
      const input = textField.querySelector('input') as HTMLInputElement;
      const label = textField.querySelector('label') as HTMLLabelElement;

      userEvent.type(input, invalidSci);

      expect(Object.values(label.classList)).toContain('Mui-error');
    });

    test('should display error message', async () => {
      const textField = screen.getByLabelText('SCI Regex');
      const input = textField.querySelector('input') as HTMLInputElement;

      userEvent.type(input, invalidSci);

      const errorMessage = screen.getByText(
        'Invalid regular expression: /A(CD/: Unterminated group'
      );
      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe('Coverage Criteria', () => {
    test('should display coverage criteria title', () => {
      const title = screen.getByText('Coverage Criteria');
      expect(title).toBeInTheDocument();
    });

    test('should display sci regex text fields', () => {
      const validSequencesTextField = screen.getByLabelText('Valid Sequences');
      const invalidSequencesTextField = screen.getByLabelText(
        'Invalid Sequences'
      );
      expect(validSequencesTextField).toBeInTheDocument();
      expect(invalidSequencesTextField).toBeInTheDocument();
    });

    test('should not allow  valid sequence input value lower than 0', () => {
      const validSequencesInput = screen
        .getByLabelText('Valid Sequences')
        .querySelector('input') as HTMLInputElement;
      userEvent.type(validSequencesInput, '-6');
      expect(validSequencesInput.valueAsNumber).toBe(0);
    });

    test('should not allow  invalid sequence input value lower than 1', () => {
      const invalidSequencesInput = screen
        .getByLabelText('Invalid Sequences')
        .querySelector('input') as HTMLInputElement;
      userEvent.type(invalidSequencesInput, '-2');
      expect(invalidSequencesInput.valueAsNumber).toBe(1);
    });
  });
});
