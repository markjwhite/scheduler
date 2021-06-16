import axios from "axios";
import { useState, useEffect } from "react";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  const updateSpots = (days, id, appointments) => {
    const updateDay = days.find((day) => day.appointments.includes(id));

    let numOfSpots = 0;
    for (const appointment in appointments) {
      if (
        !appointments[appointment].interview &&
        updateDay.appointments.includes(appointments[appointment].id)
      ) {
        numOfSpots++;
      }
    }
    return { ...updateDay, spots: numOfSpots };
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      const newDay = updateSpots(state.days, id, appointments);
      setState({
        ...state,
        days: state.days.map((day) =>
          newDay.name === day.name ? newDay : day
        ),
        appointments,
      });
    });
  }

  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.delete(`/api/appointments/${id}`).then(() => {
      const newDay = updateSpots(state.days, id, appointments);
      setState({
        ...state,
        days: state.days.map((day) =>
          newDay.name === day.name ? newDay : day
        ),
        appointments,
      });
    });
  }

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      const [days, appointments, interviewers] = all;
      setState((prev) => ({
        ...prev,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data,
      }));
    });
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
