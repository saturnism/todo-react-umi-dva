/**
 * title: Counter
 */

import React, { PureComponent } from 'react';
import { Button, Layout, Calendar, Timeline, Tag, Popover, Row } from 'antd';
import { Moment } from 'moment';
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import DragTag from '@/components/DragTag';
import DropCell from '@/components/DropCell';
import { arrayMove, SortableContainer, SortableElement, SortEvent } from 'react-sortable-hoc';

class ViewProps {
}

class ViewStates {
  items: string[]
}

const SortableItem = SortableElement(({value}) => <Timeline.Item>{value}</Timeline.Item>)

const SortableList = SortableContainer(({items}) => {
  return (
    <Timeline>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </Timeline>
  );
});


class Counter extends PureComponent<ViewProps, ViewStates> {
  state = {
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']
  };


  onSortEnd = ({oldIndex, newIndex}, e : SortEvent) => {
    this.setState(({items}) => ({
      items: arrayMove(items, oldIndex, newIndex),
    }));
  };

  render() {
    return (
      <>
        <div style={{ width: 100 }}>
          <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />
        </div>

      <DragDropContextProvider backend={HTML5Backend}>
        <Row>
          <DragTag>One</DragTag>
          <DragTag>Two</DragTag>
        </Row>
        <Row>
          <Calendar dateCellRender={this.renderDateCell} ></Calendar>
        </Row>
      </DragDropContextProvider>
        </>
    );
  }

  private renderDateCell(value : Moment) {
    return (
      <DropCell name={value.format('YYYY-MM-DD')} >
          <Popover title="Detail" content={(
            <Timeline mode={'alternate'}>
              <Timeline.Item color="green">Pick up at hotel</Timeline.Item>
              <Timeline.Item>Drive to Forbidden City</Timeline.Item>
              <Timeline.Item>Guided tour</Timeline.Item>
              <Timeline.Item color="red">Drop off at hotel</Timeline.Item>
            </Timeline>
          )}>

          <Tag color="cyan">Activity 2</Tag>
          </Popover>

      </DropCell>
    )
    /*
    if (value.date() == 1) {
      return (
        <div>
          <Popover title="Detail" content={(
            <Timeline mode={'alternate'}>
              <Timeline.Item color="green">Pick up at hotel</Timeline.Item>
              <Timeline.Item>Drive to Forbidden City</Timeline.Item>
              <Timeline.Item>Guided tour</Timeline.Item>
              <Timeline.Item color="red">Drop off at hotel</Timeline.Item>
            </Timeline>
          )}>

          <Tag color="cyan">Activity 2</Tag>
          </Popover>
                    <Popover title="Detail" content={(
            <Timeline>
              <Timeline.Item color="green">Pick up at hotel</Timeline.Item>
              <Timeline.Item>Drop off at hotel</Timeline.Item>
            </Timeline>
          )}>
            <Tag color="blue">Activity 1</Tag>
          </Popover>
        </div>
      )
    }

     */
  }
}

export default Counter;
