import { useEffect, useState } from "react";
import { BASE_URL } from "./Url";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

export default function Calendar() {
    // Using Fullcalendar for creating a calendar view
    // https://fullcalendar.io/docs/react

    const [trainings, setTrainings] = useState([]);

    const fetchTrainings = () => {
            fetch(`${BASE_URL}/gettrainings`)
                .then(response => response.json())
                .then(data => {
                    // mapping the data from fetch to match FullCalendar data needed
                    const formatTrainings = data.map((training: any) => ({
                        id: training.id,
                        title: `${training.activity} / ${training.customer.firstname} ${training.customer.lastname}`,
                        start: training.date,
                    }));
                    setTrainings(formatTrainings);
                })
                .catch(error => console.log(error))
        }
    
        useEffect(fetchTrainings, []);

    return (
        <>
        {/*eventTimeFormat fixed with https://fullcalendar.io/docs/eventTimeFormat */}
        <div style={{ padding: "10px" }}>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={trainings}
                height="auto"
                eventTimeFormat={{
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                  }
                    }
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,dayGridWeek,dayGridDay'
                }}
            />
        </div>
        </>
    )
}