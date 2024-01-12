import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { MonthView } from '@devexpress/dx-react-scheduler-material-ui';
import CalProps, {classes} from './CalContext';

const StyledCell = styled(MonthView.TimeTableCell)(({ theme }) =>
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
        borderWidth: '2px',
        borderColor: alpha(theme.palette.primary.light, 1),
    },
    [`&.${classes.offline}`]:
    {
        backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
    },
}));

const StyledScaleCell = styled(MonthView.DayScaleCell)(({ theme }) =>
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
        borderColor: '#42a5f5 !important',
    },
    [`&.${classes.offline}`]:
    {
        backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
    },
}));

const TimeTableCell = (props) =>
{
    const { startDate } = props;
    const { currentDate } = React.useContext(CalProps);
    const today = new Date();
    const date = new Date(startDate);
    const cdate = new Date(currentDate);

    let cellClasses: string[] = [];
    if (today.getDate() === date.getDate())
        cellClasses.push(classes.todayCell);
    else if (startDate.getDay() === 0 || startDate.getDay() === 6)
        cellClasses.push(classes.weekendCell);

    if (cdate.getDate() === date.getDate() && cdate.getMonth() === date.getMonth())
        cellClasses.push(classes.selectedCell);

    return <StyledCell {...props} className={cellClasses.join(' ')} />;
}

const DayScaleCell = props =>
{
    const cellClasses: string[] = [];
    return <StyledScaleCell {...props} className={cellClasses.join(' ')} />;
}

const MonthlyView = () =>
{
    return <MonthView
        timeTableCellComponent={TimeTableCell}
        dayScaleCellComponent={DayScaleCell}
    />
}

export default MonthlyView;