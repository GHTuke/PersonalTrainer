import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react"
import { AllCommunityModule, ColDef, ModuleRegistry } from 'ag-grid-community';

import { BASE_URL } from "./Url";
import { TCustomer } from "./types";
import AddCustomer from "./AddCustomer";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function Customer() {
    const [customers, setCustomers] = useState([]);

    const [columnDefs] = useState<ColDef<TCustomer>[]>([
        {
            field: "firstname",
            headerName: "First name",
            flex: 1,
            filter: true,
            floatingFilter: true,
            suppressFloatingFilterButton: true,
        },
        {
            field: "lastname",
            headerName: "Last name",
            flex: 1,
            filter: true,
            floatingFilter: true,
            suppressFloatingFilterButton: true,
        },
        {
            field: "streetaddress",
            headerName: "Address",
            flex: 1,
            filter: true,
            floatingFilter: true,
            suppressFloatingFilterButton: true,
        },
        {
            field: "postcode",
            headerName: "Postcode",
            flex: 0.6,
            filter: true,
            floatingFilter: true,
            suppressFloatingFilterButton: true,
        },
        {
            field: "city",
            headerName: "City",
            flex: 1,
            filter: true,
            floatingFilter: true,
            suppressFloatingFilterButton: true,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
            filter: true,
            floatingFilter: true,
            suppressFloatingFilterButton: true,
        },
        {
            field: "phone",
            headerName: "Phonenumber",
            flex: 1,
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

    const addCustomer = (car: TCustomer) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(car)
        };

        fetch(`${BASE_URL}/customers`, options)
            .then(() => fetchCustomers())
            .catch(error => console.log(error))
    }

    return (
        <>
            <h1>Customers</h1>
            <AddCustomer addCustomer={addCustomer} />
            <div style={{ height: 700 }}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={columnDefs}
                />
            </div>
        </>
    );
}