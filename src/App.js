import {  Redirect, Route , Switch } from 'react-router-dom';

import Layout from './components/Layout/Layout';


import HomePage from './pages/HomePage';
// import { useContext } from 'react';
// import AuthContext from './Store/auth-context';
import AuthForm from './components/Auth/AuthForm';
import ProfileForm from './components/Profile/ProfileForm';
import Forget from './components/Auth/Forget';
import { useSelector } from 'react-redux';

function App() {
  const isLogin= useSelector(state=> state.auth.isAuthenticated);
//  const authCtx =   useContext(AuthContext);

  return (
    <Layout>
     <Switch>
       {isLogin && <Route path='/' exact>
          <HomePage />
        </Route>}
       {!isLogin &&   <Route path='/auth'>
          <AuthForm />
        </Route>} 
        {!isLogin && <Route path='/forget'><Forget/></Route>}
        <Route path='/profile'>
        {isLogin && <ProfileForm /> }
        {!isLogin &&   <Redirect to='/auth'/> }
        </Route>
        <Route path='*'>
           <Redirect to='/'/>
        </Route>
        </Switch>
    </Layout>
  );
}

export default App;
