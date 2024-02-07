import * as React from 'react';
import { useLoaderData } from "react-router-dom";
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    Appointments,
    Toolbar,
    ViewSwitcher,
    DateNavigator,
    TodayButton,
    DayView,
    MonthView,
    WeekView,
    AllDayPanel
} from '@devexpress/dx-react-scheduler-material-ui';
import { styled, alpha } from '@mui/material/styles';
import { NoMatch } from "include/components/ErrorBoundy";
import Config from "include/config.json";
import "include/style/Cal.css";

/**
 * Setup default properties from the Config
 */
let defaultProps: any = Config.calendarConf;
// Default to Today
defaultProps.todaysDate = new Date().toString();
defaultProps.currentDate = new Date().toString();
// Add some dummy scheduler data
defaultProps.schedulerData = [
        { startDate: '2024-01-11T09:45', endDate: '2024-01-11T11:00', title: 'Meeting' },
        { startDate: '2024-01-08T09:45', endDate: '2024-01-08T11:00', title: 'Remember to learn something new', allDay: true},
        { startDate: '2024-01-12T12:00', endDate: '2024-01-12T13:30', title: 'Go to a gym' }
];

/**
 * Create a Calendar Context for the views
 */
export const CalProps = React.createContext(defaultProps);

/**
 * Define varius classes for cells
 *
 * TODO: see if this is neccessary
 */
export const classes =
{
    todayCell: defaultProps.theme+"-todayCell",
    weekendCell: defaultProps.theme+"-weekendCell",
    selectedCell: defaultProps.theme+"-selectedCell",
    today: defaultProps.theme+"-today",
    weekend: defaultProps.theme+"-weekend",
    selected: defaultProps.theme+"-selected",
    offline: defaultProps.theme+"-offline",
};

/**
 * Month View Cells
 */
const MVTTCell = (props) =>
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

    const Cell = styled(MonthView.TimeTableCell)(({ theme }) =>
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

    return <Cell {...props} className={cellClasses.join(' ')} />;
}

const MVDSCell = (props) =>
{
    const cellClasses: string[] = [];

    const Cell = styled(MonthView.DayScaleCell)(({ theme }) =>
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
    return <Cell {...props} className={cellClasses.join(' ')} />;
}

/**
 * Week View Cells
 */
const WVTTCell = (props) =>
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

    return <Cell {...props} className={cellClasses.join(' ')} />;
};

const WVDSCell = (props) =>
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

    const Cell = styled(WeekView.DayScaleCell)(({ theme }) =>
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

    return <Cell {...props} className={cellClasses.join(' ')} />;
};


/**
 * Day View Cells
 */
const DVTTCell = (props) =>
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

     const Cell = styled(DayView.TimeTableCell)(({ theme }) =>
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

    return <Cell {...props} className={cellClasses.join(' ')} />;
};

const DVDSCell = (props) =>
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

    const Cell = styled(DayView.DayScaleCell)(({ theme }) =>
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

    return <Cell {...props} className={cellClasses.join(' ')} />;
};

/**
 * Main Calendar Class
 * @param P {}
 * @param S {}
 * @param SS any
 */
export default class Calendar extends React.PureComponent<{}, typeof defaultProps >
{
    constructor(props)
    {
        super(props);

        this.state = defaultProps;

        // Bind this on the change methods
        this.currentDateChange = this.currentDateChange.bind(this);
        this.currentViewNameChange = this.currentViewNameChange.bind(this);
    }

    currentDateChange = (currentDate) =>
    {
        this.setState({ currentDate });
    };

    currentViewNameChange = (currentViewName) =>
    {
        this.setState({ currentViewName });
    }

    render()
    {
        const { startDayHour, endDayHour, schedulerData, currentDate, currentViewName } = this.state;

        return (
        <CalProps.Provider value={this.state}>
            <Paper>
                <Scheduler data={schedulerData}>
                    <ViewState
                        defaultCurrentDate={currentDate}
                        currentDate={currentDate}
                        currentViewName={currentViewName}
                        onCurrentDateChange={this.currentDateChange}
                        onCurrentViewNameChange={this.currentViewNameChange}
                    />
                    <MonthView
                        timeTableCellComponent={MVTTCell}
                        dayScaleCellComponent={MVDSCell}
                    />
                    <WeekView
                        name="week"
                        displayName="Week"
                        startDayHour={startDayHour}
                        endDayHour={endDayHour}
                        timeTableCellComponent={WVTTCell}
                        dayScaleCellComponent={WVDSCell}
                    />
                    <WeekView
                        name="work-week"
                        displayName="Work Week"
                        startDayHour={startDayHour}
                        endDayHour={endDayHour}
                        excludedDays={[0, 6]}
                        timeTableCellComponent={WVTTCell}
                        dayScaleCellComponent={WVDSCell}
                     />
                    <DayView
                        startDayHour={startDayHour}
                        endDayHour={endDayHour}
                        timeTableCellComponent={DVTTCell}
                        dayScaleCellComponent={DVDSCell}
                    />
                    <Toolbar />
                    <DateNavigator />
                    <TodayButton />
                    <ViewSwitcher />
                    <Appointments />
                    <AllDayPanel />
                </Scheduler>
            </Paper>
        </CalProps.Provider>
        );
    }
}

export async function loader({request})
{
    return "Your Calendar is Loading!...";
}

export const Component = () =>
{
    let data = useLoaderData();

	return (<React.Suspense fallback={ <div>Loading....</div> }>
        <div className="cal">
            <Calendar />
	    </div>
    </React.Suspense>);
}
Component.displayName = "CalendarPage";

export function ErrorBoundary() { return <NoMatch/> }
