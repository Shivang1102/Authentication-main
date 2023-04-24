import React, { useState } from "react";
import "./ExpenseForm.css";
function ExpenseForm(props) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmouunt] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  //    const[userInput, setUserInput]=useState({
  //     enteredTitle:'',
  //     enteredAmount:'',
  //     EnteredDate:''
  //    })
  function titleChangeHandler(event) {
    setEnteredTitle(event.target.value);
    // setUserInput({
    //     ...userInput,
    //     enteredTitle:event.target.value
    // });
    // setUserInput((prestage)=>{
    //      return {
    //         ...prestage,
    //         enteredTitle:event.target.value
    //      }
    // }
    // )
  }
  const amountChangeHandler = (event) => {
    setEnteredAmouunt(event.target.value);
    // setUserInput({
    //     ...userInput,
    //     enteredAmount:event.target.value
    // });
  };
  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
    // setUserInput({
    //     ...userInput,
    //     EnteredDate:event.target.value
    // });
  };

  const submitHandle=(event)=>{
     event.preventDefault();
    
     const expenseData={
      title:enteredTitle,
      amount:enteredAmount,
      date:new Date(enteredDate)
     }
     props.onSaveExpenseData(expenseData)
     setEnteredTitle('')
     setEnteredAmouunt('')
     setEnteredDate('')
  }
  return (
    <form onSubmit={submitHandle}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input type="text"  value={enteredTitle}onChange={titleChangeHandler} />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={enteredAmount}
            onChange={amountChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            min="2019-01-01"
            max="2023-12-31"
            value={enteredDate}
            onChange={dateChangeHandler}
          />
        </div>
      </div>
      <div className="new-expense__actions">
       <button type="button" onClick={props.onCancel}>Cancel</button>
        <button type="submit">ADD Expense</button>
      </div>
    </form>
  );
}
export default ExpenseForm;