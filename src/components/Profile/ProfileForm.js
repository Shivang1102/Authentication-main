
import './Profile.css'

import AuthContext from '../../Store/auth-context';

import React, { useEffect, useState , useContext} from "react";
import { Link } from "react-router-dom";


const ProfileForm = () => {

  const [name, setName]=useState('');
  const [profileUrl, setUrl]=useState('');

  const nameChange=(e)=>{setName(e.target.value)};
  const urlChange=(e)=>{setUrl(e.target.value)};



  const authCtx = useContext(AuthContext)

  const submitHandler =(event)=>{
    event.preventDefault();



    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDDc95s07l_05ScHudZioRknTJX8QvwBL8',{
      method:'POST',
      body: JSON.stringify({
        idToken:authCtx.token,
        displayName:name,
        photoUrl:profileUrl,
        returnSecureToken:false
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then((res)=>{
      const data=res.json();
      console.log(data);
      data.then((resp)=>{
          if(resp.error){
              alert(resp.error.message)
          }else{console.log(resp)}
      })
     }).catch((err) => {
      console.log(err);
      alert(err)})
     console.log(name);

  }

  const getDataHandler=()=>{
    fetch("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDDc95s07l_05ScHudZioRknTJX8QvwBL8",{
        method: 'POST',
        body:JSON.stringify({
            idToken:authCtx.token,
        }),
        headers:{'Content-Type': 'application/json'}
    }).then((res)=>{
        const data= res.json();
        data.then((resp)=>{
            console.log( "get data user",resp);
            setName(resp.users[0].displayName);
            setUrl(resp.users[0].photoUrl);
        })
    })
}
useEffect(()=>getDataHandler(), [])
  //   }).then((res) => {
       
  //     if (res.ok) {
  //       return res.json();
  //     } else {
  //       return res.json().then((data) => {
  //         let errorMessage = "Authonication Failed";
  //         if (data && data.error && data.error.message) {
  //           errorMessage = data.error.message;
  //         }

  //         throw new Error(errorMessage);
        
  //       });
  //     }
    
  //   }).then((data) => {
  //     authCtx.login(data.idToken);
  //     alert('Password Changed ')
  //     history.replace('/')
  //   })
  //   .catch((err) => {
  //     alert(err.message);
  //   });
  // }
  return (
    <>
    <div className="main">
        <div >Winner never Quit</div>
        <div className="right"> Complete Your profile to get high Chance for job</div>
    </div>
    <form className='form1'>
    <div className='form-head'><h3>Contact Detail</h3>
    <Link to="/"><button className='cancel'>X</button></Link>
    </div><br/>
    <div>
        <label htmlFor="name">Full Name: </label>
        <input type="text" value={name} onChange={nameChange}/>
        <label htmlFor="url">Profile Photo url : </label>
        <input type="text" value={profileUrl} onChange={urlChange}/>
    </div><br/>
    <button type="submit" className="button" onClick={submitHandler}> Update </button>
    </form>
    </>
  );
}

export default ProfileForm;
