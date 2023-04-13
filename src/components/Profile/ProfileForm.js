import { useContext, useRef } from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../../Store/auth-context';
import { useHistory } from 'react-router-dom';

const ProfileForm = () => {
  const  history = useHistory();
  const enteredPasswordRef =  useRef();
  const authCtx = useContext(AuthContext)

  const submitHandler =(event)=>{
    event.preventDefault();

    const enteredNewPassword = enteredPasswordRef.current.value;


    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDDc95s07l_05ScHudZioRknTJX8QvwBL8',{
      method:'POST',
      body: JSON.stringify({
        idToken:authCtx.token,
        password:enteredNewPassword,
        returnSecureToken:false
      }),
      headers:{
        'Content-Type': 'application/json'
      }
      
    }).then((res) => {
       
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then((data) => {
          let errorMessage = "Authonication Failed";
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }

          throw new Error(errorMessage);
        
        });
      }
    
    }).then((data) => {
      authCtx.login(data.idToken);
      alert('Password Changed ')
      history.replace('/')
    })
    .catch((err) => {
      alert(err.message);
    });
  }
  return (
    <form className={classes.form}  onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={enteredPasswordRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
