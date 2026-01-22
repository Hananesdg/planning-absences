export const getTodayAbsences = (absences, today) =>
  absences.filter(a => a.date === today);

export const countUnjustifiedAbsences = absences =>
  absences.filter(a => !a.justified).length;

export const getEventsThisWeek = (events) => events.length;

export const countEventsByType = (events) =>
  events.reduce((acc, e) => {
    acc[e.type] = (acc[e.type] || 0) + 1;
    return acc;
  }, {});

export const totalEventHours = (events) =>
  events.reduce((sum, e) => sum + e.duration, 0);
