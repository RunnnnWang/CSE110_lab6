import React, { useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";
import { Expense} from "../../types/types";
import {v4 as uuidv4 } from "uuid";
import {cExpense} from "../../utils/expense-utils"


const AddExpenseForm = () => {

  // Exercise: Consume the AppContext here
  


    const { expenses, setExpenses, budget, setBudget } = useContext(AppContext);

    const initialExpense = 
      {   id: uuidv4(),
          description: "",
          cost: 0,
      };
    
    const [createExpense, setCreateExpense] = useState(initialExpense);



    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try{

      
      const newExpense = {
        ...createExpense,
      };

    const expenseList = await cExpense(newExpense); 

    

    setCreateExpense(initialExpense);

    // Exercise: Add add new expense to expenses context array

    setExpenses((expenses) => [...expenses, expenseList]);
    } catch (error) {
      console.error("Error creating expense:", error)
    }
  };

  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="description">Description</label>
          <input
            required
            type="text"
            className="form-control"
            id="description"
            value={createExpense.description}
            onChange={(event) =>
              setCreateExpense({...createExpense, description:event.target.value})
            }
            // HINT: onChange={}
          ></input>
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            required
            type="number"
            className="form-control"
            id="cost"
            value={createExpense.cost}
            onChange={(event) =>
              setCreateExpense({...createExpense, cost:parseFloat(event.target.value)})
            }
            // HINT: onChange={}
          ></input>
        </div>
        <div className="col-sm">
          <button type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;
