import { createContext } from 'react';

export let defaultProps = {
    Prefix: 'default',
    startDayHour: 8,
    endDayHour: 18,
    workStartDayHour: 10,
    workEndDayHour: 16,
    currentViewName: 'Month',
    todaysDate: new Date().toString(),
    currentDate: new Date().toString(),
    schedulerData: [
        { startDate: '2024-01-11T09:45', endDate: '2024-01-11T11:00', title: 'Meeting' },
        { startDate: '2024-01-08T09:45', endDate: '2024-01-08T11:00', title: 'Remember to learn something new', allDay: true},
        { startDate: '2024-01-12T12:00', endDate: '2024-01-12T13:30', title: 'Go to a gym' },
    ]
};

export const classes =
{
    todayCell: defaultProps.Prefix+"-todayCell",
    weekendCell: defaultProps.Prefix+"-weekendCell",
    selectedCell: defaultProps.Prefix+"-selectedCell",
    today: defaultProps.Prefix+"-today",
    weekend: defaultProps.Prefix+"-weekend",
    selected: defaultProps.Prefix+"-selected",
    offline: defaultProps.Prefix+"-offline",
};

const CalProps = createContext(defaultProps);

export default CalProps;