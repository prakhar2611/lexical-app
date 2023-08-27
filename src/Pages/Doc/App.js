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
import { getdocs } from "../../apis/DocsApi";
import { EditTwoTone } from "@ant-design/icons";

// import { LexicalEditor } from "./Editor/Editor";
  
export function AppTest() {

  // const content = useSelector((state) => state.content.value);
  const content = useSelector((state) => state.page.value['content']);
  const title = useSelector((state)=>state.page.value['title']);
  const dispatch = useDispatch()

 
  return (
    <Theme accentColor="blue" grayColor="sand" radius="large" scaling="95%">

  <Flex className="mainflex">  
    <div className="topNavBar">
      
    </div>                  
    <div className="content">
      <Card className="sideBar">
           <FileList/>
      </Card>
      <div className="editor">
        <div className="editor-1">
          <Card style={{'width' :'25rem' ,'display':'flex','flexGrow' : '1'}}>
            <Flex direction={"column"}>
              <Heading size={"7"}>Big title osdsdf the file name </Heading>
              <Separator.Root className="SeparatorRoot" style={{ margin: '5px 0px' }} />
              <Flex style={{'justifyContent' :'flex-start' ,'gap': '1rem','alignItems':'baseline'}}>            
                <Heading size={"2"}>Folder</Heading> 
                <Text size={"2"}>Some Folder name</Text>
              </Flex>
            </Flex>
            </Card>

            <Card >
            
             <Button> <EditTwoTone/>Edit</Button>
            
            </Card>
          
          </div>
          <div className="editor-2">
          <Card className="editarea">
            <Editor/>           
           </Card>
          </div>
      </div>
    </div>        
                                                                                                                                                                                                                                                                                                                                                                                                                                          
    
  
  </Flex>
    </Theme>
  );
}
