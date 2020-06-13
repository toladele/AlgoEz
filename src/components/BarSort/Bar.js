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
            barMargin: props.barMargin
        }
    }
    render(){
        const height = {
            height: Math.round(this.state.value/10) + '%',
            width: this.state.barWidth +'%',
            margin: this.state.barMargin + '%'
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