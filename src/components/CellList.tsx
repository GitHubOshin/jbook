import './cell-list.css'
import { Fragment } from 'react'
import { useTypedSelector } from '../hooks/use-typed-selector'
import CellListItem from './CellListItem'
import AddCell from './AddCell'

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order = [], data = {} } = {} }) =>
    order.map((id) => data[id])
  )

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell forceVisible={false} previousCellId={cell.id} />
    </Fragment>
  ))

  return (
    <div className="cell-list">
      <AddCell forceVisible={cells.length === 0} previousCellId={null} />
      {renderedCells}
    </div>
  )
}

export default CellList
