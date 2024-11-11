import { AppContext } from "../../context/AppContext";
import { useContext, useEffect, useState } from "react";
import { updateBudget } from "../../utils/budget-utils"


const ChangeBudgetForm = () => {
    const { budget, setBudget } = useContext(AppContext);

    const [createBudget, setCreateBudget] = useState(budget);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(`Current budget value: ${createBudget}, Type: ${typeof createBudget}`);

        await updateBudget(createBudget);

        setBudget(createBudget);
    };

    
  
    return (
        <form onSubmit={onSubmit}>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="budget">Budget</label>
          <input
            required
            type="number"
            className="form-control"
            id="budget"
            value={createBudget}
            onChange={(event) => setCreateBudget(Number(event.target.value))}
          />
        </div>
        <div className="col-sm">
          <button type="submit" className="btn btn-primary mt-3">
            Change
          </button>
        </div>
      </div>
    </form>
    );
  };
  
  export default ChangeBudgetForm;