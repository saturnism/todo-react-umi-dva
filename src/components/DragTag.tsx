import React from 'react'
import {
  DragSource,
  DragSourceMonitor,
  ConnectDragSource,
  DragSourceConnector,
} from 'react-dnd'
import { Tag } from 'antd';
import { TagProps } from 'antd/lib/tag';
import { Ref } from 'semantic-ui-react'

interface DragTagProps extends TagProps {
  isDragging: boolean
  connectDragSource: ConnectDragSource
}

interface DragTagState {
}

class DragTag extends React.Component<DragTagProps, DragTagState> {
  render() {
    const { isDragging, connectDragSource } = this.props;
    const tagProps = {...this.props}
    delete tagProps.isDragging
    delete tagProps.connectDragSource
    const opacity = isDragging ? 0.4 : 1;
    return (
      <Ref innerRef={connectDragSource}>
        <Tag {...tagProps as TagProps} />
      </Ref>
    )
  }
}

export default DragSource(
  "DragTag",
  {
    beginDrag: (props: DragTagProps) => ({ title: props.children.toString() }),
    endDrag(props: DragTagProps, monitor: DragSourceMonitor) {
      const item = monitor.getItem();
      const dropResult = monitor.getDropResult();

      if (dropResult) {
        alert(`You dropped ${item.title} into ${dropResult.name}!`)
      }
    },
  },
  (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }),
)(DragTag);
