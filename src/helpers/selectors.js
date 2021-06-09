export default function getAppointmentsForDay(state, dayS) {
  for (const day of state.days) {
    if (day.name === dayS) {
      return day.appointments.map(id => state.appointments[id])
    }
  };
  return []
};