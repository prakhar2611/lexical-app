import axios from "axios";
import { useDispatch } from "react-redux";
import { updatedirectory } from "../Utils/Reducers/directorySlice";

const serverurl = process.env.REACT_APP_TEST_SERVER_URL
const token = sessionStorage.getItem('access_token');

export function getdocs(){
    //const dispatch = useDispatch()

    console.log("Request payload for fetching the data : ", serverurl+`docs/api/v1/listDocs` )
    return  axios.get(`http://localhost:9005/docs/api/v1/listDocs`,{
            headers: {           
                'Content-Type': 'application/json',
                'token' :  token
            },        
        })
        .then(response => response.data.Data)
        .catch(error => {return console.error(error)});
  }