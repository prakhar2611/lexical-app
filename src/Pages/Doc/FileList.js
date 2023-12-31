
import React from 'react';
import "./App.css"; 

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


export function FileList ({defaultExpand}) {
  
  const directory = useSelector((state) => state.directory.value.tree)
  const currFolder = useSelector((state) => state.page.value["folder"])
  // const folderList = useSelector((state)=>state.directory.value.folderList);

  //const[c,setc] = useState(content_meta)
  console.log("directory : ", JSON.stringify(directory))
  // console.log("Folder List : ",  folderList)


  const dispatch = useDispatch()

  const onSelect = (selectedKeys, info) => {
    const value =''
    console.log('selected', selectedKeys,     info.node);
    dispatch(setCurrFolder(info.node.folder))

    if(info.node.isLeaf) {
      getdocmeta(info.node.title,info.node.folder).then(res => {
        console.log(res)
        dispatch(setCurrPage(res))
      }).catch(error => console.error(error))
    }else{
      onExpand(selectedKeys,info)
    }
  };

  function onExpand (keys, info){
    dispatch(setCurrFolder(info.node.title))
  };


  
    useEffect(() => {
      getdocs().then(res => {
       dispatch(updatedirectory(res)) 
      }).catch(error => console.error(error))
    }, [1]);    
   

  return (
    // <Card>  
  //     {/* <Tree
      
    
  //   switcherIcon={<DownOutlined />}
  //   defaultExpandedKeys={['0-0-0']}
  //   onSelect={onSelect}
  //   treeData={data}
  // />   */}

<DirectoryTree className='filelist' 
      multiple
      switcherIcon={<DownOutlined />}
      defaultExpandAll={defaultExpand}
      onSelect={onSelect}
      // onExpand={onExpand}
      treeData={directory}
    />
  // {/* <Editor content={c}/>  */}
  //   {/* </Card> */}
    
  );
};




