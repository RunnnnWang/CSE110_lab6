import { Expense } from "../../types/types";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";
import {deleteExpense} from "../../utils/expense-utils"

const ExpenseItem = (currentExpense: Expense) => {
  const { expenses, setExpenses, budget, setBudget } = useContext(AppContext);

  const handleDeleteExpense = async (currentExpense: Expense) => {
    // Exercise: Remove expense from expenses context array
    await deleteExpense(currentExpense.id);
    setExpenses((expenses) => expenses.filter((expense) => expense.id != currentExpense.id))
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>{currentExpense.description}</div>
      <div>${currentExpense.cost}</div>
      <div>
        <button onClick={() => handleDeleteExpense(currentExpense)}>x</button>
      </div>
    </li>
  );
};

export default ExpenseItem;
