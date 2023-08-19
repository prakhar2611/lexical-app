// import ExampleTheme from "./themes/ExampleTheme";
import LexicalComposer from "@lexical/react/LexicalComposer";
import RichTextPlugin from "@lexical/react/LexicalRichTextPlugin";
// import ContentEditable from "@lexical/react/LexicalContentEditable";
// import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
// import ToolbarPlugin from "./plugins/ToolbarPlugin";
// import { HeadingNode, QuoteNode } from "@lexical/rich-text";
// import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
// import { ListItemNode, ListNode } from "@lexical/list";
// import { CodeHighlightNode, CodeNode } from "@lexical/code";
// import { AutoLinkNode, LinkNode } from "@lexical/link";
// import LinkPlugin from "@lexical/react/LexicalLinkPlugin";
// import ListPlugin from "@lexical/react/LexicalListPlugin";
// import LexicalMarkdownShortcutPlugin from "@lexical/react/LexicalMarkdownShortcutPlugin";
// import { TRANSFORMERS } from "@lexical/markdown";

// import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
// import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
// import AutoLinkPlugin from "./plugins/AutoLinkPlugin";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

//   const editorConfig = {
//     // The editor theme
//     // theme: ExampleTheme,
//     // Handling of errors during update
//     onError(error) {
//       throw error;
//     },
//     // Any custom nodes go here
//     nodes: [
//       HeadingNode,
//       ListNode,
//       ListItemNode,
//       QuoteNode,
//       CodeNode,
//       CodeHighlightNode,
//       TableNode,
//       TableCellNode,
//       TableRowNode,
//       AutoLinkNode,
//       LinkNode
//     ]
//   };
  
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
  
  export default function Editor(props) {
    return (
      <LexicalComposer
    //    initialConfig={editorConfig}
       >
        <div className="editor-container">
          {/* <ToolbarPlugin /> */}
          <div className="editor-inner">
            <RichTextPlugin
             
            />
            <HistoryPlugin /> 
            {props.autoFocus && <AutoFocusPlugin />}
            <CodeHighlightPlugin />
            // <ListPlugin />
            <LinkPlugin />
            <AutoLinkPlugin />
            <ListMaxIndentLevelPlugin maxDepth={7} />
            <LexicalMarkdownShortcutPlugin transformers={TRANSFORMERS} />
          </div>
        </div>
      </LexicalComposer>
    );
  }
  