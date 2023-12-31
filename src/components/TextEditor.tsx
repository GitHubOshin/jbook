import { useEffect, useState, useRef } from 'react'
import './textEditor.css'
import MDEditor from '@uiw/react-md-editor'
import React from 'react'
import { useActions } from '../hooks/use-actions'
import { Cell } from '../state/cell'

interface TextEditorProps {
  cell: Cell
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [editing, setEditing] = useState(false)
  const { updateCell } = useActions()

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return
      }

      setEditing(false)
    }
    document.addEventListener('click', listener, { capture: true })

    return () => {
      document.removeEventListener('click', listener, { capture: true })
    }
  }, [])

  if (editing) {
    return (
      <div className="text-editor" ref={ref}>
        <MDEditor
          value={cell.content}
          onChange={(value) => updateCell(cell.id, value || '')}
        />
      </div>
    )
  }

  return (
    <div
      className="text-editor card"
      onClick={() => {
        setEditing(true)
      }}
    >
      <div className="card-content"></div>
      <MDEditor.Markdown source={cell.content || 'Click to edit'} />
    </div>
  )
}

export default TextEditor
