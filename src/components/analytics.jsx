import React, { Component } from "react";
import Chart from "./chart";
import axios from "axios";
export default class Analytics extends Component {
  constructor(props) {
    super(props);

    // lowest date from which testing data exists
    this.minDate = new Date(1601510400000).toISOString().split("T")[0];
    // end date can not pass the today's date itself
    this.maxDate = new Date().toISOString().split("T")[0];

    this.state = {
      enquiries: null,
      startDate: this.minDate,
      endDate: this.maxDate,
    };
  }
  handleDateChange = (type, event) => { 
    type === "start"
      ? this.setState({
          startDate: new Date(event.target.value).toISOString().split("T")[0],
        })
      : this.setState({
          endDate: new Date(event.target.value).toISOString().split("T")[0],
        });
  };
  componentDidMount() { // fetching from backend
    axios
      .post("http://localhost:5000/forms", {
        startDate: new Date(this.state.startDate).getTime(),
        endDate: new Date(this.state.endDate).getTime(),
      })
      .then((response) => {
        this.setState({ ...this.state, enquiries: response.data })
        console.log(response, typeof response);
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="analytics-container">
        <div className="analytics-header">
          <div>
          <input
            type="date"
            value={this.state.startDate}
            min={this.minDate}
            max={this.maxDate}
            onChange={(event) => this.handleDateChange("start", event)}
          />
          <input
            type="date"
            min={this.minDate}
            max={this.maxDate}
            value={this.state.endDate}
            onChange={(event) => this.handleDateChange("end", event)}
          />
          </div>
          <div>
            
          </div>
        </div>
        <div className="analytics-body">
         {this.state.enquiries ? <Chart
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            list={this.state.enquiries}
          /> : null }

        </div>
      </div>
    );
  }
}
