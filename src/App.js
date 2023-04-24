import {  Redirect, Route , Switch } from 'react-router-dom';

import Layout from './components/Layout/Layout';


import HomePage from './pages/HomePage';
import { useContext } from 'react';
import AuthContext from './Store/auth-context';
import AuthForm from './components/Auth/AuthForm';
import ProfileForm from './components/Profile/ProfileForm';
import Forget from './components/Auth/Forget';

function App() {

 const authCtx =   useContext(AuthContext);
  return (
    <Layout>
     <Switch>
       {authCtx.isLoggedIn && <Route path='/' exact>
          <HomePage />
        </Route>}
       {!authCtx.isLoggedIn &&   <Route path='/auth'>
          <AuthForm />
        </Route>}
        {!authCtx.isLoggedIn && <Route path='/forget'><Forget/></Route>}
        <Route path='/profile'>
        { authCtx.isLoggedIn && <ProfileForm /> }
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
