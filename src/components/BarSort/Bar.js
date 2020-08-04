import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../BarSort/BarSort.css'
//import { NavDropdown, Navbar, Nav } from 'react-bootstrap';



class Bar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
            barWidth: props.barWidth,
            barMargin: props.barMargin,
            action: props.action
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.action !== this.props.action){
            this.setState({
                action: this.props.action
            });
        }
    }
    render(){
        var colour;
        //console.log(this.state.action);
        if (this.state.action === 0) {
            colour = "#f2a900";
        } else if (this.state.action === 1) {
            colour = "#330072";
        } else if (this.state.action === 2) {
            colour = "blue";
        }

        const height = {
            height: Math.round(this.state.value/10) + '%',
            width: this.state.barWidth +'%',
            margin: this.state.barMargin + '%',
            background: colour
        }
        return (
            <div className='bar' style={height}>
                <p className='barText'>
                {this.state.value}
                </p>
                
            </div>
        )
    }

    
      
}

export default Bar;