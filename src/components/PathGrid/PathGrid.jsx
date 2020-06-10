
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Node from './Node/Node'
import './PathGrid.css';


const FIRST_NODE_ROW = 2;
const FIRST_NODE_COL = 3;
const LAST_NODE_ROW = 10;
const LAST_NODE_COL = 25;

export default class PathGrid extends Component {
    constructor() {
        super();
        this.state = {
          grid: [],
          onMousePressed: false,
        };
      }

     componentDidMount() {
        const grid = getStartGrid();
        this.setState({grid});
      } 

      render() {
        const {grid, onMousePressed} = this.state;
    
        return (
          <>
            <center>
            <button onClick={() => ({})}>
              Visualize
            </button>
            <div className="grid" style={{justifyContent: 'center', alignContent: 'center'}}>
              {grid.map((row, rowIdx) => {
                return (
                  <div key={rowIdx}>
                    {row.map((node, nodeIdx) => {
                      const {row, col, isFinish, isStart, isWall} = node;
                        return (
                            <Node
                                key={nodeIdx}
                                col={col}
                                isFinish={isFinish}
                                isStart={isStart}
                                isWall={isWall}
                                onMousePressed={onMousePressed}
                                onMouseDown={(row, col) => ({})
                                    // this.handleMouseDown(row, col)
                                }
                                onMouseEnter={(row, col) => ({})
                                  //  this.handleMouseEnter(row, col)
                                }
                                onMouseUp={() => ({}) 
                                   // this.handleMouseUp()
                                }
                                row={row}>
                                    
                                </Node>
                        );
                    })}
                  </div>
                );
              })}
            </div>
            </center>
          </>
        );

    }
}

const createNode = (col, row) => {
    return {
      col,
      row,
      isStart: row === FIRST_NODE_ROW && col === FIRST_NODE_COL,
      isFinish: row === LAST_NODE_ROW && col === LAST_NODE_COL,
    };
  }; 

const getStartGrid = () => {
    const grid = [];
    for (let row = 0; row < 12; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        currentRow.push(createNode(col, row));
      }
      grid.push(currentRow);
    }
    return grid;
  }; 
