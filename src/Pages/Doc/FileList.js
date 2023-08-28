
import React from 'react';
import { useState , useEffect} from 'react';
import axios from 'axios';
import { ConsoleSqlOutlined, DownOutlined } from '@ant-design/icons';
import { Tree } from 'antd';
import Enumerable from 'linq';
import { useSelector, useDispatch } from 'react-redux'
import { setcontent } from '../../Utils/Reducers/contentSlice';
import {Editor} from "./Editor";
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import { setCurrFolder, setCurrPage } from '../../Utils/Reducers/pageSlice';
import { Card } from '@radix-ui/themes';
import { getdocs,getdocmeta } from '../../apis/DocsApi';
import { updatedirectory } from '../../Utils/Reducers/directorySlice';

// import { useConfig } from './Utils/CustomConfigHook';
// import  configData from './config.json' 

const { DirectoryTree } = Tree;


// import { EditorProvider } from './Editor/EditorProvider'
const serverurl = process.env.REACT_APP_TEST_SERVER_URL


export function FileList () {
  
  const directory = useSelector((state) => state.directory.value)
  const currFolder = useSelector((state) => state.page.value["folder"])
  //const[c,setc] = useState(content_meta)
  console.log("directory : ", JSON.stringify(directory))
  const dispatch = useDispatch()

  const onSelect = (selectedKeys, info) => {
    const value =''
    console.log('selected', selectedKeys,     info.node);
    // const initialEditorState = editor.parseEditorState(value)
    // editor.setEditorState(info.node.meta)
    // getdocmeta()
    if(info.node.isLeaf) {
      getdocmeta(info.node.title,currFolder).then(res => {
        console.log(res)
        dispatch(setCurrPage(res))
        //dispatch(setcontent(res.MetaData))
      }).catch(error => console.error(error))
    }else{
      onExpand(selectedKeys,info)
    }
   
    
    //setc(info.node.meta)
    // Enumerable.from(data).where((x)=> {return selectedKeys[0]==x.})
  };

  function onExpand (keys, info){
    dispatch(setCurrFolder(info.node))
  };


  
    useEffect(() => {
      getdocs().then(res => {
       dispatch(updatedirectory(res)) 
      }).catch(error => console.error(error))
    }, []);    
   

  return (
    // <Card>  
  //     {/* <Tree
      
    
  //   switcherIcon={<DownOutlined />}
  //   defaultExpandedKeys={['0-0-0']}
  //   onSelect={onSelect}
  //   treeData={data}
  // />   */}

<DirectoryTree style={{'display' : 'flex','width' : '15rem'}}
      multiple
      switcherIcon={<DownOutlined />}
      defaultExpandAll={true}
      onSelect={onSelect}
      onExpand={onExpand}
      treeData={directory}
    />
  // {/* <Editor content={c}/>  */}
  //   {/* </Card> */}
    
  );
};




