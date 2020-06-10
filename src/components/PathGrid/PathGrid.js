
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactTable from "react-table-6";
import 'react-table-6/react-table.css';



class PathGrid extends Component {

    render() {
        const data = [{ value: "a" }, { value: "b" }, { value: "c" }, { value: "d" }];
        const columns = [{Header: "test", accessor: "value" }, {Header: "test", accessor: "value" }, {Header: "test", accessor: "value" }, {Header: 'test', accessor: 'value' }];

        return (
            <div>
                <ReactTable
                data={data}
                columns={columns}
                filterable = {false}
             />
             </div>
        );
    }
}

export default PathGrid;