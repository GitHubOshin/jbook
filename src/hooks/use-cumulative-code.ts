import { useTypedSelector } from './use-typed-selector'

export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    const { data, order } = state.cells
    const orderedCells = order.map((id: any) => data[id])

    const showFunc = `
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

    for (let c of orderedCells) {
      if (c.type === 'code') {
        if (c.id === cellId) {
          cumulativeCode.push(showFunc)
        } else {
          cumulativeCode.push(showFuncNoop)
        }
        cumulativeCode.push(c.content)
      }
      if (c.id === cellId) {
        break
      }
      return cumulativeCode
    }
  })?.join('\n')
}
