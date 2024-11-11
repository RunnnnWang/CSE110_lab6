import { AppContext } from "../../context/AppContext";
import { useContext, useEffect } from "react";
import { fetchBudget } from "../../utils/budget-utils"


const Budget = () => {
  const { budget, setBudget } = useContext(AppContext);

  useEffect(() => {
    loadBudget();
  }, []);

  const loadBudget = async () => {
    const budgetNum = await fetchBudget();
    setBudget(budgetNum);
  }

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      <div>Budget: ${budget}</div>
    </div>
  );
};

export default Budget;
