import './code-cell.css'
import { useEffect } from 'react'
import CodeEditor from './code-editor'
import Preview from './Preview'
import Resizable from './Resizable'
import ResizableVertical from './ResizableVertical'
import { Cell } from '../state/cell'
import { useActions } from '../hooks/use-actions'
import { useTypedSelector } from '../hooks/use-typed-selector'
import { useCumulativeCode } from '../hooks/use-cumulative-code'

interface CellCellProps {
  cell: Cell
}
const CodeCell: React.FC<CellCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions()
  const bundle = useTypedSelector((state) => state.bundles[cell.id])
  const cumulativeCode = useCumulativeCode(cell.id)

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode || '')
      return
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode || '')
    }, 750) // cell.id, cell.content

    return () => {
      clearTimeout(timer)
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode, cell.id, createBundle])

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
        <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading...
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} error={bundle.error} />
          )}
        </div>
      </div>
    </Resizable>
  )
}

export default CodeCell
