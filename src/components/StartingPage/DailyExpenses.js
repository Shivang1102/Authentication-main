import { useRef, useState, useEffect } from "react";
import "./DailyExpenses.css";
import axios from "axios";
import { Button, Form, Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { expAction } from "../../Store/expense-slice";

const DailyExpense = () => {
  const [expenses, setExpenses] = useState([]);
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Category");
  const [render,setRender]=useState(true)
  
  const dispatch=useDispatch();

  const amount = useRef();
  const des = useRef();
  const categories = useRef();

  const Useremail = localStorage.getItem("email");
  const ChangesEMail = Useremail.replace("@", "").replace(".", "");

  useEffect(() => {
    axios
      .get(
        `https://expensetracker-c8290-default-rtdb.firebaseio.com/expenses/${ChangesEMail}.json`
      )
      .then((response) => {
        const fetchedExpenses = [];
        for (let key in response.data) {
          fetchedExpenses.push({
            id: key,
            ...response.data[key],
          });
        }
        setExpenses(fetchedExpenses);
        dispatch(expAction.addItemHandler(fetchedExpenses));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [render]);

  const formSubmit = (event) => {
    event.preventDefault();

    const enteredAmount = amount.current.value;
    const enteredDes = des.current.value;
    const enteredCategory = categories.current.value;

    setEnteredAmount("");
    setEnteredDescription("");
    setSelectedCategory("Category");

    axios
      .post(
        `https://expensetracker-c8290-default-rtdb.firebaseio.com/expenses/${ChangesEMail}.json`,
        {
          amount: enteredAmount,
          description: enteredDes,
          category: enteredCategory,
        }
      )
      .then((response) => {
        setExpenses((prevExpenses) => [
          ...prevExpenses,
          {
            id: response.data.time,
            amount: enteredAmount,
            description: enteredDes,
            category: enteredCategory,
          },
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
   
   

  const handleEdit = (id) => {
    axios   
      .get(
        `https://expensetracker-c8290-default-rtdb.firebaseio.com/expenses/${ChangesEMail}/${id}.json`
      )
      .then((res) => {
        console.log(res);
        if (res.data) {
            amount.current.value= res.data.amount
            des.current.value= res.data.descp;
            categories.current.value=res.data.cate

       
        }
      })
      .catch((err) => console.log(err));

   

    // remove the expense that is being edited from the list
    // const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    // setExpenses(updatedExpenses);
    handleDelete(id)
  };

  const handleDelete = (id) => {
    axios
      .delete(
        `https://expensetracker-c8290-default-rtdb.firebaseio.com/expenses/${ChangesEMail}/${id}.json`
      )
      .then(() => {
        setExpenses((prevExpenses) =>
          prevExpenses.filter((expense) => expense.id !== id)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
 let totalAmount=0;
  Object.keys(expenses).forEach((key)=>{
    totalAmount= totalAmount + (+expenses[key].amount);
})
if(totalAmount > 10000){
    dispatch(expAction.premiun())
}else{
    dispatch(expAction.nonPremium());
}

  return (
    <>
      <fieldset
        style={{
          textAlign: "center",
          padding: "20px",
          backgroundColor: "black",
          color: "blue",
        }}
      >
        <h4> Daily Expense Tracker</h4>
        <Form
          className="container"
          onSubmit={formSubmit}
          style={{ padding: "25px" }}
        >
          <Form.Group controlId="amount" className="amount">
            <Form.Label
              style={{ padding: "10px", margin: "5px", borderRadius: "10px" }}
            >
              Amount :
            </Form.Label>
            <Form.Control
              ref={amount}
              value={enteredAmount}
              type="number"
              placeholder="Amount in Rs"
              onChange={(event) => setEnteredAmount(event.target.value)}
              required
              style={{ padding: "10px", margin: "5px", borderRadius: "10px" }}
            />
          </Form.Group>
          <Form.Group className="descp" controlId="description">
            <Form.Label
              style={{ padding: "10px", margin: "3px", borderRadius: "10px" }}
            >
              Short Description:
            </Form.Label>
            <Form.Control
              ref={des}
              value={enteredDescription}
              type="text"
              onChange={(event) => setEnteredDescription(event.target.value)}
              required
              style={{ padding: "10px", margin: "5px", borderRadius: "10px" }}
            />
          </Form.Group>
          <Form.Group className="cato" controlId="category">
            <Form.Label
              style={{ padding: "10px", borderRadius: "10px", margin: "5px" }}
            >
              Choose Category:
            </Form.Label>
            <Form.Control
              ref={categories}
              value={selectedCategory}
              as="select"
              name="category"
              onChange={(event) => setSelectedCategory(event.target.value)}
              required
              style={{ padding: "10px", borderRadius: "10px", margin: "5px" }}
            >
              <option value="">-- Select --</option>
              <option>Food</option>
              <option>Petrol</option>
              <option>Shopping</option>
              <option>Rent</option>
            </Form.Control>
          </Form.Group>

          <input
            type="submit"
            value="Submit"
            style={{
              padding: "10px",
              margin: "5px",
              borderRadius: "10px",
              backgroundColor: "red",
              color: "yellow",
              borderRadius: "10px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          />
        </Form>
      </fieldset>
      <div className="table">
        <h3>Expense List</h3>
        <Table striped bordered hover>
        <thead><tr>
            <th>#</th>
            <th>Category</th>
            <th>Description</th>
            <th>Amount</th>
            
        </tr></thead>
        <tbody>
            {Object.keys(expenses).map((key,index)=> (
                //console.log(getExp[key]),
                <tr key={expenses[key].id}>
                    <td>{index + 1}</td>
                    <td>{expenses[key].category} </td>
                    <td>{expenses[key].description}</td>
                    <td>{expenses[key].amount}</td>
                    <td><Button variant='danger' onClick={()=>handleDelete(expenses[key].id)} >Delete</Button></td>
                    <td><Button variant='secondary' onClick={()=>handleEdit(expenses[key].id)}>Edit</Button></td>
                </tr>
            ))}
        </tbody>
        </Table>
    </div>
    <h2> Total Amount = Rs {totalAmount}</h2>
    </>
  );
};



export default DailyExpense;
