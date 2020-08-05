import React, { Component } from 'react';

import './Node.css';

export default class Node extends Component {
  render() {
    const {
      col,
      isFinish,
      isStart,
      isVisited,
      row,
      // distance,
      onMouseDown,
      // onMouseEnter,
      // onMouseUp,
    } = this.props;
    const extraClassName = isFinish
      ? 'finish-node'
      : isStart
        ? 'start-node'
        : isVisited ? 'visited-node' :
          '';

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
      >
      </ div>
    );
  }
}