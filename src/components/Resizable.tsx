import { ResizableBox } from 'react-resizable'
import './resizable.css'

interface ResizableProps {
  children?: React.ReactNode
}

const Resizable: React.FC<ResizableProps> = ({ children }) => {
  return (
    <ResizableBox
      className="resizable-horizontal"
      minConstraints={[Infinity, 24]}
      maxConstraints={[Infinity, window.innerHeight * 0.9]}
      height={300}
      width={Infinity}
      resizeHandles={['s']}
    >
      {children}
    </ResizableBox>
  )
}

export default Resizable
