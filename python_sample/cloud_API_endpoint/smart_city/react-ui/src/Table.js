import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import axios from "axios";



class Table extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    // TODO: IP and port from config file?
    axios.get("http://0.0.0.0:3002/events").then(res => {
      const data = res.data;
      this.setState({data});
    });
  }

  convertDate(timestamp){
    const date = new Date(timestamp* 1000);
    return date.toISOString();
  }

  render() {
    const { data } = this.state;
    const columns = [
      {
        Header: "Type",
        accessor: "event_type"
      },
      {
        Header: "Time",
        accessor: "event_timestamp",
        Cell: props => <span>{this.convertDate(props.value)}</span>
      },
      {
        Header: "Location",
        accessor: "gps_coord"
      }
    ];
    return (
      <ReactTable 
        data={data} 
        columns={columns} 
        defaultPageSize={10}
        className="-striped -highlight"/>
    );
  }
}

export default Table;
