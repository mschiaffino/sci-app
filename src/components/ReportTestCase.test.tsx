import React from 'react';

import { render, screen } from '@testing-library/react';
import { InteractionSymbolMap, TestCase } from '../types';
import ReportTestCase from './ReportTestCase';
import userEvent from '@testing-library/user-event';

const testCaseMock: TestCase = {
  interactions: [
    { symbol: 'O', checked: false, comment: null },
    { symbol: 'S', checked: false, comment: null },
    { symbol: 'Z', checked: false, comment: null },
    { symbol: 'Z', checked: false, comment: null },
    { symbol: 'C', checked: false, comment: null },
  ],
};

describe('ReportTestCase', () => {
  let rendered: any;
  let rerender: Function;
  const onChangeMock = jest.fn();

  beforeEach(() => {
    rendered = render(
      <ReportTestCase
        testCase={testCaseMock}
        onChange={onChangeMock}
        testCaseType="valid"
      />
    );
    rerender = rendered.rerender;
  });

  test('should display interactions sequence title', () => {
    expect(screen.getByText('Valid Test Case O.S.Z.Z.C')).toBeInTheDocument();
  });

  describe('test case interactions steps', () => {
    test('should display one checkbox per interaction', () => {
      const checkboxes = screen.getAllByRole('checkbox');

      expect(checkboxes.length).toBe(testCaseMock.interactions.length);
    });

    test('should display the numbered interaction labels', () => {
      testCaseMock.interactions.forEach((interaction, index) => {
        expect(
          screen.getByText(`${index}. ${interaction.symbol}`)
        ).toBeInTheDocument();
      });
    });

    test('should map interactions names when available', () => {
      const symbolMap: InteractionSymbolMap = {
        O: 'Open',
        S: 'Select',
        Z: 'Zoom',
        C: 'Close',
      };
      rerender(
        <ReportTestCase
          testCase={testCaseMock}
          symbolMap={symbolMap}
          onChange={onChangeMock}
          testCaseType="valid"
        />
      );

      testCaseMock.interactions.forEach((interaction, index) => {
        expect(
          screen.getByText(`${index}. ${symbolMap[interaction.symbol]}`)
        ).toBeInTheDocument();
      });
    });

    test('should return updated test case on checkbox change', () => {
      const checkboxToClickIndex = 2;
      const checkbox = screen.getAllByRole('checkbox')[checkboxToClickIndex];

      userEvent.click(checkbox);

      const expectedUpdatedTestCase = { ...testCaseMock };
      expectedUpdatedTestCase.interactions[checkboxToClickIndex].checked = true;
      expect(onChangeMock).toHaveBeenCalledWith(expectedUpdatedTestCase);
    });
  });

  describe('test case result toggle buttons', () => {
    let failedButton: HTMLElement;
    let passedButton: HTMLElement;

    beforeEach(() => {
      failedButton = screen.getByLabelText('failed');
      passedButton = screen.getByLabelText('passed');
    });

    test('should display test case result toggle button group', () => {
      expect(passedButton).toBeInTheDocument();
      expect(failedButton).toBeInTheDocument();
    });

    test('should return updated test case with failed result', () => {
      userEvent.click(failedButton);

      const expectedUpdatedTestCase = { ...testCaseMock, passed: false };
      expect(onChangeMock).toHaveBeenCalledWith(expectedUpdatedTestCase);
    });

    test('should return updated test case with passeed result', () => {
      userEvent.click(passedButton);

      const expectedUpdatedTestCase = { ...testCaseMock, passed: true };
      expect(onChangeMock).toHaveBeenCalledWith(expectedUpdatedTestCase);
    });
  });

  describe('comment text field', () => {
    let commentTextField: HTMLElement;
    const comment = 'There where some issues when zooming in';

    beforeEach(() => {
      commentTextField = screen.getByLabelText(/comment/i);
    });

    test('should display comment text field', () => {
      expect(commentTextField).toBeInTheDocument();
    });

    test('should display comment value', () => {
      const testCaseWithComment = { ...testCaseMock, comment };

      rerender(
        <ReportTestCase
          testCase={testCaseWithComment}
          onChange={onChangeMock}
          testCaseType="valid"
        />
      );

      expect(screen.getByText(comment)).toBeInTheDocument();
    });

    test('should return updated test case with comment', () => {
      userEvent.type(commentTextField, comment);

      const expectedUpdatedTestCase = { ...testCaseMock, comment };
      expect(onChangeMock).toHaveBeenCalledWith(expectedUpdatedTestCase);
    });
  });
});
