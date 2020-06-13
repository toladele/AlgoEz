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
            active: false
        }

    }
    generateBars(){
        const barCount = this.state.inputQty.current.value;
        this.setState({
            values: [],
            active: true,
            count: 0
        })
        var valList = [];
        for (let i=0; i<barCount;i++){
            valList.push(Math.floor(Math.random() * Math.floor(this.state.max)));
        }
        this.setState({
            values: valList,
            count: barCount
        });

    }
    render(){

        var width = 90.0/this.state.count;
        var margin = 5.0/this.state.count;

        
        const barList = this.state.values.map((val) =>
                    <Bar value={val} barWidth={width} barMargin={margin}/> 
                
            
        );
        return (
            <div className="sortDiv">
                <br/>
            <Card>
                <Card.Body>
                    <Form>
                        <Form.Group controlId="barQty">
                            <Form.Label>How many Bars</Form.Label>
                            <div className="controlArea">
                                <p className="rangeText">5</p>                            
                                <Form.Control ref={this.state.inputQty} className="rangeControl"type="range" min="5" max="100" step="1"/>                            
                                <p className="rangeText">100</p> 
                                <Button className="rangeText" onClick={this.generateBars.bind(this)}>Generate List</Button>
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