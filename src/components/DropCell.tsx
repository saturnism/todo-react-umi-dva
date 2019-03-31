import React from 'react'
import {
  ConnectDropTarget, DropTarget, DropTargetConnector, DropTargetMonitor,
} from 'react-dnd';

interface DropProps {
  name: string
  canDrop: boolean
  isOver: boolean
  connectDropTarget: ConnectDropTarget
}

interface DropState {
}



class DropCell extends React.Component<DropProps, DropState> {
  render(): JSX.Element {
    const { canDrop, isOver, connectDropTarget } = this.props;
    const isActive = canDrop && isOver
    return (
      <div ref={connectDropTarget} style={{ height: '100%', width: '100%'}}>
        {isActive ? 'Release to drop' : 'Drag a box here'}
        {this.props.children}
      </div>
    )
  }
}

export default DropTarget (
  "DragTag",
  {
    drop: (props : DropProps) => ({ name: props.name }),
  },
  (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }),
)(DropCell)
