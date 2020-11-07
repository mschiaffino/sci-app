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

  test('should display sci regex text field', () => {
    const textField = screen.getByLabelText('SCI Regex');
    expect(textField).toBeInTheDocument();
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
