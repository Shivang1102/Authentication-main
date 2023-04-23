import {  Redirect, Route , Switch } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';

import HomePage from './pages/HomePage';
import { useContext } from 'react';
import AuthContext from './Store/auth-context';
import AuthForm from './components/Auth/AuthForm';

function App() {

 const authCtx =   useContext(AuthContext);
  return (
    <Layout>
     <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
       {!authCtx.isLoggedIn &&   <Route path='/auth'>
          <AuthForm />
        </Route>}
        <Route path='/profile'>
        { authCtx.isLoggedIn && <UserProfile /> }
        {!authCtx.isLoggedIn &&   <Redirect to='/auth'/> }
        </Route>
        <Route path='*'>
           <Redirect to='/'/>
        </Route>
        </Switch>
    </Layout>
  );
}

export default App;
