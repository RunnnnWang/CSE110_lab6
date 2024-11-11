import { useContext , useState, useEffect} from "react";
import { AppContext } from "../context/AppContext";
import { Modal, Button } from "react-bootstrap"


const Remaining = () => {
  const { expenses, budget } = useContext(AppContext);
  

  const totalExpenses = expenses.reduce((total, item) => {
    return (total = total + item.cost);
  }, 0);

  const [displayModal, setDisplayModal] = useState(false);

  const alertType = totalExpenses > budget ? "alert-danger" : "alert-success";

  useEffect(() => {
    if (alertType === "alert-danger") {
      setDisplayModal(true);
    }
  }, [totalExpenses, budget])
  
  

  // if (totalExpenses > budget) {
  //   alert("You have exceeded your budget!");
  //   return;
  // }
  // Exercise: Create an alert when Remaining is less than 0.

  return (
    <div className={`alert ${alertType}` }>
       
      <span>Remaining: ${budget - totalExpenses}</span>
      <Modal show={displayModal} onHide={() => setDisplayModal(false)}>
        <Modal.Body>You have exceeded your budget!</Modal.Body>
        <Button variant="secondary" onClick={() => setDisplayModal(false)}>
            ok
          </Button>
      </Modal>
    </div>
    
    

  );
};

export default Remaining;
