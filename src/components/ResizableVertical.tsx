import { ResizableBox } from 'react-resizable'
import './resizable.css'

interface ResizableProps {
  children?: React.ReactNode
}

const ResizableVertical: React.FC<ResizableProps> = ({ children }) => {
  return (
    <ResizableBox
      className="resizable-vertical"
      minConstraints={[window.innerWidth * 0.2, Infinity]}
      maxConstraints={[window.innerHeight * 0.75, Infinity]}
      height={Infinity}
      width={window.innerWidth * 0.75}
      resizeHandles={['e']} // vertical
    >
      {children}
    </ResizableBox>
  )
}

export default ResizableVertical
