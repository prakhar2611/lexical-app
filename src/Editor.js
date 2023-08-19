
import {$getRoot,$createTextNode,   $createParagraphNode,$getSelection,$createQuoteNode} from 'lexical';
import {useEffect,useState} from 'react';
import './styles.css';
// import {$createTextNode} from 'document';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND ,ListNode,ListItemNode} from '@lexical/list';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import { $createHeadingNode} from '@lexical/rich-text';
import { $setBlocksType_experimental } from '@lexical/selection';
import { $isRangeSelection, type TextFormatType } from 'lexical';
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { Button, Form, Input, Radio,Layout,message,Switch,Progress,Badge,Avatar,Statistic} from 'antd';
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import {
  $createCodeNode,
  $isCodeNode,
  getDefaultCodeLanguage,
  getCodeLanguages
} from "@lexical/code";

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

// Lexical React plugins are React components, which makes them
// highly composable. Furthermore, you can lazy load plugins if
// desired, so you don't pay the cost for plugins until you
// // actually use them.
function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Focus the editor when the effect fires!
    editor.focus();
  }, [editor]);

  return null;
}

function HeadingToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  // const headingTags = ['h1', 'h2', 'h3'];
  
  const onClick = () => {
    editor.update(() => {
      const root = $getRoot();
      console.log('rooot',root)
      root.append($createHeadingNode('h1').append($createTextNode('BIG HEADING MF')))
    });

  };
  return <Button onClick={onClick}>ADD HEADING</Button>
}



function MediumHeadingToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const headingTags = ['h1', 'h2', 'h3'];
  
  const onClick = () => {
    editor.update(() => {
      const root = $getRoot();
      console.log('rooot',root)
      root.append($createHeadingNode('h2').append($createTextNode('SMALLER HEADING BITCH')))
    });

  };
  return <Button onClick={onClick}>ADD ANOTHER</Button>
}


function QuoteToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  
  const onClick = () => {
    editor.update(() => {
      const root = $getRoot();
      console.log('rooot',root)
      root.append($createQuoteNode.append($createTextNode('Small Para')))
    });

  };
  return <Button onClick={onClick}>ADD QOTEAR</Button>
}


function CodeToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
 
  const onClick = () => {
    editor.update(() => {
      const root = $getRoot();
      console.log('rooot',root)
      root.append($createCodeNode().append($createTextNode('import code from Head')))
    });

  };
  return <Button onClick={onClick}>ADD MAGIX</Button>
}
// function CodeToolbarPlugin() {
//   const [editor] = useLexicalComposerContext();
 
//   const onClick = () => {
//     editor.update(() => {
//       const root = $getRoot();
//       console.log('rooot',root)
//       root.append($createCodeNode().append($createTextNode('python')))
//     });

//   };
//   return <Button onClick={onClick}>ADD MAGIX</Button>
// }

// export default function ToolbarPlugin() {
//   const [editor] = useLexicalComposerContext();
//   const toolbarRef = useRef(null);
//   const [canUndo, setCanUndo] = useState(false);
//   const [canRedo, setCanRedo] = useState(false);
//   const [blockType, setBlockType] = useState("paragraph");
//   const [selectedElementKey, setSelectedElementKey] = useState(null);
//   const [showBlockOptionsDropDown, setShowBlockOptionsDropDown] = useState(
//     false
//   );
//   }
// function SimpleListPlugin() {
//   const [editor] = useLexicalComposerContext();
//   const blockType='a='
//   // const headingTags  ['h1', 'h2', 'h3'];
//   const formatNumberedList = () => {
//     if (blockType !== "ol") {
//       editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND);
//     } else {
//       editor.dispatchCommand(REMOVE_LIST_COMMAND);
//     }
//     // setShowBlockOptionsDropDown(false);
//   };

//   // const onClick = () => {
//   //   editor.update(() => {
//   //     const root = $getRoot();
//   //     console.log('rooot',root)
//   //     root.append($createHeadingNode('h2').append($createTextNode('SMALLER HEADING BITCH')))
//   //   });

//   return <Button onClick={formatNumberedList}>ADD BLACKS</Button>
//   };




// function HeadingToolbarPlugin() {
//   const [editor] = useLexicalComposerContext();

//   const onClick = () => {
//     editor.update(() => {
//       const root = $getRoot();
//       root.append($createHeadingNode('h1').append($createTextNode('hi')));
//     });
//   };

//   return React.createElement(
//     Button,
//     {
//       onClick: onClick
//     },
//     'Click'
//   );
// }















  // const onClick = (tag) => {
  //   editor.update(() => {
  //     const selection = $getSelection();
  //     if ($isRangeSelection(selection)) {
  //       $setBlocksType_experimental(selection, () => $createHeadingNode(tag));
  //     }
  //   });
  // };}

export function AutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.focus(() => {
      // If we try and move selection to the same point with setBaseAndExtent, it won't
      // trigger a re-focus on the element. So in the case this occurs, we'll need to correct it.
      // Normally this is fine, Selection API !== Focus API, but fore the intents of the naming
      // of this plugin, which should preserve focus too.
      const activeElement = document.activeElement;
      const rootElement = editor.getRootElement();
      if (
        rootElement !== null ||
        activeElement === null ||
        !rootElement.contains(activeElement)
      ) {
        // Note: preventScroll won't work in Webkit.
        rootElement.focus({ preventScroll: true });
      }
    });
  }, [editor]);

  return null;
}
// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error) {
  console.error(error);
}


export function Editor(props) {

  

  const loadContent = () => {
    // 'empty' editor
    const value = '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"some default","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"text for the ","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"rich text editor","type":"text","version":1},{"type":"linebreak","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}';
  
    return value;
  }
  
  const [editorState, setEditorState] = useState();


  //onchange fucntion
  function onChange(editorState) {
    const editorStateJSON = editorState.toJSON();
    setEditorState(JSON.stringify(editorStateJSON));
  }

  //loding initial state
  const initialEditorState = loadContent();

  //loading initial config
  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError,
    nodes:[HeadingNode,ListNode,ListItemNode,CodeNode,QuoteNode],
    editorState :initialEditorState
  };

  //console.log(editorState)

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div style={{'display':'flex','flexDirection':'column','padding':'1rem','justifyContent':'space-between'}}>
        <div className="mytoolbar" style={{'display':'flex','flexDirection':'row','padding':'1rem','justifyContent':'left','gap':10}}>
          <HeadingToolbarPlugin/>
          <MediumHeadingToolbarPlugin/>
          <CodeToolbarPlugin/>
          <QuoteToolbarPlugin/>
          {/* <SimpleListPlugin/> */}
          {/* <ToolbarPlugin /> */}
        </div>
        <RichTextPlugin
      contentEditable={<ContentEditable className="contentEditable"/>}
      placeholder={<div>Enter some text...</div>}
      ErrorBoundary={LexicalErrorBoundary}
        />
       </div>
      {/* <AutoFocusPlugin /> */}
      {/* <HistoryPlugin /> */}
      {/* <MyCustomAutoFocusPlugin /> */}
      <OnChangePlugin onChange={onChange}/>
      {/* <Button label="Save" onChange={() => {
    if (editorStateRef.current) {
      console.log(JSON.stringify(editorStateRef.current))
    }
  }} /> */}
    </LexicalComposer>
  );
}