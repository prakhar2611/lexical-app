// import { LexicalComposer } from '@lexical/react/LexicalComposer'
// import { ContentEditable } from '@lexical/react/LexicalContentEditable'
// import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
// import { MultipleEditorStorePlugin } from './MultipleEditorStorePlugin'
// import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';

// import * as React from 'react';

// export type LexicalEditorProps = {
//   id: string
// }

// export function LexicalEditor(props: LexicalEditorProps) {
//   const { id } = props
//   const initialConfig = {
//     namespace: 'MyEditor',
//     onError(error: Error) {
//       console.log(error)
//     }
//   }
//   return (
//     <LexicalComposer initialConfig={initialConfig}>
//       <RichTextPlugin
//          contentEditable={<ContentEditable />}
//          placeholder={<div>Enter some text...</div>}
//          ErrorBoundary={LexicalErrorBoundary}

//          />
//       <MultipleEditorStorePlugin id={id} />
//     </LexicalComposer>
//   )
// }