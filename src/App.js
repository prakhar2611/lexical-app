import "./App.css";
// import {Editor} from "./Editor";
// import {Editor} from "./Editor";
import { GlyfEditor } from 'glyf';
import { FileList } from "./FileList";
import { Button, Form, Input, Radio,Layout,message,Switch,Progress,Badge,Avatar,Statistic} from 'antd';

export default function App() {
  return (
    <div className="layout">
      <div style={{'background' : 'none','width':'20%', 'flexShrink':1 }}>
      <FileList/>
      </div>
      <div style={{'background' : 'none', 'flex': 1,'display':'flex','flexDirection':'column','justifyContent':'space-around'}}>
       
        <div style={{'display':'flex','justifyContent':'space-between'}}> 
          <Button style={{'padding':'1.2rem','margin':'.5rem','backgroundColor':'rgba(170,180,220,.5)'}} label="Save" title="Hi">JAIMATADI OM</Button>
          <Button style={{'padding':'1.2rem','margin':'.5rem','backgroundColor':'rgba(170,180,220,.5)'}} label="Edit" title="OK">FUDDI FADO</Button>
        </div>
        <div 
         style={{'display':'flex','flexDirection':'column','justifyContent':'center','flex':1,'background' : '#aaa','height':'80%','overflow':'hidden'}}> 
        {/* <Editor/> */}
        <GlyfEditor initialConfig={{ editable: false,}} />
        <GlyfEditor />
        </div>
       
      </div>

    </div>

    
  );
}
