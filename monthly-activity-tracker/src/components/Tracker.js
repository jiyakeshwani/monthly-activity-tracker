import React from "react";

function Tracker(props) {
  return (
    <>
      <div className="tracker">
        <div className="activity">
          <p>{props.activityInfo.name}</p>
          <div className="month">{props.month}</div>
        </div>
        <div className="days">
          {props.activityInfo.month.map((day) => {
            return (
              <button
                key={day.id}
                onClick={() =>
                  props.handleIsDone(day.id, props.activityInfo.name)
                }
                className={day.isDone ? "active" : "day"}
              >
                {day.id}
              </button>
            );
          })}
        </div>
        <span onClick={props.handleDelete} className="delete">
          X
        </span>
      </div>
    </>
  );
}

export default Tracker;
