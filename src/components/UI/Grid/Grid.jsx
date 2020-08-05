import React, { Component } from 'react';
import Node from './Node/Node'
import './Grid.css';
import dijkstra from '../../PathAlgorithms/dijkstra';
import bfs from '../../PathAlgorithms/bfs';
import dfs from '../../PathAlgorithms/dfs';
import Button from 'react-bootstrap/Button';

export default class PathGrid extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      currentAlgo: 'bfs',
      actionCount: 0,
      clearedActions: 0,
      isStartNode: true,
      start_node_row: 10,
      start_node_col: 20,
      finish_node_row: 10,
      finish_node_col: 30
    };
  }

  componentDidMount() {
    const grid = this.getStartGrid();
    this.setState({ grid });
  }


  animateAlgo(visitedNodesInOrder) {
    var currentAction = this.state.actionCount;
    for (let i = 0; i < visitedNodesInOrder.length; i++) {

      setTimeout(() => {
        if (currentAction > this.state.clearedActions) {
          const node = visitedNodesInOrder[i];
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node visited-node';
        }

      }, 20 * i);
    }
  }

  animateBfs(visitedNodesInOrder) {
    var currentAction = this.state.actionCount;
    for (let i = 0; i < visitedNodesInOrder.length; i++) {

      setTimeout(() => {
        if (currentAction > this.state.clearedActions) {
          const node = visitedNodesInOrder[i];
          if (i%3===0){
            document.getElementById(`node-${node.row}-${node.col}`).className =
            'node animate-one-node';
          }
          else if (i%3===1){
            document.getElementById(`node-${node.row}-${node.col}`).className =
            'node animate-two-node';
          } else {
            document.getElementById(`node-${node.row}-${node.col}`).className =
            'node visited-node';
          }         
        }

      }, 4 * i);
    }
  }


  visualize() {
    // grid, startnode, finishnode 
    if (this.state.start_node_col === null) {
      return;
    }
    const { grid } = this.state;
    // eslint-disable-next-line
    this.state.actionCount++;
    const startNode = grid[this.state.start_node_row][this.state.start_node_col];
    const finishNode = grid[this.state.finish_node_row][this.state.finish_node_col];
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
      visitedNodesInOrder = dfs(grid, startNode, finishNode);
    }
    else if (algo === 'a') {
      visitedNodesInOrder = bfs(grid, startNode, finishNode);
    }
    else { //bfs
      visitedNodesInOrder = bfs(grid, startNode, finishNode);
    }
    console.log(visitedNodesInOrder);
    if (algo === 'bfs') {
      this.animateBfs(visitedNodesInOrder);
    } else {
      this.animateAlgo(visitedNodesInOrder);
    }
  }

  clear() {
    const clearGrid = this.getStartGrid();
    this.setState({
      grid: clearGrid,
      clearedActions: this.state.actionCount
    });
    // eslint-disable-next-line
    this.state.start_node_col = null;
          // eslint-disable-next-line
    this.state.start_node_row = null;
          // eslint-disable-next-line
    this.state.finish_node_col = null;
          // eslint-disable-next-line
    this.state.finish_node_row = null;
    for (let row = 0; row < 20; row++) {
      for (let col = 0; col < 45; col++) {
        if (row === this.state.start_node_row && col === this.state.start_node_col) {
          document.getElementById(`node-${row}-${col}`).className =
            'node start-node';
        } else if (row === this.state.finish_node_row && col === this.state.finish_node_col) {
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

  handleMouseDown(row, col) {
    console.log("Row:", row)
    console.log("Column:", col)
    if (this.state.isStartNode === true) {
      this.clear();
      // eslint-disable-next-line
      this.state.start_node_row = row;
      // eslint-disable-next-line
      this.state.start_node_col = col;
      // eslint-disable-next-line
      this.state.isStartNode = false;
    } else {
      // eslint-disable-next-line
      this.state.finish_node_row = row;
      // eslint-disable-next-line
      this.state.finish_node_col = col;
      // eslint-disable-next-line
      this.state.isStartNode = true;
    }
    this.refresh();
  }

  refresh() {
    const clearGrid = this.getStartGrid();
    this.setState({
      grid: clearGrid,
      clearedActions: this.state.actionCount,
     });
    for (let row = 0; row < 20; row++) {
      for (let col = 0; col < 45; col++) {
        if (row === this.state.start_node_row && col === this.state.start_node_col) {
          document.getElementById(`node-${row}-${col}`).className =
            'node start-node';
        }
        if (row === this.state.finish_node_row && col === this.state.finish_node_col) {
          document.getElementById(`node-${row}-${col}`).className =
            'node finish-node';
        } 
      }
    }
  }


  render() {
    const { grid,
      //onMousePressed 
    } = this.state;

    return (
      <>
        <center>
          <Button className="algoButton" variant="dark" onClick={this.setBfs.bind(this)}>B F S</Button>
          <Button className="algoButton" variant="dark" onClick={this.setDijk.bind(this)} >D I J K S T R A</Button>
          <Button className="algoButton" variant="dark" onClick={this.setDfs.bind(this)}>D F S</Button>
          {/* <Button className="algoButton" variant="dark" onClick={this.setGreedy.bind(this)} >G R E E D Y</Button>
          <Button className="algoButton" variant="dark" onClick={this.setAstar.bind(this)}>A*</Button> */}
          <br />
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
                      onMouseDown={(row, col) => 
                        this.handleMouseDown(row, col)
                      }                      // }
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

  createNode = (col, row) => {
    var start_row = this.state.start_node_row;
    var start_col = this.state.start_node_col;
    var finish_col = this.state.finish_node_col;
    var finish_row = this.state.finish_node_row;
    return {
      col,
      row,
      isStart: row === start_row && col === start_col,
      isFinish: row === finish_row && col === finish_col,
      distance: Infinity,
      isVisited: false
    };
  };
  
  getStartGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 45; col++) {
        currentRow.push(this.createNode(col, row));
      }
      grid.push(currentRow);
    }
    return grid;
  }; 
}
