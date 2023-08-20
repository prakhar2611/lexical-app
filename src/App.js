import "./App.css";
import {Editor} from "./Editor";
import { FileList } from "./FileList";
import { Button, Form, Input, Radio,Layout,message,Switch,Progress,Badge,Avatar,Statistic} from 'antd';



import { useSelector, useDispatch } from 'react-redux'
import { setcontent } from './Utils/Reducers/contentSlice';
import {useEffect,useState} from 'react';

// import { LexicalEditor } from "./Editor/Editor";
  
export default function App() {

  // const content = useSelector((state) => state.content.value);
  const content = useSelector((state) => state.page.value['content']);
  const title = useSelector((state)=>state.page.value['title']);

  return (
    <div style={{
      // 'overflow':'scroll',
      'border':'1px dashed #3a6',
      'padding':'1rem', 'margin':'1rem 2rem 2rem 1rem','background' : '#aca'}}>
      <div className="layout" style={{
      'border':'1px dashed #6a3',}}>
        <div style={{'background' : 'none','width':'20%', 'flexShrink':1,'overflow':'scroll' }}>
          <FileList/>
        </div>
        {/* <div   style={{'flex':2,'background' : '#aaa','overflow':'hidden'}} > */}
          {/* <div style={{'display':'flex','justifyContent':'space-between'}}> 
            <Button style={{'padding':'1.2rem','margin':'.5rem','backgroundColor':'rgba(170,180,220,.5)'}} label="Save" title="Hi">Save</Button>
            <Button style={{'padding':'1.2rem','margin':'.5rem','backgroundColor':'rgba(170,180,220,.5)'}} label="Edit" title="OK">Edit</Button>
          </div> */}
          <div  style={{'overflow':'scroll','flex':4,'background' : '#ffd',}}> 
          <Editor content={content} title={title}/> 
          </div>
        
        {/* </div> */}

      </div>
    </div>

    
  );
}
