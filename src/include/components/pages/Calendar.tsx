import * as React from 'react';
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
    AllDayPanel
} from '@devexpress/dx-react-scheduler-material-ui';

import CalProps, { defaultProps } from './CalContext';
import MonthlyView from './MonthView';
import WeeklyView from './WeekView';
import "include/style/Cal.css";

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
        const { schedulerData, currentDate, currentViewName } = this.state;

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
                    <MonthlyView />
                    <WeeklyView
                        name="week"
                        displayName="Week"
                    />
                    <WeeklyView
                        name="work-week"
                        displayName="Work Week"
                        excludedDays={[0, 6]}
                     />
                    <DayView />
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

export async function loader()
{
  await new Promise((r) => setTimeout(r, 500));
  return "Your Calendar is Loading!...";
}

export const Component = () =>
{
	return (<div className="cal">
        <Calendar />
	</div>);
}
Component.displayName = "CalendarPage";
