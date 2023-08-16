import {$getRoot, $getSelection} from 'lexical';
import {useEffect,useState} from 'react';

import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';

import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { Button, Form, Input, Radio,Layout,message,Switch,Progress,Badge,Avatar,Statistic} from 'antd';

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


export function Editor() {

  

  const loadContent = () => {
    // 'empty' editor
    const value = '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sdfdsf","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"dfdfd","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"dasds","type":"text","version":1},{"type":"linebreak","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}';
  
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
    editorState :initialEditorState
  };

  //console.log(editorState)

  return (
    <LexicalComposer initialConfig={initialConfig}>
     <RichTextPlugin
  contentEditable={<ContentEditable />}
  placeholder={<div>Enter some text...</div>}
  ErrorBoundary={LexicalErrorBoundary}
    />
      <HistoryPlugin />
      <MyCustomAutoFocusPlugin />
      <OnChangePlugin onChange={onChange}/>
      {/* <Button label="Save" onChange={() => {
    if (editorStateRef.current) {
      console.log(JSON.stringify(editorStateRef.current))
    }
  }} /> */}
    </LexicalComposer>
  );
}