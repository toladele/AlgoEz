import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Bar from '../BarSort/Bar';
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
            values: [],
            active: false,
            bars: []
        }

    }
    generateBars(){
        const barCount = this.state.inputQty.current.value;
        this.setState({
            values: [],
            active: true,
            count: 0,
            bars: []
        });
        var valList = [];
        var barList = [];
        for (let i=0; i<barCount;i++){
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
            values: valList,
            count: barCount,
            bars: barList
        });

    }

    clear() {
        this.setState({
            values: [],
            count: 0,
            bars: []
        });
    }
    sorter(a,b) {
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        return 0;
    }
    bubble_sort() {
        var that = this;
        var array = this.state.bars;
        for (let i=0; i<this.state.count; i++){
            for (let j=0; j<this.state.count-i-1; j++){
                if (array[j].value > array[j+1].value) {
                    //console.log("THIS");
                    
                    
                    //console.log(array[j].action);
                    
                    [array[j].value, array[j+1].value] = [array[j+1].value, array[j].value];
                    setTimeout(() => {
                        //console.log(array);
                        
                        array[j].action = 1;
                        array[j+1].action = 1;
                        that.setState({bars: array});}, 40*i);
                }
            }
        }
    }
    one() {
        return new Promise(resolve => {
          console.log("one");
          resolve();
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
                                    <Button className="rangeText" onClick={this.generateBars.bind(this)}>Generate List</Button>
                                    <br />
                                    <Button onClick={this.clear.bind(this)} variant="secondary">Clear</Button> 
                                    <Button onClick={this.bubble_sort.bind(this)}>Sort</Button>
                                </center>
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
            
        )
    }
}

export default BarSort;