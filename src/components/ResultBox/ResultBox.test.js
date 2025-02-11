import '@testing-library/jest-dom/extend-expect';
import ResultBox from './ResultBox';
import { render, screen } from '@testing-library/react';

describe('Component ResultBox', () => {
  it('should render without crashing', () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
    render(<ResultBox from="USD" to="PLN" amount={100} />);
  });

  const testCases = [
    { amount: 100, from: 'PLN', to: 'USD', expected: 'PLN 100.00 = $28.57' },
    { amount: 50, from: 'USD', to: 'PLN', expected: '$50.00 = PLN 175.00' },
    { amount: 200, from: 'PLN', to: 'USD', expected: 'PLN 200.00 = $57.14' },
    { amount: 25, from: 'USD', to: 'PLN', expected: '$25.00 = PLN 87.50' },
  ];

  for (const { amount, from, to, expected } of testCases) {
    it(`should render proper info about conversion when ${from} -> ${to} for amount ${amount}`, () => {
      // render component with specific props
      render(<ResultBox from={from} to={to} amount={amount} />);

      // access the main div using data-testid
      const output = screen.getByTestId('result-box');

      // check if the content matches the expected conversion result
      expect(output).toHaveTextContent(expected);
    });
  }

  const sameCurrencyTestCases = [
    { amount: '123', from: 'USD', to: 'USD', expected: '$123.00 = $123.00' },
    { amount: '456', from: 'USD', to: 'USD', expected: '$456.00 = $456.00' },
    { amount: '123', from: 'PLN', to: 'PLN', expected: 'PLN 123.00 = PLN 123.00' },
    { amount: '456', from: 'PLN', to: 'PLN', expected: 'PLN 456.00 = PLN 456.00' },
  ];

  for (const testObj of sameCurrencyTestCases) {
    it(`should return the same value when from and to currencies are the same for amount ${testObj.amount}, from ${testObj.from} to ${testObj.to}`, () => {
      render(<ResultBox from={testObj.from} to={testObj.to} amount={parseInt(testObj.amount)} />);
      const result = screen.getByTestId('result-box');
      expect(result).toHaveTextContent(testObj.expected);
    });
  }

  const negativeAmountTestCases = [
    { amount: -100, from: 'PLN', to: 'USD', expected: 'Wrong value…' },
    { amount: -50, from: 'USD', to: 'PLN', expected: 'Wrong value…' },
  ];

  for (const { amount, from, to, expected } of negativeAmountTestCases) {
    it(`should render "Wrong value…" for negative amount ${amount} from ${from} to ${to}`, () => {
      render(<ResultBox from={from} to={to} amount={amount} />);
      const output = screen.getByTestId('result-box');
      expect(output).toHaveTextContent(expected);
    });
  }
});