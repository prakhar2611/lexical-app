import "./App.css";
import {Editor} from "./Editor";
import { FileList } from "./FileList";
import { useSelector, useDispatch } from 'react-redux'

import { setcontent } from './Utils/Reducers/contentSlice';

import {useEffect,useState} from 'react';

import { Button, Form, Input, Radio,Layout,message,Switch,Progress,Badge,Avatar,Statistic} from 'antd';
// import { LexicalEditor } from "./Editor/Editor";
  
export default function App() {

  // const content = useSelector((state) => state.content.value);
  const content = useSelector((state) => state.page.value['content']);
  const title = useSelector((state)=>state.page.value['title']);

  return (
    <div className="layout">
      <div style={{'background' : 'none','width':'30%', 'flexShrink':1 }}>
      <FileList/>
      </div>
      <div style={{'background' : 'none', 'flex': 1,'display':'flex','flexDirection':'column','justifyContent':'space-around'}}>
       
        {/* <div style={{'display':'flex','justifyContent':'space-between'}}> 
          <Button style={{'padding':'1.2rem','margin':'.5rem','backgroundColor':'rgba(170,180,220,.5)'}} label="Save" title="Hi">Save</Button>
          <Button style={{'padding':'1.2rem','margin':'.5rem','backgroundColor':'rgba(170,180,220,.5)'}} label="Edit" title="OK">Edit</Button>
        </div> */}
        <div  style={{'flex':1,'background' : '#ffd','height':'100vh'}}> 
       <Editor content={content} title={title}/> 
        </div>
       
      </div>

    </div>

    
  );
}
