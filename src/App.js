import "./App.css";
import {Editor} from "./Editor";
import { FileList } from "./FileList";
import { Button, Form, Input, Radio,Layout,message,Switch,Progress,Badge,Avatar,Statistic} from 'antd';

export default function App() {
  return (
    <div className="layout">
      <div style={{'background' : 'none','width':'30%', 'flexShrink':1 }}>
      <FileList/>
      </div>
      <div style={{'background' : 'none', 'flex': 1,'display':'flex','flexDirection':'column','justifyContent':'space-around'}}>
       
        <div style={{'display':'flex','justifyContent':'space-between'}}> 
          <Button style={{'padding':'1.2rem','margin':'.5rem','backgroundColor':'rgba(170,180,220,.5)'}} label="Save" title="Hi">JAIMATADI OM</Button>
          <Button style={{'padding':'1.2rem','margin':'.5rem','backgroundColor':'rgba(170,180,220,.5)'}} label="Edit" title="OK">FUDDI FADO</Button>
        </div>
        <div  style={{'flex':1,'background' : '#ffd','height':'100vh'}}> 
        </div>
       
      </div>

    </div>

    
  );
}
