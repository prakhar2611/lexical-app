// import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
import {$getRoot, $getSelection} from 'lexical';
import './styles.css';
import { $isRangeSelection, type TextFormatType } from 'lexical';
import { $setBlocksType } from '@lexical/selection';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { $createHeadingNode} from '@lexical/rich-text';
import configData from "./config.json";

import {
  $isParentElementRTL,
  $wrapLeafNodesInElements,
  $isAtNodeEnd
} from "@lexical/selection";

// import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND ,ListNode,ListItemNode} from '@lexical/list';

import {useEffect,useState} from 'react';

import {LexicalComposer} from '@lexical/react/LexicalComposer';
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
  heading: {
    h1: 'glyf-editor-h1',
    h2: 'glyf-editor-h2',
    h3: 'glyf-editor-h3'
  },
  text: {
    bold: 'glyf-editor-bold',
    italic: 'glyf-editor-italic',
    underline: 'glyf-editor-underline',
    strikethrough: 'glyf-editor-strikethrough',
    underlineStrikethrough: 'glyf-editor-underlineStrikethrough'
  },
  banner: 'glyf-editor-banner'
};

function HeadingToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  // const headingTags = ['h1', 'h2', 'h3'];
  
  const onClick = () => {
    editor.update(() => {
      // const root = $getRoot();
      const selection= $getSelection();
      if ($isRangeSelection(selection)){
        $setBlocksType(selection,()=>$createHeadingNode('h1'))
      }
      console.log('rooot',root)
      // root.append($createHeadingNode('h1').append($createTextNode('BIG HEADING MF')))
    });

  };
  return <Button onClick={onClick}>BIG HEADING</Button>
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
  const [savelabel,setsavelabel] = useState("Save")
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
  //loding initial state
  // const initialEditorState = loadContent();



  //loading initial config
  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    nodes:[HeadingNode,],
    onError,
    editorState :content
  };
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

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div style={{'display':'flex','flexDirection':'column','padding':'1rem','justifyContent':'space-between', 'overflow':'hidden'}}>
        <div style={{'padding':'.2rem','border':'2px solid black','display':'flex','justifyContent':'space-around','flexDirection':'column','gap':'.2rem',}}> 
            {/* <Button style={{'padding':'.2rem','margin':'.5rem','backgroundColor':'rgba(170,180,220,.5)'}} label="Save" title="Hi">CREATE</Button>
            <Button style={{'padding':'.2rem','margin':'.5rem','backgroundColor':'rgba(170,180,220,.5)'}} label="Edit" title="OK">SAVE</Button> */}
          
          <div style={{'backgroundColor':'salmon','display':'flex','flexDirection':'row','padding':'1rem','justifyContent':'space-between','gap':20}}>
          { (!iseditable)&&<div style={{'width':'40vw','font-size':'18px'}} >{title}</div> }
          {  (iseditable)&&<Button style={{'width':'10vw'}} label="cancel" onClick={makeUneditable} > Cancel </Button> }
          { (!iseditable)&&< Button style={{'width':'10vw'}} label="edit" onClick={makeEditable}> Edit </Button> }
          {  (iseditable)&&<Button style={{'width':'10vw'}} label="Save" onClick={onSave} > {savelabel} </Button> }
            </div>
          {(iseditable)&&<Input value={currtitle} disabled={false} onChange={(e)=>setCurrentTitle(e.target.value)} placeholder={plchldr} />}
          </div>
        {/* <div>
          <h2>{title}</h2>
          <Input disabled={false} onChange={(e)=>setcurrTitle(e.target.value)} placeholder="input placeholder" />
          <Button label="Save" onClick={onSave} > Save </Button>
        </div> */}
        <div className="mytoolbar" style={{'display':'flex','flexDirection':'row','padding':'1rem','justifyContent':'left','gap':10}}>
          <HeadingToolbarPlugin/>
        </div>   
        
            <RichTextPlugin 
            style={{'overflow':'hidden'}}
              contentEditable={<ContentEditable 
                className='contentEditable'
                //  style={{'overflow':'scroll','height':'60vh'}} 
                 />}
              placeholder={<div>Enter some text...</div>}
              ErrorBoundary={LexicalErrorBoundary}
            />
            </div>
      <HistoryPlugin />
      {/* {!iseditable&&<Button label="edit" onClick={setiseditable(true)} > Edit </Button>}
      {iseditable&&<Input disabled={false} onChange={(e)=>setcurrTitle(e.target.value)} placeholder="input placeholder" />}
      {iseditable&&<Button label="Save" onClick={onSave} > Save </Button>} */}

      {/* <Button label="edit" onClick={setiseditable(true)} > Edit </Button> */}
      {/* <MyCustomAutoFocusPlugin updatecontent = {content}/> */}
      {/* <OnChangePlugin onChange={onChange}/> */}
      {/* <LexicalEditorRefPlugin editorRef={ref} /> */}
      <RefreshContentPlugin newState={content} />
      <OnChangeLivePlugin onChange={onChange}/>
    </LexicalComposer>
  );
}