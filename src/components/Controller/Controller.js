import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BarUI from '../UI/Bars/BarUI';
import Grid from '../UI/Grid/Grid';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Button from 'react-bootstrap/Button';
import './Controller.css';


class Controller extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        }

    }
    setPath() {
        this.setState({
            mode: "path",
            active: true
        });
    }
    setSort(){
        this.setState({
            mode: "sort",
            active: true
        });
    }

    render () {

        if (this.state.active ===false) {
            return (
                <div className="toggleArea">
                    <br/>
                    <br/>
                    <Button className="homeButton" variant="dark" onClick={this.setPath.bind(this)}>PATH-FINDING</Button>
                    <br />
                    <Button className="homeButton" variant="dark" onClick={this.setSort.bind(this)}>SORTING</Button>
   
               
                </div>
                
            );
        }
        else {
            if (this.state.mode === 'path') {
                return (
                    <div>
                        <div className="toggleArea">
                        <br/>
                        <ToggleButtonGroup type="radio" name="mode">
                            <ToggleButton variant="secondary" value="path" onClick={this.setPath.bind(this)}>PATH-FINDING</ToggleButton>
                            <ToggleButton value="sort" onClick={this.setSort.bind(this)}>SORTING</ToggleButton>
                        </ToggleButtonGroup>
                    
                        </div>
                        <br/>
                        <Grid/>
                    </div>
                    
                );
            }
            else {
                return (
                    <div>
                        <div className="toggleArea">
                            <br/>
                            <ToggleButtonGroup type="radio" name="mode">
                                <ToggleButton value="path" onClick={this.setPath.bind(this)}>PATH-FINDING</ToggleButton>
                                <ToggleButton variant="secondary" value="sort" onClick={this.setSort.bind(this)}>SORTING</ToggleButton>
                            </ToggleButtonGroup>
                            
                        </div>
                        <br/>
                        <BarUI max={1000}/>

                    </div>
                    
                );
            }
        }


    }

        
}


export default Controller;