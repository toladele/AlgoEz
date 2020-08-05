import React, { Component } from 'react';
import Node from './Node/Node'
import './Grid.css';
import dijkstra from '../../PathAlgorithms/dijkstra';
import bfs from '../../PathAlgorithms/bfs';
import dfs from '../../PathAlgorithms/dfs';
import Button from 'react-bootstrap/Button';

export default class Grid extends Component {
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

/*
--------------------------------------------------------------------------------------------
Name: animateAlgo(visitedNodesInOrder)
Parameters: visitedNodesInOrder: array of nodes
Variables: 
  -currentAction: action counter
Functions called:
Description of module:
  This function animates the DFS or dijkstra algorithm. It traverses through the visitedNodesInOrder
  and changes their state to blue, while delaying the change by a short period of time.
-----------------------------------------------------------------------------------------------
*/
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
/*
--------------------------------------------------------------------------------------------
Name: animateBfs(visitedNodesInOrder)
Parameters: visitedNodesInOrder: array of nodes
Variables: 
Functions called:
Description of module:
  This function animates the BFS algorithm. Due to the fact that nodes are traversed more than
  once using BFS, the nodes vary between three different colours in order to better illustrate
  the algorithm. A timeout is used to delay the changing of colours which helps a user view the
  animation.
-----------------------------------------------------------------------------------------------
*/
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
/*
--------------------------------------------------------------------------------------------
Name: visualize()
Variables: 
  -algo: set as the pathfinding algorithm selected by the user (DFS, BFS, Dijkstra)
  -grid: the pathfinding grid
  -startnode, finishnode: nodes representing where pathfinding begins and ends
  -visitedNodesInOrder: array containing the selected algorithm's visited nodes, in order
Functions called:
  -dfs, bfs, dijkstra, animateAlgo, animateBfs
Description of module:
  This module identifies the grid, it's start and finish nodes, and the user's algorithm.
  It then calls the corresponding algorithm function, which returns the visitedNodesInOrder.
  Then using the visitedNodesInOrder, it calls the animateAlgo() function, which animates the
  algorithm.
-----------------------------------------------------------------------------------------------
*/

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
    //call the selected algorithm 
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
    if (algo === 'bfs') {
      this.animateBfs(visitedNodesInOrder);
    } else {
      this.animateAlgo(visitedNodesInOrder);
    }
  }

/*
--------------------------------------------------------------------------------------------
Name: clear()
Variables: 
  -clearGrid: the pathfinding grid to be cleared
Functions called:
Description of module:
  This module traverses through the grid and resets each node to its original state.
-----------------------------------------------------------------------------------------------
*/

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


/*
--------------------------------------------------------------------------------------------
Name: setBfs(), setDijk(), setDfs()
Variables: 
Functions called:
Description of module:
  Functions responsible for setting the current algorithm for path finding.
-----------------------------------------------------------------------------------------------
*/
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


  /*
--------------------------------------------------------------------------------------------
Name: handleMouseDown()
Variables: 
Functions called:
  - clear()
  - refresh()
Description of module:
  Event handler for when user picks start and end nodes.
-----------------------------------------------------------------------------------------------
*/
  handleMouseDown(row, col) {
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

/*
--------------------------------------------------------------------------------------------
Name: refresh()
Variables: 
  - clearGrid: blank starting grid
Functions called:
Description of module:
  Refreshes the current state of the grid after picking start and end tiles (renders them to screen)
-----------------------------------------------------------------------------------------------
*/
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
          {/* <Button className="algoButton" variant="dark" onClick={this.setGreedy.bind(this)} >G R E E D Y</Button> */}
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

/*
--------------------------------------------------------------------------------------------
Name: createNode(col,row)
Parameters: 
  -col: column number
  -row: row number
Variables: 
  -start_row, start_col, finish_col, finish_row: locations of the start/finsih node's row/col
Functions called:
Description of module:
  This module takes a row and column number and creates and returns a node in that location.
Returns: col, row, isStart, isFinish, distance, isVisited
-----------------------------------------------------------------------------------------------
*/
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
/*
--------------------------------------------------------------------------------------------
Name: getStartGrid()
Parameters:
Variables: 
  -grid: matrix containing nodes, represents the pathfinding grid
Functions called:
  -createNode(col, row)
Returns:
  -grid
Description of module:
  This function initializes the starting pathfinding grid, by adding nodes to a 20*45 size matrix
-----------------------------------------------------------------------------------------------
*/  
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
