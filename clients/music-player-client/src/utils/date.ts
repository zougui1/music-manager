import moment from 'moment';
import { getDecimals } from 'utils-pkg';

import { DurationData } from '../types';

const reNoHour = /^00:/;

export const formatDuration = (duration: number | string | Date | moment.Moment): string => {
  if (!duration) {
    return '00:00';
  }

  // we subtract by one hour since it is a duration and
  // not a date (new Date(0) starts at 1 am)
  return moment(duration)
    .subtract(1, 'hours')
    .format('HH:mm:ss')
    // we remove the hour if the duration is less than one hour
    .replace(reNoHour, '');
}

export const getTrackListDuration = (seconds: number): DurationData => {
  const duration: DurationData = {
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  const minutesForHours = seconds / 60;
  const hours = minutesForHours / 60;
  const minutes = getDecimals(hours) * 60;
  duration.hours = Math.floor(hours);
  duration.minutes = Math.floor(minutes);
  duration.seconds = Math.floor(getDecimals(minutes) * 60);

  return duration;
}
