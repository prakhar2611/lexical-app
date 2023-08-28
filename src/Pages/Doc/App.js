import "./App.css";
import {Editor} from "./Editor";
import { FileList } from "./FileList";
import { Button, Form, Input, Radio,Layout,message,Switch,Progress,Badge,Avatar,Statistic} from 'antd';


import * as Separator from '@radix-ui/react-separator';
import { useSelector, useDispatch } from 'react-redux'
import { setcontent } from '../../Utils/Reducers/contentSlice';
import {useEffect,useState} from 'react';
import { Theme,Flex,Container,Box, Card, Heading, Text } from "@radix-ui/themes";
import { updatedirectory } from "../../Utils/Reducers/directorySlice";
import { getdocs,saveFile } from "../../apis/DocsApi";
import { EditTwoTone } from "@ant-design/icons";

  
export function AppTest() {

  const content = useSelector((state) => state.page.value['content']);
  const title = useSelector((state)=>state.page.value['title']);
  const folder =  useSelector((state)=>state.page.value['folder']);
  const saveContent = useSelector((state)=>state.tosavecontent.value);

  const dispatch = useDispatch()
  const [iseditable , setiseditable] =useState(false);
  const [currtitle,setcurrTitle] =useState('')
  const [savelabel,setsavelabel] = useState("Save")

const currentdate = new Date(); 
const datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
  const plchldr = currentdate.getDate() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes()  + " | " 
                + " Enter a title for this record"


      // on edit button make editable true 
      function makeEditable() {
        setiseditable(true)
        setcurrTitle(title)     
   }
   function makeUneditable() {
         setiseditable(false)
   
   }
   function setCurrentTitle(value) {
    setcurrTitle(value)
    if(value != title){
      setsavelabel("Save As")
    }else{
      setsavelabel("Save")

    }
  }

     //save it to db function
     function onSave() {
      console.log("save content =====> ",  saveContent)
      saveFile(saveContent,currtitle,folder)
      getdocs().then(res => {
        dispatch(updatedirectory(res)) 
       }).catch(error => console.error(error))
      }

 
  return (
  <Theme accentColor="orange" grayColor="sand" radius="large" scaling="95%">
      <Flex className="mainflex">  
        <Card className="topNavBar">
        </Card>                  
        <div className="content">
          <div className="sideBar">
            <FileList/>

          </div>
          <div className="editor">
            <div className="editor-1">
              <Card style={{'width' :'25rem' ,'display':'flex','flexGrow' : '6'}}>
                <Flex direction={"column"} >
                  {(!iseditable)&&<Heading size={"7"}>{title}</Heading>}
                  {(iseditable)&&<Input style={{'width':'50rem'}} value={currtitle} disabled={false} onChange={(e)=>setCurrentTitle(e.target.value)} placeholder={plchldr} />}

                  <Separator.Root className="SeparatorRoot" style={{ margin: '5px 0px' }} />
                  <Flex style={{'justifyContent' :'flex-start' ,'gap': '1rem','alignItems':'baseline'}}>            
                    <Heading size={"2"}>Folder</Heading> 
                    <Text size={"2"}>{folder}</Text>
                  </Flex>
                </Flex>
                </Card>

                <Card  style={{'display':'flex','flexGrow' : '1'}}>
                {  (iseditable)&&<Button style={{'width':'10vw'}} label="cancel" onClick={makeUneditable} > Cancel </Button> }
          { (!iseditable)&&< Button style={{'width':'10vw'}} label="edit" onClick={makeEditable} ><EditTwoTone/> Edit </Button> }
          {  (iseditable)&&<Button style={{'width':'10vw'}} label="Save" onClick={onSave} > {savelabel} </Button> }
                
                </Card>

              
              </div>
              <div className="editor-2">
              <Card className="editarea">
                <Editor content={content} title={title}/>           
              </Card>
              </div>
          </div>
        </div>        
                                                                                                                                                                                                                                                                                                                                                                                                                                              
        
      
      </Flex>
  </Theme>
  );
}
