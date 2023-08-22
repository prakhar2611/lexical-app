import axios from "axios";
import { useState,useEffect } from "react";

export function useConfig() {
    // const [config, setConfig] = useState({
    //     "Testing" : "123"
    // });
      useEffect(()=>{ axios("http://localhost:3000/config.json").then((res)=>{
    console.log(res.data)
    return res.data})},[])
    
    // return config
}