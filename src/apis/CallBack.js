import {Redirect,useState,useEffect } from 'react'
import { useSearchParams, redirect ,useNavigate  } from "react-router-dom";
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { getuserDetails } from './SignIn';
import { setUser } from '../Utils/Reducers/userSlice';




export function CallbackRoute() {
    var [token, settoken] = useState()
    var [expiry, setexpiry] = useState()
    var [tokentype, settokentype] = useState()
    var [res ,setres] = useState(null)
    const navigate  = useNavigate ();
    const dispatch = useDispatch();

    //const [searchParams] = useSearchParams();
    const searchParams = new URLSearchParams(window.location.href)
    console.log(searchParams);
    var t = searchParams.get("access_token")
    setexpiry = searchParams.get("expires_in")
    settokentype = searchParams.get("token_type")

   //saving
    sessionStorage.setItem('access_token', t);
  
    //calling server to save the token in the cache 
    var data = {
        access_token : t,
        //Expiry : setexpiry,
        token_type : settokentype    
    }


    //useEffect(() =>{ 
       axios.post(serverurl+'api/User/v1/Signin', JSON.stringify(data),{
        headers: {
            'Content-Type': 'application/json',
         },
    })
      .then(response => {
        console.log(response.data);
        if (response.data.status == true) {
          navigate('/docs')
        }
      })
      .catch(error => {
        console.error(error);
 
      });

      //setres(mydata);
    //},[]);

    navigate('/');

    // if(res.data.status){
    //     return redirect("/Welcome");
    // }else{
    //     return redirect("/Oops")
    // }
  }
  
  