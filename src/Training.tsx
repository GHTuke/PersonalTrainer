import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react"
import { AllCommunityModule, ColDef, ModuleRegistry } from 'ag-grid-community'; 

import { BASE_URL } from "./Url";
import { TTraining } from "./types";
import dayjs from "dayjs";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function Training() {
    const [trainings, setTrainings] = useState([]);

    const [columnDefs] = useState<ColDef<TTraining>[]>([
        { 
            field: "date",
            headerName: "Date",
            flex: 1,
            filter: true,
            floatingFilter: true,
            suppressFloatingFilterButton: true,
            valueFormatter: (params) => {
                return dayjs(params.value).format('DD.MM.YYYY hh.mm');
            }
        },
        { 
            field: "duration",
            headerName: "Duration",
            flex: 0.5,
            filter: true,
            floatingFilter: true,
            suppressFloatingFilterButton: true,
        },
        { 
            field: "activity",
            headerName: "Activity",
            flex: 1,
            filter: true,
            floatingFilter: true,
            suppressFloatingFilterButton: true,
        },
        { 
            field: "customer",
            headerName: "Customer",
            valueGetter: (params) => {
                // questionmark added to get rid of typescript asking for edge cases
                // where data might be empty
                const customer = params.data?.customer;
                return customer ? `${customer.firstname} ${customer.lastname}` : 'Empty';
            },
            flex: 2,
            filter: true,
            floatingFilter: true,
            suppressFloatingFilterButton: true,
        },
      ]);
      

    const fetchTrainings = () => {
        fetch(`${BASE_URL}/gettrainings`)
            .then(response => response.json())
            .then(data => setTrainings(data))
            .catch(error => console.log(error))
    }

    useEffect(fetchTrainings, []);

    return (
        <>
            <h1>Training</h1>

            <div style={{ height: 700 }}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columnDefs}
                />
            </div>
        </>
    );
}