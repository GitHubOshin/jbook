import { useTypedSelector } from './use-typed-selector'

export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    const { data = {}, order = [] } = state.cells || {}
    const orderedCells = order.map((id) => data[id])

    const showFunc = /* javascript */ `
      import _React from 'react'
      import _ReactDOM from "react-dom"

      var show = (value) => {
        const root = document.querySelector('#root')
      
        if (typeof value === "object") {
          if (value.$$typeof && value.props) {
            _ReactDOM.render(value, document.querySelector('#root'))
          } else {
            root.querySelector("#root").innerHTML = JSON.stringify(value)
          }
        } else {
          root.querySelector("#root").innerHTML = value;
        }
      };
    `

    const showFuncNoop = 'var show = () => {}'
    const cumulativeCode = []

    for (const cell of orderedCells) {
      if (cell.type === 'code') {
        if (cell.id === cellId) {
          cumulativeCode.push(showFunc, cell.content)
          break
        } else {
          cumulativeCode.push(showFuncNoop, cell.content)
        }
        // cumulativeCode.push(cell.content)
      }
      // if (cell.id === cellId) {
      //   break
      // }
    }

    return cumulativeCode
  })?.join('\n')
}
