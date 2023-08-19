// import { useEffect } from 'react'
// import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
// import { useEditors } from './EditorProvider'

// export const MultipleEditorStorePluginProps = {
//   id: string
// }

// export function MultipleEditorStorePlugin( MultipleEditorStorePluginProps) {
//   const { id } = props
//   const [editor] = useLexicalComposerContext()
//   const editors = useEditors()
//   useEffect(() => {
//     editors.createEditor(id, editor)
//     return () => editors.deleteEditor(id)
//   }, [id, editor]) 
//   return null
// }