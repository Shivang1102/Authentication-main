import { Fragment, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import classes from "./AuthForm.module.css";
const Forget=()=>{
    const [email, setEmail]= useState('');
    const [send, setSend]= useState(false)

   const history= useHistory();

    const emailHandler=(e)=>{
        setEmail(e.target.value);
    }

    const submitHandler=(e)=>{
        console.log('hi')
        e.preventDefault();
        setSend(true);
        fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDDc95s07l_05ScHudZioRknTJX8QvwBL8",{
            method: "POST",
            body:JSON.stringify({
                requestType:"PASSWORD_RESET",
                email:email
            }),
            headers:{'Content-Type': 'application/json'}
        }).then((res)=>{
            setSend(false);
            const data=res.json();
            data.then((resp)=>{
                console.log(resp);
                if(resp.error){
                    alert(resp.error.message);
                }else{
                    alert('Check your Mail and Reset Password');
                    history.replace('/auth')
                }
            })
        }).catch((err)=>{
            console.log(err)
            setSend(false);
        })
    }

    return (
        <Fragment>
            <form className={classes.auth}>
                <div className={classes.control}>
                <label>Enter Registered Email ID</label><br/>  
                <input type='email' onChange={emailHandler} value={email}/><br/>
                {send && <p>Sending link Request... </p>}
            <button type='submit' onClick={submitHandler}>Send Link</button><br/>
                <Link to='/auth'>Already a user ? Login</Link>
                </div>
            </form>
        </Fragment>
    );
}

export default Forget;