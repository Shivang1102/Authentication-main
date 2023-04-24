import { useRef, useState, useEffect } from "react";
import "./DailyExpenses.css";
import axios from "axios";
import { Button, Form, Table } from "react-bootstrap";

const DailyExpense = () => {
  const [expenses, setExpenses] = useState([]);
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Category");

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
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
        amount.current.value = res.data.amount;
        des.current.value = res.data.descp;
        categories.current.value = res.data.cate;
        handleDelete(id);
      })
      .catch((err) => console.log(err));

    // const expenseToUpdate = expenses.find((expense) => expense.id === id);
    // setEnteredAmount(expenseToUpdate.amount);
    // setEnteredDescription(expenseToUpdate.description);
    // setSelectedCategory(expenseToUpdate.category);

    // // remove the expense that is being edited from the list
    // const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    // setExpenses(updatedExpenses);
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

  const totalExpenses = expenses.reduce(
    (total, expense) => total + parseInt(expense.amount),
    0
  );

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
      <div style={{ display: "flex", justifyContent: "space-around" }}>
      

        {totalExpenses > 10000 && (
          <button
            style={{
              padding: "1px",
              borderRadius: "10px",
              margin: "1px",
              color: "blue",
              backgroundColor: "green",
              cursor: "pointer",
              height: "50px",
            }}
            onClick={() => alert("Pay 10000 to Activate Premium")}
          >
            Activate Premium
          </button>
        )}
      </div>

      {expenses.length > 0 && (
        <div>
          {expenses.map((expense, index) => (
            <div
              key={index}
              style={{ padding: "10px", borderRadius: "10px", margin: "5px" }}
            >
              <p>
                Amount : {expense.amount} -- Description : {expense.description}{" "}
                -- Category : {expense.category}
                <button
                  onClick={() => handleEdit(expense.id)}
                  style={{
                    padding: "5px",
                    borderRadius: "10px",
                    margin: "5px",
                    backgroundColor: "red",
                    color: "yellow",
                    backgroundColor: "blue",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(expense.id)}
                  style={{
                    padding: "5px",
                    borderRadius: "10px",
                    margin: "5px",
                    color: "yellow",
                    backgroundColor: "blue",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </p>
       
            </div>
            
          ))}
                 <h2>Total expenses : {totalExpenses}</h2>
        </div>
      )}
    </>
  );
};

export default DailyExpense;
