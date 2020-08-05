import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Bar from './Bar';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import heapSort from '../../SortingAlgorithms/heapSort';
import bubbleSort from '../../SortingAlgorithms/bubbleSort';
import quickSort from '../../SortingAlgorithms/quickSort';

class BarUI extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputQty: React.createRef(),
            count: 0,
            max: props.max,
            active: false,
            bars: [],
            speed: React.createRef(),
            currentAlgo: 'quick',
            actionCount: 0,
            clearedActions: 0
        }
    }

    /*
--------------------------------------------------------------------------------------------
Name: generateBars()
Variables: 
  -barCount: the amount of graphs to be rendered for sorting
  -barList: list of bars
  -valList: list of bar values
Functions called:
Description of module:
  Get the user inputted amount of graphs to be rendered and render them to the screen
-----------------------------------------------------------------------------------------------
*/

    generateBars() {
        const barCount = this.state.inputQty.current.value;
        this.setState({
            active: true,
            count: 0,
            bars: [],
            clear: false
        });
        var barList = [];
        var valList = [];
        for (let i = 0; i < barCount; i++) {
            var newBar = {};
            var randomNum = Math.floor(Math.random() * Math.floor(this.state.max));
            while (valList.includes(randomNum)) {
                randomNum = Math.floor(Math.random() * Math.floor(this.state.max));
            }
            newBar.value = randomNum;
            newBar.action = 0;
            valList.push(randomNum);
            barList.push(newBar);
        }
        this.setState({
            count: barCount,
            bars: barList
        });

    }

/*
--------------------------------------------------------------------------------------------
Name: clear()
Variables: 
Functions called:
Description of module:
  Empty the list of bars and clear them from the screen
-----------------------------------------------------------------------------------------------
*/
    clear() {
        this.setState({
            bars: [],
            clear: true,
            clearedActions: this.state.actionCount
        });
        console.log(this.state.clearedActions);
    }

    /*
--------------------------------------------------------------------------------------------
Name: visualizeSort()
Variables: 
  -barStates: the amount of graphs to be rendered for sorting
  -algo: which algorithm is currently used: bubble, heap, sort
  -bars: current list of bars to be sorted
  -speed: user inputted speed for sorting animation
Functions called:
    - bubbleSort()
    - quickSort()
    - heapSort()
Description of module:
    Function responsible for animating the sorting procedure
-----------------------------------------------------------------------------------------------
*/
    visualizeSort() {
        var barStates;
        var algo = this.state.currentAlgo;
        // eslint-disable-next-line
        this.state.actionCount+= 1;
        var bars = JSON.parse(JSON.stringify(this.state.bars));
        if (algo === 'bubble') {
            barStates = bubbleSort(bars);
        }
        else if (algo === 'quick') {
            barStates = quickSort(bars, 0, bars.length-1, []);
        }
        else { // heap
            barStates = heapSort(bars);
        }

        var speed = this.state.speed.current.value;
        var currentAction = JSON.parse(JSON.stringify(this.state.actionCount));
        for (let i = 0; i < barStates.length; i++) {
            setTimeout(() => {
                if (currentAction > this.state.clearedActions) {
                    this.setState({bars: barStates[i]});
                }
                
              }, speed * i+1);
        }
    }

    /*
--------------------------------------------------------------------------------------------
Name: setBubble(), setQuick(), setHeap()
Variables: 
Functions called:
Description of module:
  Functions responsible for setting the current algorithm for sorting.
-----------------------------------------------------------------------------------------------
*/
    setBubble() {
        this.setState({
            currentAlgo: 'bubble',
        });
    }
    setQuick() {
        this.setState({
            currentAlgo: 'quick',
        });
    }
    setHeap() {
        this.setState({
            currentAlgo: 'heap',
        });
    }

    render(){
            var width = 92.0/this.state.count;
            var margin = 4.0/this.state.count;
            
            const barList = this.state.bars.map((bar) =>
                        <Bar key={bar.value} value={bar.value} barWidth={width} barMargin={margin} action={bar.action}/>             
                
            );
            return (
                <div className="sortDiv">
                <center>
                    <Button className= "algoButton" variant="dark" onClick={this.setQuick.bind(this)}>Q U I C K</Button>
                    <Button className= "algoButton" variant="dark" onClick={this.setHeap.bind(this)}>H E A P</Button>
                    <Button className= "algoButton" variant="dark" onClick={this.setBubble.bind(this)} >B U B B L E</Button>                    
                </center>
                    <br/>
                <Card>
                    <Card.Body>
                        <Form>
                            <Form.Group controlId="barQty">
                                <Form.Label>How many bars would you like to sort?</Form.Label>
                                <div className="controlArea">
                                    <center>
                                        <p className="rangeText">5</p>                            
                                        <Form.Control ref={this.state.inputQty} className="rangeControl" type="range" min="5" max="100" step="1"/>                            
                                        <p className="rangeText">100</p> 
                                        <Button className="rangeText" variant="success" onClick={this.generateBars.bind(this)}>Generate List</Button>
                                        <Button onClick={this.clear.bind(this)} variant="secondary">Clear</Button> 
                                        </center>
                                        
                                        <Form.Label>Speed</Form.Label>
                                        <div className="controlArea">
                                            <center>
                                            <p className="rangeText">Slow</p>  
                                            <Form.Control ref={this.state.speed} className="speedControl" type="range" min="5" max="2000" step="5"/>                            
                                            <p className="rangeText">Fast</p>
                                            <Button className="rangeText" onClick={this.visualizeSort.bind(this)}>Sort</Button>
                                            
                                            </center>
                                        </div>
                                    
                                </div>                            
                                
                                
                                
                            </Form.Group>
                        </Form>
    
    
                    </Card.Body>
                </Card>
                <br></br>
                <Card>
                    <Card.Body className='containingCard'>
                    <div className='barContainer'>
                            {barList}
                        </div>
                    </Card.Body>
                   
                    
                </Card>
                </div>
                
            );
        }
    }
    
    export default BarUI;