// import { createContext, useContext, useCallback, useMemo, useState } from 'react'
// import { LexicalEditor } from 'lexical'
// import * as React from 'react';
// // `Record` type with potentially `undefined` values

// type EditorMutations = {
//   createEditor: (id: string, editor: LexicalEditor) => void
//   deleteEditor: (id: string) => void
// }

// type PartialRecord<K extends keyof any, T> = {
//     [P in K]?: T;
//   };

// //   or 
// //   type PartialRecord<K extends keyof any, T> =  Partial<Record<K, T>>;


// type EditorMap = PartialRecord<string, LexicalEditor>

// type EditorContextValue = EditorMutations & {
//   editors: EditorMap
// }

// const EditorContext = createContext<EditorContextValue | null>(null)

// export const EditorProvider = (props: React.PropsWithChildren<{}>) => {
//   const [ editors, setEditors ] = useState<EditorMap>({})

//   const createEditor = useCallback((id: string, editor: LexicalEditor) => {
//     setEditors((editors) => {
//       if (editors[id]) return editors
//       return { ...editors, [id]: editor }
//     })
//   }, [])

//   const deleteEditor = useCallback((id: string) => {
//     setEditors((editors) => {
//       if (!editors[id]) return editors
//       const { [id]: _, ...rest } = editors
//       return rest
//     })
//   }, [])

//   const value = useMemo(() => {
//     return {
//       editors,
//       createEditor,
//       deleteEditor
//     }
//   }, [
//     editors,
//     createEditor,
//     deleteEditor
//   ])

//   return (
//     <EditorContext.Provider value={value}>
//       {props.children}
//     </EditorContext.Provider>
//   )
// }

// export const useEditors = (): EditorMutations => {
//   const context = useContext(EditorContext)
//   if (context === null) {
//     throw new Error(
//       `The \`useEditors\` hook must be used inside the <EditorProvider> component's context.`
//     )
//   }
//   const { createEditor, deleteEditor } = context
//   return { createEditor, deleteEditor }
// }

// export const useEditor = (id: string): LexicalEditor | null => {
//   const context = useContext(EditorContext)
//   if (context === null) {
//     throw new Error(
//       `The \`useEditor\` hook must be used inside the <EditorProvider> component's context.`
//     )
//   }
//   return context.editors[id] || null
// }