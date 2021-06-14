import React from "react";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const interviewerClass = props.selected
    ? "interviewers__item--selected"
    : "interviewers__item";

  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected ? props.name : ""}
    </li>
  );
}
