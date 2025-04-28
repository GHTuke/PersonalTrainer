import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react"
import { AllCommunityModule, ColDef, ICellRendererParams, ModuleRegistry } from 'ag-grid-community';

import { BASE_URL } from "./Url";
import { TTraining } from "./types";
import dayjs from "dayjs";
import { Button } from "@mui/material";

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
        {
            field: 'id',
            headerName: '',
            flex: 1,
            cellRenderer: (params: ICellRendererParams) => {
                return <Button onClick={() => handleDelete(params.value)} color='error'>Delete</Button>
            }
        },
    ]);

    // very basic confirmation window for deleting training
    const handleDelete = (id: number) => {
        if (window.confirm('Confirm delete')) {
            deleteTraining(id);
        }
    }

    const fetchTrainings = () => {
        fetch(`${BASE_URL}/gettrainings`)
            .then(response => response.json())
            .then(data => setTrainings(data))
            .catch(error => console.log(error))
    }

    useEffect(fetchTrainings, []);

    const deleteTraining = (id: number) => {
        const options = {
            method: 'DELETE'
        };

        fetch(`${BASE_URL}/trainings/${id}`, options)
            .then(() => fetchTrainings())
            .catch(error => console.log(error))
    }

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