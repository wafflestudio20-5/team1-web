import { DateTime } from 'luxon';
import { TimeObject } from './types';

export function formattedTime(time: TimeObject) {
  const createdTime = DateTime.fromObject(time);
  if (createdTime.diffNow().toMillis() > -60000) return '방금 전';
  else if (createdTime.diffNow().toMillis() > -3600000) return createdTime.toRelative();
  else if (createdTime.hasSame(DateTime.now(), 'year')) return createdTime.toFormat('MM/dd hh:mm');
  else return createdTime.toFormat('yy/MM/dd hh:mm');
}
