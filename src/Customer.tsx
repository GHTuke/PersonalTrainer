import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react"
import { AllCommunityModule, ColDef, ICellRendererParams, ModuleRegistry } from 'ag-grid-community';

import { BASE_URL } from "./Url";
import { TCustomer, TCustomerLong } from "./types";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import { Button } from "@mui/material";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function Customer() {
    const [customers, setCustomers] = useState([]);

    const [columnDefs] = useState<ColDef<TCustomerLong>[]>([
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
        {
            flex: 0.5,
            cellRenderer: (params: ICellRendererParams<TCustomerLong>) => 
                <EditCustomer
                    currentCustomer={params.data as TCustomerLong}
                    editCustomer={updateCustomer}
                />
        },
        {
            field: '_links.self.href',
            headerName: '',
            flex: 0.6,
            cellRenderer: (params: ICellRendererParams) => {
                return <Button onClick={() => handleDelete(params.value)} color='error'>Delete</Button>
            }
        },
    ]);

    const handleDelete = (url: string) => {
        if (window.confirm('Confirm delete')) {
            deleteCustomer(url);
        }
    }

    // basic get function for customer data
    const fetchCustomers = () => {
        // base url behind gitignore, just testing stuff out
        fetch(`${BASE_URL}/customers`)
            .then(response => response.json())
            .then(data => setCustomers(data._embedded.customers))
            .catch(error => console.log(error))
    }

    // function for PUT used to edit customers
    const updateCustomer = (customer: TCustomer, url: string) => {
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customer)
        };

        fetch(url, options)
            .then(() => fetchCustomers())
            .catch(error => console.log(error))
    }

    useEffect(fetchCustomers, []);

    // function for POST used to add new customers
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

    const deleteCustomer = (url: string) => {
        const options = {
            method: 'DELETE'
        };

        fetch(url, options)
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