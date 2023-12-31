// import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
import {$getRoot, $getSelection} from 'lexical';
import './styles.css';
import { $isRangeSelection, type TextFormatType } from 'lexical';
import { $setBlocksType } from '@lexical/selection';
import { $createHeadingNode} from '@lexical/rich-text';
import {
  $isParentElementRTL,
  $wrapLeafNodesInElements,
  $isAtNodeEnd
} from "@lexical/selection";

// import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND ,ListNode,ListItemNode} from '@lexical/list';

import {useEffect,useState} from 'react';

import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';

import { AutoLinkNode, LinkNode } from "@lexical/link";
import {LexicalEditorRefPlugin} from '@lexical/react/LexicalEditorRefPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { useSelector, useDispatch } from 'react-redux'
import { setcontent } from '../../Utils/Reducers/contentSlice';
import { Button, Card, Flex } from '@radix-ui/themes';
import {  Form, Input, Radio,Layout,message,Switch,Progress,Badge,Avatar,Statistic} from 'antd';
import RefreshContentPlugin from './plugins/RefreshContentPlugin';
import { saveFile } from './FileList';
import { ToolbarDemo } from './Toolbar';
import { ListItemNode, ListNode } from "@lexical/list"
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { setSave } from '../../Utils/Reducers/toSaveContentSlice';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { AutoLinkPlugin } from '@lexical/react/LexicalAutoLinkPlugin';
import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin';
import { TRANSFORMERS } from "@lexical/markdown";
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import TreeViewPlugin from './plugins/TreeViewPlugin';
import NewToolbarPlugin from './plugins/NewToolBar';

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
        $setBlocksType(selection,()=>$createHeadingNode('h2'))
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

// export function makeEditorEditable() {
//   const [editor] = useLexicalComposerContext();

//   useEffect(() => {
//     editor.setEditable(true)
//   }, [editor]);

//   return null;
// }


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
  //  function onSave() {
  //   console.log("save content =====> ",  saveContent)
  //   saveFile(saveContent,currtitle)
  //   }

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
      dispatch(setSave(JSON.stringify(editorStateJSON)))
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
    editable :false,
    nodes:[HeadingNode,],
    onError,
    editorState :content,
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode
    ]
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
           {/* <ToolbarPlugin/> */}
           <NewToolbarPlugin />
           <RichTextPlugin 
                  contentEditable={<ContentEditable className='contentEditable'
            />}
          placeholder={<div>Enter some text...</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
      <HistoryPlugin />
      <AutoFocusPlugin />
      <CodeHighlightPlugin />
      <ListPlugin />
      <LinkPlugin />
      {/* <TreeViewPlugin/> */}
      {/* <AutoLinkPlugin /> */}
      <ListMaxIndentLevelPlugin maxDepth={7} />
      {/* <MarkdownShortcutPlugin transformers={TRANSFORMERS} /> */}
      
      {/* this custom plugin is used to load data from the file list selection in case if I forgets */}
      <RefreshContentPlugin newState={content} />

      {/* this custom plugin is used to get the data from the editor and we can use it accordingly - like saving it to db  */}
      <OnChangeLivePlugin onChange={onChange}/>
    </LexicalComposer>
  );
}