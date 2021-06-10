export function getAppointmentsForDay(state, dayS) {
  for (const day of state.days) {
    if (day.name === dayS) {
      return day.appointments.map(id => state.appointments[id])
    }
  };
  return []
};

export function getInterview(state, interview) {

  return (

    interview && {
      student: interview.student,
      interviewer: { ...state.interviewers[interview.interviewer] }
    }
    
  );
}

