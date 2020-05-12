import React, { Component } from "react";
import ReactTable from "react-table";

class FlightDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          origin: "London",
          flight: "A123",
          arrival: "08:15",
          state: "NA",
        },
        {
          origin: "Berlin",
          flight: "D654",
          arrival: "08:45",
          state: "NA",
        },
      ],
    };
    this.eventSource = new EventSource("http://localhost:1234/flightdetails");
  }
  componentDidMount() {
    this.eventSource.onmessage = (e) => {
      this.updateFlightDetails(JSON.parse(e.data));
    };
  }
  updateFlightDetails = (updatedData) => {
    console.log("UpdatedData :", updatedData);
    const { data } = this.state;
    const updated = data.map((item) => {
      if (item.flight === updatedData.flight) {
        item.state = updatedData.status;
      }
      return item;
    });
    this.setState({
      data: Object.assign([], updated),
    });
  };
  generateRows = () => {
    const { data } = this.state;
    const rows = data.map((item) => {
      return (
        <tr>
          <td>{item.origin}</td>
          <td>{item.flight}</td>
          <td>{item.arrival}</td>
          <td>{item.state}</td>
        </tr>
      );
    });
    return rows;
  };
  render() {
    const rows = this.generateRows();
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>origin</th>
              <th>flight</th>
              <th>arrival</th>
              <th>state</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}

export default FlightDetails;
