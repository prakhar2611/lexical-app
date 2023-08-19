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

  const dispatch = useDispatch()  
  // const [editorState, setEditorState] = useState();
  const [saveContent, setsaveContent] = useState();
  const [iseditable , setiseditable] =useState(false);
  const [ref, setref] = useState(0);
  const [currtitle,setcurrTitle] =useState('')

 
   //save it to db function
   function onSave() {
    console.log("save content =====> ",  saveContent)
    saveFile(saveContent,currtitle)
    }

    //listner to change
    function OnChangeLivePlugin({onChange}) {
      const [editor] = useLexicalComposerContext();
      const dispatch = useDispatch();
  
      useEffect(() => {
        return editor.registerUpdateListener((state) => {
          onChange(state);
        });
      }, [editor,onChange]);
    }

    //onchange function
    function onChange(state) {
      //use the above when the above state passed is actually the whole state struct to use
      // .to JSON() you need to go to editor state struct whoch has that fuction defined

      const editorStateJSON = state.editorState.toJSON();
      setsaveContent(JSON.stringify(editorStateJSON));
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

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <h2>{title}</h2>
      {/* {!iseditable&&<Button label="edit" onClick={setiseditable(true)} > Edit </Button>}
      {iseditable&&<Input disabled={false} onChange={(e)=>setcurrTitle(e.target.value)} placeholder="input placeholder" />}
      {iseditable&&<Button label="Save" onClick={onSave} > Save </Button>} */}

      {/* <Button label="edit" onClick={setiseditable(true)} > Edit </Button> */}
     <Input disabled={false} onChange={(e)=>setcurrTitle(e.target.value)} placeholder="input placeholder" />
     <Button label="Save" onClick={onSave} > Save </Button>
     <RichTextPlugin
      contentEditable={<ContentEditable />}
      placeholder={<div>Enter some text...</div>}
      ErrorBoundary={LexicalErrorBoundary}
    />
      <HistoryPlugin />
      {/* <MyCustomAutoFocusPlugin updatecontent = {content}/> */}
      {/* <OnChangePlugin onChange={onChange}/> */}
      {/* <LexicalEditorRefPlugin editorRef={ref} /> */}
      <RefreshContentPlugin newState={content} />
      <OnChangeLivePlugin onChange={onChange}/>
    </LexicalComposer>
  );
}