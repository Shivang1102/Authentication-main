import Expenses from "../NewExpense/Expenses";
import React ,{useState}from "react";

import NewExpense from '../NewExpense/NewExpense'



const Dummy_Expense = [
  { 
    id:'e1',
    title: "Toilet Paper",
    amount: 250,
    date: new Date(2021, 2, 24),
    
  },
  {
    id:'e2',
    title: "Car Insurance",
    amount: 450,
    date: new Date(2021, 5, 28),
   
  },
  {
    id:'e3',
    title: "Food",
    amount: 150,
    date: new Date(2021, 6, 23),
   
  },
  {
    id:'e4',
    title: "Movie",
    amount: 360,
    date: new Date(2021, 3, 19),
   
  },
];
const StartingPageContent = () => {

  const[expenses,setExpenses]=useState(Dummy_Expense);
  const addExpenseHandler=expense=>{
    setExpenses(prevExpense=>{
      return [expense, ...prevExpense];
    });
   }
  return (
     <div>
     <NewExpense  onAddExpense={addExpenseHandler}/>
      <Expenses  items={expenses}/>
     </div>
  );
};

export default StartingPageContent;
