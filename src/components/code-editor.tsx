import './code-editor.css'
import MonacoEditor from '@monaco-editor/react'
import { OnChange as OnEditorChange } from '@monaco-editor/react'
import prettier from 'prettier'
import parser from 'prettier/parser-babel'
import { useRef } from 'react'

interface CodeEditorProps {
  initialValue: string
  onChange(value: string): void
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  // function handleEditorChange(value: any, e: any) {
  //   onChange(value)
  // }
  const editorRef = useRef<any>()

  const handleEditorChange: OnEditorChange = (value, e) => {
    onChange(value)
  }

  // const onFormatClick = () => {
  //   const unformatted = editorRef.current.getModel().getValue()
  //   const formatted = prettier.format(unformatted, {
  //     parser: 'babel',
  //     plugins: [parser],
  //     useTabs: false,
  //     semi: true,
  //     singleQuote: true
  //   })
  //   /**
  //    * 3 steps that we're gonna write out
  //    * - get current value from editor
  //    * - format that value
  //    * - set the formatted value back in the editor
  //    */
  //   editorRef.current.setValue(formatted)
  // }

  return (
    <div className="editor-wrapper">
      <button className="button button-format is-primary is-small">
        Format
      </button>
      <MonacoEditor
        onChange={handleEditorChange}
        theme="vs-dark"
        height="100%"
        language="javascript"
        value={initialValue}
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true
        }}
      />
    </div>
  )
}

export default CodeEditor
// const onEditorDidMount = (getValue: () => string, monacoEditor: any) => {
//   monacoEditor.onDidChangeModelContent(() => {
//     onChange(getValue())
//   })
// }
