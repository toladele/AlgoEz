import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Bar from './Bar';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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

    bubbleSort() {
        var barStates = [];
        let currentArray = JSON.parse(JSON.stringify(this.state.bars));
        //console.log(this.state.bars);
        //console.log(currentArray);
        for (let i = 0; i < this.state.count; i++) {
            for (let j = 0; j < this.state.count - i - 1; j++) {
                currentArray[j].action = 0;
                if (currentArray[j].value > currentArray[j + 1].value) {
                    currentArray[j].action = 1;
                    currentArray[j + 1].action = 1;
                    [currentArray[j].value, currentArray[j + 1].value] = [currentArray[j + 1].value, currentArray[j].value];
                    for (let k = j + 2; k < this.state.count; k++) {
                        currentArray[k].action = 0;
                    }
                    barStates.push(JSON.parse(JSON.stringify(currentArray)));
                    for (let k = 0; k < j+1; k++){
                        currentArray[k].action = 0;
                    }
                    //console.log(currentArray);
                }
            }
        }
        return barStates;
    }

    getHeapAnimations(array) {
        const animations = [];
        if (array.length <= 1) return array;
        this.heapSort(array, animations);
        return animations;
    }
    
    heapSort(array, animations) {
        var length = array.length;
        var currentBars = JSON.parse(JSON.stringify(this.state.bars));
        
        //build heap
        for (var i = Math.floor(length / 2); i >= 0; i -= 1)      {
            this.heapify(array, length, i, animations, currentBars);
        }
        
        //swap root with last index. Decrement array length. Then heapify starting from root. 
        for (i = length - 1; i > 0; i--) {
            //change colours of bars being swapped
            this.changeBarColours(currentBars, 0, i, 1, 1);
            this.pushAnimation(animations, currentBars);

            this.swap(currentBars, 0, i);
            this.pushAnimation(animations, currentBars);

            //colour sorted bar blue and other bar yellow
            this.changeBarColours(currentBars, 0, i, 0, 2);
            this.pushAnimation(animations, currentBars);
            
            this.swap(array, 0, i);      
            this.heapify(array, i, 0, animations, currentBars);
        }

        currentBars[0].action = 2;
        this.pushAnimation(animations, currentBars);

    } 
    
    heapify(array, size, idx, animations, currentBars) {
        var left = 2 * idx + 1;
        var right = 2 * idx + 2;
        var max = idx;
    
        if (left < size && array[left].value > array[max].value) {
            this.changeBarColours(currentBars, left, max, 1, 1);
            this.pushAnimation(animations, currentBars);
            
            this.changeBarColours(currentBars, left, max, 0, 0);
            this.pushAnimation(animations, currentBars);
            
            max = left;
        }
    
        if (right < size && array[right].value > array[max].value) {
            this.changeBarColours(currentBars, right, max, 1, 1);
            this.pushAnimation(animations, currentBars);
            
            this.changeBarColours(currentBars, right, max, 0, 0);
            this.pushAnimation(animations, currentBars);

            max = right;
        }
    
        if (max !== idx) {
            this.changeBarColours(currentBars, idx, max, 1, 1);
            this.pushAnimation(animations, currentBars);

            this.swap(currentBars, idx, max);
            this.pushAnimation(animations, currentBars);

            this.changeBarColours(currentBars, idx, max, 0, 0);
            this.pushAnimation(animations, currentBars);

            this.swap(array, idx, max);
            this.heapify(array, size, max, animations, currentBars);
        }
    }

    changeBarColours(array, barOneIdx, barTwoIdx, barOneColour, BarTwoColour) {
        array[barOneIdx].action = barOneColour;
        array[barTwoIdx].action = BarTwoColour;
    }

    pushAnimation(animations, bars) {
        animations.push(JSON.parse(JSON.stringify(bars)));
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
        if (algo === 'bubble') {
            barStates = this.bubbleSort();
        }
        else if (algo === 'merge') {
            barStates = this.visualizeMergeSort();
        }
        else if (algo === 'quick') {
            this.visualizeQuickSort();
            return;
        }
        else if (algo === 'heap') {
            barStates = this.getHeapAnimations(JSON.parse(JSON.stringify(this.state.bars)));
        }
        else { //binary
            //Just put this here to test out heapsort
            barStates = this.getHeapAnimations(JSON.parse(JSON.stringify(this.state.bars)));
        }

        var speed = this.state.speed.current.value;
        //console.log(barStates);
        var currentAction = JSON.parse(JSON.stringify(this.state.actionCount));
        for (let i = 0; i < barStates.length; i++) {
            //console.log("In for");
            setTimeout(() => {
                if (currentAction > this.state.clearedActions) {
                    this.setState({bars: barStates[i]});
                }
                
                //console.log(barStates[i]);
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
 

    partition(array, left, right) {
        var pivot = array[Math.floor((right + left) / 2)].value, //middle element
            i = left, //left pointer
            j = right; //right pointer
        while (i <= j) {
            while (array[i].value < pivot) {
                i++;
            }
            while (array[j].value > pivot) {
                j--;
            }
            if (i <= j) {
                this.swap(array, i, j); //sawpping two elements
                i++;
                j--;
            }
        }
        return i;
    }

    visualizeQuickSort() {
        this.setState({
            stateArray : [],
        });
        var currentArray = JSON.parse(JSON.stringify(this.state.bars));
        this.quickSort(currentArray, 0, currentArray.length-1);
        var speed = this.state.speed.current.value;
        var barStates = JSON.parse(JSON.stringify(this.state.stateArray));
        var currentAction = this.state.actionCount;
        for (let i = 0; i < barStates.length; i++) {
            //console.log("In for");
            setTimeout(() => {
                if (currentAction> this.state.clearedActions) {
                    this.setState({bars: barStates[i]});
                }
                
                //console.log(barStates[i]);
                }, speed * i+1);
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
    setMerge() {
        this.setState({
            currentAlgo: 'merge',
        });
    }
    setHeap() {
        this.setState({
            currentAlgo: 'heap',
        });
    }
    setBinary() {
        this.setState({
            currentAlgo: 'binary',
        });
    }

    quickSort(array, left, right) {
            var index;
            this.state.stateArray.push(JSON.parse(JSON.stringify(array)));
            if (array.length > 1) {
                index = this.partition(array, left, right); //index returned from partition

                for (let j =0; j<index;j++){
                    array[j].action = 0;
                }
                array[index].action = 1;

                for (let j = index+1; j< array.length; j++){
                    array[j].action = 0;
                }
                if (left < index - 1) { //more elements on the left side of the pivot
                    this.quickSort(array, left, index - 1);
                }
                if (index < right) { //more elements on the right side of the pivot
                    this.quickSort(array, index, right);
                }
            }
            return array;
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
                    {/* <Button className= "algoButton" variant="dark" onClick={this.setMerge.bind(this)} >M E R G E</Button>                     */}
                    <Button className= "algoButton" variant="dark" onClick={this.setHeap.bind(this)}>H E A P</Button>
                    <Button className= "algoButton" variant="dark" onClick={this.setBubble.bind(this)} >B U B B L E</Button>                    
                    {/* <Button className= "algoButton" variant="dark" onClick={this.setBinary.bind(this)}>B I N A R Y</Button> */}
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