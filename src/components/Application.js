// import React from "react";

import "components/Application.scss";
import DayList from 'components/DayList';
import Appointment from "components/Appointment"

import React, { useState } from "react";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },

  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Monica Geller",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },

  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Phoebe Buffay",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png"
      }
    }
  },

  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Joey Tribbiani",
      interviewer: {
        id: 3,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png"
      }
    }
  },

  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Ross Gellar",
      interviewer: {
        id: 3,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png"
      }
    }
  },
  {
    id: 6,
    time: "5pm",
    interview: {
      student: "Chandler Bing",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png"
      }
    }
  }
];

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

export default function Application(props) {

  const [day, setDay] = useState("Monday");

  return (

    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={days}
            day={day}
            setDay={setDay}
          />

        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments.map(appointment => {
          return (<Appointment key={appointment.id} {...appointment} />)
        })}
        <Appointment key="last" time="6pm" />
      </section>
    </main>
  );
}


