import { Link, useHistory } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import { useContext } from 'react';
import AuthContext from '../../Store/auth-context';

const MainNavigation = () => {
   const history= useHistory();
  const authCtx =useContext(AuthContext);

  const logoutHandler =()=>{
     authCtx.logout();
    history.replace('/auth');
  }
  const isLoggedIn = authCtx.isLoggedIn;
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>Expense Tracker</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn &&  <li>
            <Link to='/auth'>Login</Link>
          </li>}
          {isLoggedIn && <li>
            <Link to='/profile'>Profile</Link>
          </li>}
          {isLoggedIn &&   <li>
            <button  onClick={logoutHandler}>Logout</button>
          </li>}
        
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
