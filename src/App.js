import "./App.css";
import {Editor} from "./Editor";
// import {Editor} from "./Editor";
import { GlyfEditor } from 'glyf';
import { FileList } from "./FileList";
import { Button, Form, Input, Radio,Layout,message,Switch,Progress,Badge,Avatar,Statistic} from 'antd';

export default function App() {
  return (
    <div style={{
      'padding':'1rem', 'margin':'1rem 2rem 2rem 1rem','background' : '#aca','overflow':'hidden'}}>
    <div className="layout">
      <div style={{'background' : 'none','height':'20%','width':'20%', 'flexShrink':1 }}>
      <FileList/>
      </div>
      <div   style={{'flex':2,'background' : '#aaa','overflow':'hidden'}} >
       
        
        {/* <div  */}
         {/* <ToolbarPlugin /> */}
        <Editor autoFocus/>
     
        <div style={{'display':'flex','justifyContent':'right'}}> 
          <Button style={{'padding':'.2rem','margin':'.5rem','backgroundColor':'rgba(170,180,220,.5)'}} label="Save" title="Hi">CREATE</Button>
          <Button style={{'padding':'.2rem','margin':'.5rem','backgroundColor':'rgba(170,180,220,.5)'}} label="Edit" title="OK">SAVE</Button>
        </div>
        {/* <GlyfEditor initialConfig={{ editable: false,}} /> */}
        {/* <GlyfEditor /> */}
        {/* </div> */}
       
      </div>

    </div>

    </div>
  );
}
