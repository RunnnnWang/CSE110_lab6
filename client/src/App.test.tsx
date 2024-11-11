import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';


test("detele expense", () => {
  render(<App />);
  
  const createExpenseButton = screen.getByText("Save");
  const createExpense = screen.getByLabelText("Name");
  const createCost = screen.getByLabelText("Cost");
  fireEvent.change(createExpense, {target: {value: "apple"}});
  fireEvent.change(createCost, {target: {value: "300"}});
  fireEvent.click(createExpenseButton);

  const deleteExpenseButton = screen.getByText("x");
  fireEvent.click(deleteExpenseButton);
  const remainingExpenses = screen.queryAllByAltText("spend");
  expect(remainingExpenses.length).toBe(0);
});

test("delete expense update", () => {
  render(<App />);
  
  const originalExpenses = screen.getByText(/Spent so far: \$/i);
  const originalRemaining = screen.getByText(/Remaining: \$/i);
  const createExpenseButton = screen.getByText("Save");
  const createExpense = screen.getByLabelText("Name");
  const createCost = screen.getByLabelText("Cost");
  fireEvent.change(createExpense, {target: {value: "apple"}});
  fireEvent.change(createCost, {target: {value: "300"}});
  fireEvent.click(createExpenseButton);


  const deleteExpenseButton = screen.getByText("x");
  fireEvent.click(deleteExpenseButton);
  const expenseAfterDelete = screen.getByText(/Spent so far: \$/i);
  const remainingAfterDelete = screen.getByText(/Remaining: \$/i);
  expect(originalExpenses).toBe(expenseAfterDelete);
  expect(originalRemaining).toBe(remainingAfterDelete);
});

test("budget balance verification", () => {
  render(<App />);

  

  const purchases = {
    "apple": "50",
    "pear" : "40",
    "cookies": "100",
    "phone": "500",
    "toy": "35"
  }

  Object.entries(purchases).forEach(([key, value]) => {
    const createExpenseButton = screen.getByText("Save");
    const createExpense = screen.getByLabelText("Name");
    const createCost = screen.getByLabelText("Cost");
    fireEvent.change(createExpense, {target: {value: key}});
    fireEvent.change(createCost, {target: {value: value}});
    fireEvent.click(createExpenseButton);
  })

  const totalBudgetText = screen.getByText(/Budget: \$/i);
  const remainingText = screen.getByText(/Remaining: \$/i);
  const spentSoFarText = screen.getByText(/Spent so far: \$/i);

  const totalBudget = parseInt(totalBudgetText.textContent?.replace(/[^0-9]/g, "") || "0", 10);
  const remainingNumber = parseInt(remainingText.textContent?.replace(/[^0-9]/g, "") || "0", 10);
  const spentSoFarNumber = parseInt(spentSoFarText.textContent?.replace(/[^0-9]/g, "") || "0", 10);

  const totalCalculatedBudget = remainingNumber + spentSoFarNumber;

  expect(totalCalculatedBudget).toBe(totalBudget);


});


