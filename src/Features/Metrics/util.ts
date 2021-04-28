import moment from 'moment';

const formatDate = (date: any, format: string) => {
  return moment(new Date(date)).format(format);
};

export const formatter = (date: number) => {
  return formatDate(date, 'h:mm a');
};

export const labelFormatter = (date: any) => {
  return formatDate(date, 'MMM D YYYY, h:mm:ss a');
};

const map = new Map();
map.set('flareTemp', '#FF0000');
map.set('casingPressure', '#FFA600');
map.set('injValveOpen', '#800080');
map.set('oilTemp', '#FFFF00');
map.set('tubingPressure', '#00FF00');
map.set('waterTemp', '#DC143C');

export const getColor = (index: string) => {
  return map.get(index);
};

