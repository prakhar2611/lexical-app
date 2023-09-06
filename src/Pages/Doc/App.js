import "./App.css"; 

import {Editor, makeEditorEditable, MakeEditorEditable} from "./Editor";
import { FileList } from "./FileList";
import { Button, Select, Input, Radio,Layout,message,Switch,Progress,Badge,Avatar,Statistic} from 'antd';


import * as Separator from '@radix-ui/react-separator';
import { useSelector, useDispatch } from 'react-redux'
import { setcontent } from '../../Utils/Reducers/contentSlice';
import {useEffect,useState} from 'react';
import { Theme,Flex,Container,Box, Card, Heading, Text } from "@radix-ui/themes";
import { updatedirectory } from "../../Utils/Reducers/directorySlice";
import { getdocs,saveFile } from "../../apis/DocsApi";
import { AlignCenterOutlined, AlignLeftOutlined, EditTwoTone, PlusCircleTwoTone, UserOutlined } from "@ant-design/icons";
import { setCurrFolder, setNewPage } from "../../Utils/Reducers/pageSlice";
import { Cross1Icon, CrossCircledIcon } from "@radix-ui/react-icons";
import { setUser } from "../../Utils/Reducers/userSlice";
import { getuserDetails } from "../../apis/SignIn";
import { seteditable, setonselectEditable } from "../../Utils/Reducers/editorSlice";

  
export function AppTest() {

  const content = useSelector((state) => state.page.value['content']);
  const title = useSelector((state)=>state.page.value['title']);
  const folder =  useSelector((state)=>state.page.value['folder']);
  const saveContent = useSelector((state)=>state.tosavecontent.value);
  const folderList = useSelector((state)=>state.directory.value.folderList);

  const dispatch = useDispatch()

  const [currtitle,setcurrTitle] =useState(title)
  const [currfoldername,setinputFolder] = useState(folder)
  const [userimage,setuserimage] = useState('')

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
  // function makeEditable() {
  //   dispatch(seteditable(true))
  //       setcurrTitle(title)     
  // }

  function setCreateTemplate() {
    dispatch(setNewPage())
    // makeEditable()
  }


  // function GetFileList()
  // { 
  //   useEffect(() => {
  //     makeUneditable()
  //   },[])
   
  //   return( 
  //     <FileList/>
  //   )
  // }


  useEffect(()=>{
    getuserDetails().then((res) => { setuserimage(res.picture)}).catch(error => console.error(error))
    },[1])

  return (
  <Theme accentColor="orange" grayColor="sand" radius="large" scaling="95%">
      <Flex className="mainflex">  

        <div className="topNavBar">
          {/* <Flex className="newSide">
            <AlignCenterOutlined/>
          </Flex> */}
          <Flex gap={"3"}>
            <Heading size={"7"}>KNOTS</Heading>
            <Avatar size={40} icon={<img src="./knots.jpg"></img>} />
          </Flex>          

          <Flex gap={"3"} >
            <Heading size={"5"}>{title}</Heading>
              <Text size={"2"}>{folder}</Text>
           </Flex>

          <Avatar size={40} icon={<img src={userimage}></img>} />
        </div>          

        <div className="content">
          <div className="sideBar">
            <PlusCircleTwoTone onClick={setCreateTemplate} /> 
                <FileList defaultExpand={true}/>
          </div>
          <div className="editor-2">
            <div className="mobilecontent">
            <PlusCircleTwoTone  onClick={() => {
            var currentValue = document.getElementById("f2").style.display;
                if(currentValue == 'flex') {
                  document.getElementById("f2").style.display = "none";
                }else{
                  document.getElementById("f2").style.display = "flex";
                }
            }} /> 
            <div id="f2" >
                <FileList defaultExpand={false}/>
            </div>
            </div>

            
            <Editor content={content} title={title}/>           
            {/* <RichEditor/> */}
          </div>
        </div>        
                                                                                                                                                                                                                                                                                                                                                                                                                                              
        
      
      </Flex>
  </Theme>
  );
}
