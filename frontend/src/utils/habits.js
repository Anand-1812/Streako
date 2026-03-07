export const isSameDay = (d1, d2) =>
  d1.getFullYear() === d2.getFullYear() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getDate() === d2.getDate();

export const enrichHabits = (habits, today = new Date()) =>
  (habits || []).map((habit) => {
    const lastEntry = habit.history?.[habit.history.length - 1];
    const isCompletedToday =
      lastEntry && isSameDay(new Date(lastEntry.date), today)
        ? lastEntry.completed
        : false;

    return { ...habit, isCompletedToday };
  });

export const buildHeatMapData = (habits) =>
  (habits || []).flatMap(
    (habit) =>
      habit.history?.map((entry) => ({
        date: entry.date,
        count: entry.completed ? 1 : 0,
      })) || []
  );
