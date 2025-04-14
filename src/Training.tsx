import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react"
import { AllCommunityModule, ColDef, ModuleRegistry } from 'ag-grid-community'; 

import { BASE_URL } from "./Url";
import { TTraining } from "./types";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function Training() {
    const [trainings, setTrainings] = useState([]);

    const [columnDefs] = useState<ColDef<TTraining>[]>([
        { field: "date" },
        { field: "duration" },
        { field: "activity" },
      ]);
      

    const fetchTrainings = () => {
        fetch(`${BASE_URL}/trainings`)
            .then(response => response.json())
            .then(data => setTrainings(data._embedded.trainings))
            .catch(error => console.log(error))
    }

    useEffect(fetchTrainings, []);

    return (
        <>
            <h1>Customers</h1>

            <div style={{ height: 700 }}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columnDefs}
                />
            </div>
        </>
    );
}