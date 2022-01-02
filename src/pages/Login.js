import React, { useState } from "react";
import {signInWithEmailAndPassword} from "firebase/auth";
import {doc,updateDoc} from "firebase/firestore";
import {auth,db} from "../firebase";
import {useNavigate} from "react-router-dom";
const  Login =() =>{

    const [data,setData] = useState({
        email: '',
        password: '',
        error: null,
        loading:false,
    });
    const {email,password,error,loading}=data;
    const history=useNavigate();

    const handleChange = (e) =>{
        setData({...data,[e.target.name]:e.target.value})
    }

    const handleSubmit = async e =>{
        e.preventDefault();
        setData({...data,error:null,loading:true})
        
        if(!email||!password){
            setData({...data,error:"All field are required"});
        }
        try{
            const result = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            await updateDoc(doc(db,'users',result.user.uid),{
            isOnline:true,
            });

            setData({email: '',password: '',error: null,loading:false,});
            history("/");
        }
        catch(err){
            setData({...data,error:err.message,loading:false})
        }
    }

    
    return (
      <section>
          <h3>Login into your account</h3>
          <form className="form" onSubmit={handleSubmit}>

              <div className="input_container">
                  <label htmlFor="email">Email</label>
                  <input type="text" name='email' value={email} onChange={handleChange}/>
              </div>
              <div className="input_container">
                  <label htmlFor="password">Password</label>
                  <input type="password" name='password' value={password} onChange={handleChange}/>
              </div>
              {error ? <p className="error">{error}</p>:null}
              <div className="btn_container" disabled={loading}>
                    <button className="btn">{loading ? 'Logging in...' : 'Login'}</button>
              </div>
          </form>
      </section>
  
    );
  }
  
  export default Login;
  