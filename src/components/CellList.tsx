import { useTypedSelector } from '../hooks/use-typed-selector'
import CellListItem from './CellListItem'
import AddCell from './AddCell'
import { Fragment } from 'react'

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  )
  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <AddCell forceVisible={false} nextCellId={cell.id} />
      <CellListItem cell={cell} />
    </Fragment>
  ))

  return (
    <div>
      {renderedCells}
      <AddCell forceVisible={cells.length === 0} nextCellId={null} />
    </div>
  )
}

export default CellList