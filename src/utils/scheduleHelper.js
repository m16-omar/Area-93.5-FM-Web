import showsScheduleData from '../data/showsScheduleData.json';
import scheduleData from '../data/scheduleData.json';

const DAYS_ARRAY = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

/**
 * Returns current day of the week in uppercase matching data keys (e.g. "MONDAY")
 */
export const getCurrentDayKey = () => {
  const dayIndex = new Date().getDay();
  return DAYS_ARRAY[dayIndex] || "MONDAY";
};

/**
 * Converts a time string like "05:00 am" or "10:30 pm" to minutes from midnight
 */
export const parseTimeToMinutes = (timeStr) => {
  if (!timeStr) return 0;
  const match = timeStr.trim().toLowerCase().match(/(\d+):(\d+)\s*(am|pm)/);
  if (!match) return 0;
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[3];
  if (period === 'pm' && hours < 12) hours += 12;
  if (period === 'am' && hours === 12) hours = 0;
  return hours * 60 + minutes;
};

/**
 * Checks if current time is within a show's time range (handles overnight shows)
 */
export const isShowActiveNow = (timeRange) => {
  if (!timeRange) return false;
  const parts = timeRange.split('-');
  if (parts.length !== 2) return false;

  const startMin = parseTimeToMinutes(parts[0]);
  const endMin = parseTimeToMinutes(parts[1]);

  const now = new Date();
  const currentMin = now.getHours() * 60 + now.getMinutes();

  // If time crosses midnight (e.g. 10:00 pm - 05:00 am)
  if (startMin > endMin) {
    return currentMin >= startMin || currentMin < endMin;
  }
  return currentMin >= startMin && currentMin < endMin;
};

/**
 * Gets shows for a specific day, chronologically arranged by time
 * with dynamically calculated `nowPlaying` status
 */
export const getShowsForDay = (dayKey = getCurrentDayKey()) => {
  const uppercaseDay = dayKey.toUpperCase();
  const rawShows = showsScheduleData.schedule[uppercaseDay] || showsScheduleData.schedule["MONDAY"] || [];
  const isToday = uppercaseDay === getCurrentDayKey();

  const mappedShows = rawShows.map((show) => {
    const isActive = isToday && isShowActiveNow(show.time);
    return {
      ...show,
      nowPlaying: isActive,
      day: uppercaseDay
    };
  });

  // Chronologically sort by start time (5:00 AM -> 10:00 PM)
  return mappedShows.sort((a, b) => {
    const timeA = a.time ? parseTimeToMinutes(a.time.split('-')[0]) : 0;
    const timeB = b.time ? parseTimeToMinutes(b.time.split('-')[0]) : 0;
    return timeA - timeB;
  });
};

/**
 * Gets the current on-air show based on the current day and time
 */
export const getCurrentOnAirShow = () => {
  const todayKey = getCurrentDayKey();
  const todayShows = getShowsForDay(todayKey);

  const activeShow = todayShows.find((s) => s.nowPlaying);
  if (activeShow) return activeShow;

  // If currently between show slots, pick the closest active show or default
  return todayShows[0] || {
    id: "default_on_air",
    name: "Midday Vibes",
    title: "Midday Vibes",
    dj: "Simi Ogunleye",
    time: "10:00 am - 02:00 pm",
    genre: "SOUNDS OF LAGOS",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    segments: "Sounds of Lagos: Music Heavy, Audio Bytes & Comedy",
    nowPlaying: true,
    day: todayKey
  };
};

/**
 * Convert title to url friendly slug
 */
export const getShowSlug = (title) => {
  return title
    ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    : '';
};
