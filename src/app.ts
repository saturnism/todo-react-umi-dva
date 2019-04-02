import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import * as React from 'react';

export function rootContainer(container) {
  return React.createElement(DragDropContextProvider, { backend: HTML5Backend }, container);
}


export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
  },
};
