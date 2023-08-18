import {$getRoot, $getSelection} from 'lexical';
import {useEffect,useState} from 'react';

import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {LexicalEditorRefPlugin} from '@lexical/react/LexicalEditorRefPlugin';

import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { useSelector, useDispatch } from 'react-redux'
import { setcontent } from './Utils/Reducers/contentSlice';

import { Button, Form, Input, Radio,Layout,message,Switch,Progress,Badge,Avatar,Statistic} from 'antd';
import RefreshContentPlugin from './plugins/RefreshContentPlugin';
import { saveFile } from './FileList';

const theme = {
  // Theme styling goes here
  
}

// Lexical React plugins are React components, which makes them
// highly composable. Furthermore, you can lazy load plugins if
// desired, so you don't pay the cost for plugins until you
// actually use them.
function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Focus the editor when the effect fires!
    editor.focus();
  }, [editor]);

  return null;
}

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error) {
  console.error(error);
}

// export function setEditorContent () {
//   const [editor] = useLexicalComposerContext()
//   useEffect(()=>{
//     editor.setEditorState(info.node.meta);
//   },[])
// }


export function Editor({content,title}) {

  

  // const loadContent = () => {
  //   // 'empty' editor
  //   const value = '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sdfdsf","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"dfdfd","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"dasds","type":"text","version":1},{"type":"linebreak","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}';
  
  //   return value;
  // }
  const dispatch = useDispatch()  
  // const [editorState, setEditorState] = useState();
  const [saveContent, setsaveContent] = useState();
  const [ref, setref] = useState(0);
  const [currtitle,setcurrTitle] =useState('')

 

  //onchange fucntion
  function onChange(editorState) {
    const editorStateJSON = editorState.toJSON();
    setsaveContent(JSON.stringify(editorStateJSON));
  }


   //save fucntion
   function onSave() {
    console.log("save content =====> ",  saveContent)
    saveFile(saveContent,currtitle)
  }


  //loding initial state
  // const initialEditorState = loadContent();

  //loading initial config
  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError,
    editorState :content
  };

  //console.log(editorState)

  return (
    <LexicalComposer initialConfig={initialConfig}>

<Input value={currtitle} disabled={false} onChange={(e)=>setcurrTitle(e.target.value)} placeholder="input placeholder" />
      <Button label="Save" onClick={onSave} > Save </Button>
     <RichTextPlugin
  contentEditable={<ContentEditable />}
  placeholder={<div>Enter some text...</div>}
  ErrorBoundary={LexicalErrorBoundary}
    />
      <HistoryPlugin />
      <MyCustomAutoFocusPlugin updatecontent = {content}/>
      <OnChangePlugin onChange={onChange}/>
      {/* <LexicalEditorRefPlugin editorRef={ref} /> */}
      <RefreshContentPlugin newState={content} />
     
    </LexicalComposer>
  );
}