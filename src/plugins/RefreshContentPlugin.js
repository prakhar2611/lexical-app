import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { TreeView } from "@lexical/react/LexicalTreeView";
import { CLEAR_HISTORY_COMMAND } from "lexical"
import {useEffect,useState} from 'react';



export default function RefreshContentPlugin({newState}) {
    // const [newState]  = seSelector((state) => state.content.value);
    console.log("newstate = ",newState)
    const [editor] = useLexicalComposerContext()
    useEffect(() => {
      if (editor && newState) {
        const curr = editor.parseEditorState(newState)
        console.log("Current state = ",curr)
        editor.setEditorState(curr)
        editor.dispatchCommand(CLEAR_HISTORY_COMMAND, undefined)
      }
    },[newState])  //this react ook was the reason i spent 2 fucking days understanding how to update the content of the lexical editor and 
                    // vallah ! boys played well ! 
}
