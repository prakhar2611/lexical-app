import {Redirect,useState,useEffect } from 'react'
import { useSearchParams, redirect ,useNavigate  } from "react-router-dom";
import axios from 'axios'




export function () {
    var [token, settoken] = useState()
    var [expiry, setexpiry] = useState()
    var [tokentype, settokentype] = useState()
    var [res ,setres] = useState(null)
    const navigate  = useNavigate ();

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
       axios.post('http://192.168.1.5:9005/api/User/v1/Signin', JSON.stringify(data),{
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

    navigate('/Welcome');

    // if(res.data.status){
    //     return redirect("/Welcome");
    // }else{
    //     return redirect("/Oops")
    // }
  }
  
  