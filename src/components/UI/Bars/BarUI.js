import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Bar from './Bar';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import heapSort from '../../SortingAlgorithms/heapSort';
import bubbleSort from '../../SortingAlgorithms/bubbleSort';
import quickSort from '../../SortingAlgorithms/quickSort';

class BarSort extends React.Component {

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
            stateArray: [],
            actionCount: 0,
            clearedActions: 0
        }
    }

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

    clear() {
        this.setState({
            bars: [],
            stateArray: [],
            clear: true,
            clearedActions: this.state.actionCount
        });
        console.log(this.state.clearedActions);
    }
    
    swap(array, idx1, idx2) {
        var temp = array[idx1];
        array[idx1] = array[idx2];
        array[idx2] = temp;
    }

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

    merge_sort_aux(arr1, arr2) {
        var arr_final = [];
          while (arr1.length !== 0 && arr2.length !== 0) {
        
            if (arr1[0] <= arr2[0]) {

                arr_final.push(arr1[0]);
                arr1 = arr1.slice(1);
                //slice to get single elements to compare  
            }
            else {

                arr_final.push(arr2[0]);
                arr2 = arr2.slice(1)
            }
        }
        while (arr1.length)
            arr_final.push(arr1.shift());
        while (arr2.length)
            arr_final.push(arr2.shift());
        return arr_final;
    }

    merge_sort(a) {
        if (a.length <= 1) {

            return a;
        }
        else {
            var mid = parseInt(a.length / 2);
            var arr1 = a.slice(0, mid);
            var arr2 = a.slice(mid, a.length);

            return this.merge_sort_aux(this.merge_sort(arr1), this.merge_sort(arr2));
            //recursive call
        }
    }

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
                                            <Form.Control ref={this.state.speed} className="speedControl" type="range" min="20" max="2000" step="10"/>                            
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
    
    export default BarSort;