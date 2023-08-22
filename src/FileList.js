import React from 'react';
import { useState , useEffect} from 'react';
import axios from 'axios';
import { DownOutlined } from '@ant-design/icons';
import { Tree } from 'antd';
import Enumerable from 'linq';
import { useSelector, useDispatch } from 'react-redux'
import { setcontent } from './Utils/Reducers/contentSlice';
import {Editor} from "./Editor";
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import { setCurrPage } from './Utils/Reducers/pageSlice';
// import { useConfig } from './Utils/CustomConfigHook';
// import  configData from './config.json' 


// import { EditorProvider } from './Editor/EditorProvider'
const serverurl = process.env.REACT_APP_SERVER_URL

export  function saveFile(payload,title) {
  const saveFileRequest = {
    "metaData" : payload,
    "title" : title
  }
  // const [cData] = useConfig()


  console.log("save file payload :", saveFileRequest)
  axios.post(serverurl+`docs/api/v1/save?new=true`,JSON.stringify(saveFileRequest),{
    headers: {           
        'Content-Type': 'application/json',
    },
  })
    .then(response => { if (response.status == 200 ){
                // return (response.data)
      }
    }).catch(error => console.error(error));
}


export function FileList () {


  const[data,setdata] = useState();
  const content_meta = useSelector((state) => state.content.value)
  const page_meta = useSelector((state) => state.page.value)

  //const[c,setc] = useState(content_meta)

  const dispatch = useDispatch()

  const onSelect = (selectedKeys, info) => {
    const value =''
    console.log('selected', selectedKeys,     info );
    // const initialEditorState = editor.parseEditorState(value)
    // editor.setEditorState(info.node.meta)
    dispatch(setCurrPage(info.node))
    dispatch(setcontent(info.node.meta))
    
    //setc(info.node.meta)
    // Enumerable.from(data).where((x)=> {return selectedKeys[0]==x.})
  };

  
function getlist() {
  console.log(serverurl)
   axios.get(serverurl+`docs/api/v1/listDocs`,{
            headers: {           
                'Content-Type': 'application/json',
            },        
        })
        .then(response => { if (response.status == 200 ){
          console.log(response.data)
          var list = []

          const c = response.data.Data.map(x => {
            var b ={
              title : x.Title,
              meta : x.MetaData
            }
            list.push(b)
          })

          console.log(list)
          const treeData = [
            {
              title: 'Stash',
              key: '0-0',
              children: list
            },
          ];
          setdata(treeData)          // return (response.data)
          }
          
      }).catch(error => console.error(error));
}

    useEffect(() => {
      getlist()
    }, []); 




  return (
    <div>  
      <Tree
    showLine
    switcherIcon={<DownOutlined />}
    defaultExpandedKeys={['0-0-0']}
    onSelect={onSelect}
    treeData={data}
  />  
  {/* <Editor content={c}/>  */}
    </div>
    
  );
};
