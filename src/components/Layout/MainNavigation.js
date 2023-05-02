import { Link, useHistory } from 'react-router-dom';
import '../Profile/Profile.css'
import classes from './MainNavigation.module.css';
// import { useContext } from 'react';
// import AuthContext from '../../Store/auth-context';
import {useSelector, useDispatch} from 'react-redux';
import { expAction } from '../../Store/expense-slice';
import { authAction } from '../../Store/auth-slice';

const MainNavigation = () => {
   const history= useHistory();
  // const authCtx =useContext(AuthContext);
  const dispatch= useDispatch();
  const isAuth= useSelector(state => state.auth.isAuthenticated)
  const prem=useSelector(state=> state.exp.activePremium)
  const receivedData= useSelector(state => state.exp.items)


  const logoutHandler =()=>{
    dispatch(authAction.logout()); 
    history.replace('/auth');
  }
 

  const verifyHandler=(e)=>{
    e.preventDefault();

    fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDDc95s07l_05ScHudZioRknTJX8QvwBL8",{
        method:'POST',
        body:JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken:localStorage.getItem('token')
        }),
        headers:{'Content-Type': 'application/json'}
    })
    .then((res)=>{
        const data=res.json();
        data.then((resp)=>{
            console.log(resp);
        })
    })
    .catch(err =>alert(err))

}

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>Expense Tracker</div>
      </Link>
      <nav>
        
        <ul>
          {!isAuth &&  <li>
            <Link to='/auth'>Login</Link>
          </li>}
          {isAuth && <li>
            <Link to='/profile'>Complete Profile</Link>
          </li>}
          {isAuth &&   <li>
            <button  onClick={logoutHandler}>Logout</button>
            <button className="verifyBtn" onClick={verifyHandler}> Verify Email </button>
          </li>}
        
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
