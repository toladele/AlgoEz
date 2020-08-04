import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Node from './Node/Node'
import './PathGrid.css';
import dijkstra from '../pathAlgo/dijkstra';
import bfs from '../pathAlgo/bfs';
import Button from 'react-bootstrap/Button';


const START_NODE_ROW = 10;
const START_NODE_COL = 20;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 30;

export default class PathGrid extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      currentAlgo: 'bfs',
      //onMousePressed: false,
    };
  }

  componentDidMount() {
    const grid = getStartGrid();
    this.setState({ grid });
  }


  animateAlgo(visitedNodesInOrder) {
    /*
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const newGrid = this.state.grid.slice();
        const newNode = {
          ...node,
          isVisited: true,
        };
        newGrid[node.row][node.col] = newNode;
        this.setState({ grid: newGrid });
      }, 40 * i);
    }
    */
   for (let i = 0; i < visitedNodesInOrder.length; i++) {

    setTimeout(() => {
      const node = visitedNodesInOrder[i];
      document.getElementById(`node-${node.row}-${node.col}`).className =
        'node visited-node';
    }, 20 * i);
  }
  }


  visualize() {
    // grid, startnode, finishnode 
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    //call the dikes algorithm 
    var algo = this.state.currentAlgo;
    var visitedNodesInOrder;
    if (algo === 'greedy') {
      visitedNodesInOrder = bfs(grid, startNode, finishNode);
    }
    else if (algo === 'dijkstra') {
      visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    }
    else if (algo === 'dfs') {
      visitedNodesInOrder = bfs(grid, startNode, finishNode);
    }
    else if (algo === 'a') {
      visitedNodesInOrder = bfs(grid, startNode, finishNode);
    }
    else { //bfs
      visitedNodesInOrder = bfs(grid, startNode, finishNode);
    }
    console.log(visitedNodesInOrder);
    this.animateAlgo(visitedNodesInOrder);
  }

  clear() {
    const clearGrid = getStartGrid();
    this.setState({ grid: clearGrid });
    for (let row = 0; row < 20; row++) {
      for (let col = 0; col < 45; col++) {
        if (row === START_NODE_ROW && col === START_NODE_COL) {
          document.getElementById(`node-${row}-${col}`).className =
            'node start-node';
        } else if (row === FINISH_NODE_ROW && col === FINISH_NODE_COL) {
          document.getElementById(`node-${row}-${col}`).className =
            'node finish-node';
        } else {
          document.getElementById(`node-${row}-${col}`).className =
            'node ';
        }
      }
    }
  }

setBfs() {
    this.setState({
        currentAlgo: 'bfs',
    });
}
setDijk() {
    this.setState({
        currentAlgo: 'dijkstra',
    });
}
setDfs() {
    this.setState({
        currentAlgo: 'dfs',
    });
}
setGreedy() {
    this.setState({
        currentAlgo: 'greedy',
    });
}
setAstar() {
    this.setState({
        currentAlgo: 'a',
    });
}


  render() {
    const { grid,
      //onMousePressed 
    } = this.state;

    return (
      <>
        <center>
          <Button className= "algoButton" variant="dark" onClick={this.setBfs.bind(this)}>B F S</Button>
          <Button className= "algoButton" variant="dark" onClick={this.setDijk.bind(this)} >D I J K S T R A</Button>                    
          <Button className= "algoButton" variant="dark" onClick={this.setDfs.bind(this)}>D F S</Button>
          <Button className= "algoButton" variant="dark" onClick={this.setGreedy.bind(this)} >G R E E D Y</Button>                    
          <Button className= "algoButton" variant="dark" onClick={this.setAstar.bind(this)}>A*</Button>
          <br/>
          <Button className="gridControls" onClick={() => { this.visualize() }}>
            Visualize
          </Button>
          <Button className="gridControls" onClick={() => { this.clear() }} variant="secondary">
            Clear
          </Button>
          <div className="grid" style={{ justifyContent: 'center', alignContent: 'center' }}>
            {grid.map((row, rowIdx) => {
              return (
                <div key={rowIdx}>
                  {row.map((node, nodeIdx) => {
                    const {
                      row,
                      col,
                      isFinish, isStart, isVisited
                      //isWall 
                    } = node;
                    return (
                      <Node
                        key={nodeIdx}
                        col={col}
                        row={row}
                        isFinish={isFinish}
                        isStart={isStart}
                        isVisited={isVisited}
                      // isWall={isWall}
                      // onMousePressed={onMousePressed}
                      // onMouseDown={(row, col) => ({})
                      //   // this.handleMouseDown(row, col)
                      // }
                      // onMouseEnter={(row, col) => ({})
                      //   //  this.handleMouseEnter(row, col)
                      // }
                      // onMouseUp={() => ({})
                      //   // this.handleMouseUp()
                      // }
                      >
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
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false
  };
};

const getStartGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 45; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
}; 
