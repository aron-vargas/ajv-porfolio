import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { WeekView } from '@devexpress/dx-react-scheduler-material-ui';
import CalProps from './CalContext';

const classes =
{
    todayCell: "default-todayCell",
    weekendCell: "default-weekendCell",
    selectedCell: "default-selectedCell",
    today: "default-today",
    weekend: "default-weekend",
    selected: "default-selected",
    offline: "default-offline",
};

const Cell = styled(WeekView.TimeTableCell)(({ theme }) =>
({
    [`&.${classes.todayCell}`]:
    {
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
        '&:hover':
        {
            backgroundColor: alpha(theme.palette.primary.main, 0.14),
        },
        '&:focus':
        {
            backgroundColor: alpha(theme.palette.primary.main, 0.16),
        },
    },
    [`&.${classes.weekendCell}`]:
    {
        backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
        '&:hover':
        {
            backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
        },
        '&:focus':
        {
            backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
        },
    },
    [`&.${classes.selectedCell}`]:
    {
        borderRight: '2px solid #42a5f5',
        borderLeft: '2px solid #42a5f5',
        '&:last-child':
        {
            borderRight: '2px solid #42a5f5',
        }
    },
    [`&.${classes.offline}`]:
    {
        backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
    },
}));

const ScaleCell = styled(WeekView.DayScaleCell)(({ theme }) =>
({
    [`&.${classes.today}`]:
    {
        backgroundColor: alpha(theme.palette.primary.main, 0.16),
    },
    [`&.${classes.weekend}`]:
    {
        backgroundColor: alpha(theme.palette.action.disabledBackground, 0.06),
    },
    [`&.${classes.selected}`]:
    {
        borderRight: '2px solid #42a5f5',
        borderLeft: '2px solid #42a5f5',
    },
    [`&.${classes.offline}`]:
    {
        backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
    },
}));

const TimeTableCell = (props) =>
{
    const { startDate } = props;
    const { workStartDayHour, workEndDayHour, currentDate } = React.useContext(CalProps);
    const today = new Date();
    const date = new Date(startDate);
    const cdate = new Date(currentDate);

    let cellClasses: string[] = [];
    if (today.getDate() === date.getDate())
        cellClasses.push(classes.todayCell);
    else if (startDate.getDay() === 0 || startDate.getDay() === 6)
        cellClasses.push(classes.weekendCell);

    if (cdate.getDate() === date.getDate())
        cellClasses.push(classes.selectedCell);

    if (date.getHours() < workStartDayHour || date.getHours() > workEndDayHour)
        cellClasses.push(classes.offline);

    return <Cell {...props} className={cellClasses.join(' ')} />;
};

const DayScaleCell = (props) =>
{
    const { startDate, today } = props;
    const { currentDate } = React.useContext(CalProps);
    const date = new Date(startDate);
    const cdate = new Date(currentDate);

    let cellClasses: string[] = [];
    if (today)
        cellClasses.push(classes.today);
    else if (startDate.getDay() === 0 || startDate.getDay() === 6)
        cellClasses.push(classes.weekend);

    if (cdate.getDate() === date.getDate())
        cellClasses.push(classes.selected);

    return <ScaleCell {...props} className={cellClasses.join(' ')} />;
};

export const WeeklyView = (props) =>
{
    const { startDayHour,  endDayHour } = React.useContext(CalProps);

    return <WeekView
        startDayHour={startDayHour}
        endDayHour={endDayHour}
        timeTableCellComponent={TimeTableCell}
        dayScaleCellComponent={DayScaleCell}
        {...props}
    />
}

export default WeeklyView;