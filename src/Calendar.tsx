import { useEffect, useState } from "react";
import { BASE_URL } from "./Url";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid'
import dayjs from "dayjs";

export default function Calendar() {
    // Using Fullcalendar for creating a calendar view
    // https://fullcalendar.io/docs/react

    const [calendarTrainings, setCalendarTrainings] = useState([]);

    const fetchTrainings = () => {
        fetch(`${BASE_URL}/gettrainings`)
            .then(response => response.json())
            .then(data => {
                // mapping the data from fetch to match FullCalendar data needed
                const formatTrainings = data.map((training: any) => {
                    // taking startdate and calculating enddate with duration
                    const startDate = dayjs(training.date);
                    const endDate = startDate.add(training.duration, 'minute');

                    return {
                    id: training.id,
                    title: `${training.activity} / ${training.customer.firstname} ${training.customer.lastname}`,
                    start: startDate.toISOString(),
                    end: endDate.toISOString(),
                    };
                });
                setCalendarTrainings(formatTrainings);
            })
            .catch(error => console.log(error))
    }

    useEffect(fetchTrainings, []);

    return (
        <>
            {/*
            eventTimeFormat fixed with https://fullcalendar.io/docs/eventTimeFormat 
            
            dayGrid for month view and timeGrid for week and day views
            to get better visualized grid
            */}
            <div style={{ padding: "10px" }}>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    events={calendarTrainings}
                    selectable={true}
                    displayEventEnd={true}
                    height="auto"
                    eventTimeFormat={{
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    }
                    }
                    headerToolbar={{
                        left: 'prev,next',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                />
            </div>
        </>
    )
}