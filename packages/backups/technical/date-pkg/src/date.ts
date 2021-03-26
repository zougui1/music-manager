import moment from 'moment';

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
