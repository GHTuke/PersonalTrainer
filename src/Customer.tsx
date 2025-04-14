import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react"
import { AllCommunityModule, ColDef, ModuleRegistry } from 'ag-grid-community';

import { BASE_URL } from "./Url";
import { TCustomer } from "./types";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function Customer() {
    const [customers, setCustomers] = useState([]);

    const [columnDefs] = useState<ColDef<TCustomer>[]>([
        {
            field: "firstname",
            filter: true,
            floatingFilter: true,
            suppressFloatingFilterButton: true,
        },
        {
            field: "lastname",
            filter: true,
            floatingFilter: true,
            suppressFloatingFilterButton: true,
        },
        {
            field: "streetaddress",
            filter: true,
            floatingFilter: true,
            suppressFloatingFilterButton: true,
        },
        {
            field: "postcode",
            filter: true,
            floatingFilter: true,
            suppressFloatingFilterButton: true,
        },
        {
            field: "city",
            filter: true,
            floatingFilter: true,
            suppressFloatingFilterButton: true,
        },
        {
            field: "email",
            filter: true,
            floatingFilter: true,
            suppressFloatingFilterButton: true,
        },
        {
            field: "phone",
            filter: true,
            floatingFilter: true,
            suppressFloatingFilterButton: true,
        },
    ]);

    const fetchCustomers = () => {
        // base url behind gitignore, just testing stuff out
        fetch(`${BASE_URL}/customers`)
            .then(response => response.json())
            .then(data => setCustomers(data._embedded.customers))
            .catch(error => console.log(error))
    }

    useEffect(fetchCustomers, []);

    return (
        <>
            <h1>Customers</h1>

            <div style={{ height: 700 }}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={columnDefs}
                />
            </div>
        </>
    );
}