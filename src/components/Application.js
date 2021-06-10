// import React from "react";

import "components/Application.scss";
import DayList from 'components/DayList';
import Appointment from "components/Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterview } from "helpers/selectors"

import React, { useState, useEffect } from "react";



export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day)

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      console.log(all[2].data)
      const [days, appointments, interviewers] = all
      setState(prev => ({ ...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data }))
    })
  }, []);

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
            days={state.days}
            day={state.day}
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
        {dailyAppointments.map(appointment => {
          const interview = getInterview(state, appointment.interview)
          return (<Appointment
            key={appointment.id}
            id={appointment.id}
            time={appointment.time}
            interview={interview} />)
        })}
        <Appointment key="last" time="6pm" />
      </section>
    </main>
  );
}


