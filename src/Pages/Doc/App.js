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
import { EditTwoTone, PlusCircleTwoTone, UserOutlined } from "@ant-design/icons";
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
  const iseditable = useSelector((state) =>state.editor.value.editable)
  const onselectedit =  useSelector((state) =>state.editor.value.onselectEditable)

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
  function makeEditable() {
    dispatch(seteditable(true))
        setcurrTitle(title)     
  }

  function makeUneditable() {
         dispatch(seteditable(false))
         dispatch(setonselectEditable(false))
  }

  function setCurrentTitle(value) {
    setcurrTitle(value)
    if(value != title){
      setsavelabel("Save As")
    }else{
      setsavelabel("Save")
    }
  }

  function setCreateTemplate() {
    dispatch(setNewPage())
    makeEditable()
  }

  function makeFolderEdit(value) {
    dispatch(setonselectEditable(value))
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

     //save it to db function
  function onSave() {
      console.log("save content =====> ",  saveContent)
      //dispatch(setCurrFolder(currfoldername))
      saveFile(saveContent,currtitle,currfoldername)
      getdocs().then(res => {
        dispatch(updatedirectory(res)) 
       }).catch(error => console.error(error))
      setonselectedit(false)
      setiseditable(false)  
    }


  useEffect(()=>{
    getuserDetails().then((res) => { setuserimage(res.picture)}).catch(error => console.error(error))
    },[1])

  return (
  <Theme accentColor="orange" grayColor="sand" radius="large" scaling="95%">
      <Flex className="mainflex">  

        <div className="topNavBar">
          <Flex gap={"3"}>
            <Heading size={"7"}>KNOTS</Heading>
            <Avatar size={40} icon={<img src="./knots.jpg"></img>} />
          </Flex>
          <Flex gap={"3"} style={{'alignItems' : 'center'}}>
            <Heading size={"5"}>{title}</Heading>
              <Text size={"2"}>{folder}</Text>
           </Flex>
          <Avatar size={40} icon={<img src={userimage}></img>} />
        </div>          

        <Flex className="content">
          <Flex className="sideBar">
          { (!iseditable)&&<PlusCircleTwoTone onClick={setCreateTemplate} /> }
            <FileList/>
          </Flex>
          
          <Flex className="editor">
            {/* <div className="editor-1">
              <Card style={{'width' :'25rem' ,'display':'flex','flexGrow' : '6'}}>
                <Flex direction={"column"} >
                  {(!iseditable)&&<Heading size={"5"}>{title}</Heading>}
                  {(iseditable)&&<Input style={{'width':'50rem'}} value={currtitle} disabled={false} onChange={(e)=>setCurrentTitle(e.target.value)} placeholder={plchldr} />}

                  <Separator.Root className="SeparatorRoot" style={{ margin: '5px 0px' }} />
                  <Flex style={{'justifyContent' :'flex-start' ,'gap': '1rem','alignItems':'baseline'}}>            
                    <Heading size={"2"}>Folder</Heading> 
                    {(!onselectedit) &&<Select disabled = {!iseditable} value={folder} options={folderList} onSelect={(x) => {setinputFolder(x)}} ></Select>}
                    {(onselectedit)  &&<Input style={{'width':'30rem'}} value={currfoldername} disabled={false} onChange={(e)=>setinputFolder(e.target.value)} placeholder={plchldr} />}
                    {(iseditable&&!onselectedit) &&< EditTwoTone label="edit" onClick={(x) => {makeFolderEdit(true)}} > </EditTwoTone> }
                    {(iseditable&&onselectedit)  &&< Cross1Icon label="edit" onClick={(x) => {makeFolderEdit(false)}} > </Cross1Icon> }
                  </Flex>
                </Flex>
              </Card>

              <Card  style={{'display':'flex','flexGrow' : '1'}}>
                {  (iseditable)&&<Button style={{'width':'10vw'}} label="cancel" onClick={(x)=>{makeUneditable()}} > Cancel </Button> }
                {  (!iseditable)&&< Button style={{'width':'10vw'}} label="edit" onClick={makeEditable} ><EditTwoTone/> Edit </Button> }
                {  (iseditable)&&<Button style={{'width':'10vw'}} label="Save" onClick={onSave} > {savelabel} </Button> }       
              </Card>

              
            </div> */}
              <div className="editor-2">
                <Editor content={content} title={title}/>           
                {/* <RichEditor/> */}
              </div>
          </Flex>
        </Flex>        
                                                                                                                                                                                                                                                                                                                                                                                                                                              
        
      
      </Flex>
  </Theme>
  );
}
