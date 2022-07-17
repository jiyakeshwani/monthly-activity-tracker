import React from "react";
import Tracker from "./Tracker";
import { trackingMonth } from "../data";

class Input extends React.Component {
  constructor(props) {
    super();
    this.state = {
      activities: [],
      inputValue: "",
    };
  }

  handleIsDone = (date, activityName) => {
    let activities = JSON.parse(JSON.stringify(this.state.activities));

    activities.forEach((activity) => {
      if (activity.name === activityName) {
        activity.month.forEach((day) => {
          if (day.id === date) {
            day.isDone = !day.isDone;
            console.log(day.isDone);
          }
        });
      }
    });
    this.setState({
      activities: activities,
    });
  };

  handleDelete = (event, i) => {
    let activityArray = [...this.state.activities];
    activityArray.splice(i, 1);
    this.setState({
      activities: [...activityArray],
    });
  };
  handleInput = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.inputValue) {
      this.setState(
        (prevState) => {
          return {
            activities: prevState.activities.concat([
              {
                name: this.state.inputValue,
                month: [...trackingMonth],
              },
            ]),
          };
        },
        () => {
          this.setState({ inputValue: "" });
        }
      );
    }
  };

  render() {
    let date = new Date();
    const currentMonth = date.toLocaleString("default", {
      month: "long",
    });
    return (
      <>
        <div className="header">
          <h1> Monthly Activity Tracker!</h1>
          <form className="input" onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="eg:coding"
              value={this.state.inputValue}
              onChange={this.handleInput}
            />
            <button type="submit" className="btn1" onClick={this.handleSubmit}>
              Add Activity 
            </button>
          </form>
        </div>
        {this.state.activities.map((activity, i) => {
          return (
            <Tracker
              key={i}
              activityInfo={activity}
              index={i}
              month={currentMonth}
              handleIsDone={this.handleIsDone}
              handleDelete={this.handleDelete}
            />
          );
        })}
      </>
    );
  }
}

export default Input;
