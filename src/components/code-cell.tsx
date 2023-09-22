import 'bulmaswatch/superhero/bulmaswatch.min.css'
import { useState, useEffect } from 'react'
import CodeEditor from './code-editor'
import Preview from './Preview'
import bundle from '../bundler'
import Resizable from './Resizable'
import ResizableVertical from './ResizableVertical'
import { Cell } from '../state/cell'
import { useActions } from '../hooks/use-actions'

interface CellCellProps {
  cell: Cell
}
const CodeCell: React.FC<CellCellProps> = ({ cell }) => {
  const [error, setError] = useState('')
  const [code, setCode] = useState('')
  const { updateCell } = useActions()

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(cell.content)
      setCode(output.err)
    }, 750)

    return () => {
      clearTimeout(timer)
    }
  }, [cell.content])

  return (
    <Resizable>
      <div
        //(calc(100% - 10px))
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'row'
        }}
      >
        <ResizableVertical>
          <CodeEditor
            initialValue={cell.content}
            onChange={(eventValue) => updateCell(cell.id, eventValue)}
          />
        </ResizableVertical>
        <Preview code={code} error={error} />
      </div>
    </Resizable>
  )
}

export default CodeCell
