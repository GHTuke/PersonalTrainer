import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react"
import { AllCommunityModule, ColDef, ICellRendererParams, ModuleRegistry } from 'ag-grid-community';

import { BASE_URL } from "./Url";
import { TCustomer, TCustomerLong, TNewTraining } from "./types";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import { Box, Button } from "@mui/material";
import AddTrainings from "./AddTrainings";
import { saveAs } from 'file-saver';

ModuleRegistry.registerModules([AllCommunityModule]);

export default function Customer() {
    const [customers, setCustomers] = useState([]);

    // columndefinitions for ag grid
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
            headerName: "Phone",
            flex: 1,
            filter: true,
            floatingFilter: true,
            suppressFloatingFilterButton: true,
        },
        {
            flex: 1,
            cellRenderer: (params: ICellRendererParams<TCustomerLong>) =>
                <EditCustomer
                    currentCustomer={params.data as TCustomerLong}
                    editCustomer={updateCustomer}
                />
        },
        {
            field: '_links.self.href',
            headerName: '',
            flex: 1,
            cellRenderer: (params: ICellRendererParams) => {
                return <Button onClick={() => handleDelete(params.value)} color='error'>Delete</Button>
            }
        },
        {
            cellRenderer: (params: ICellRendererParams<TCustomerLong>) =>
                params.data ? (
                    <AddTrainings
                        customer={params.data}
                        addTraining={addTraining}
                    />
                ) : null,
        },
    ]);

    // function to POST a new training
    const addTraining = (newTraining: TNewTraining) => {
        fetch(`${BASE_URL}/trainings`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTraining),
        })
            .then(response => {
                return response.json();
            })
            .catch(error => console.log(error))
    }

    // very basic confirmation window for deleting customer
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

    // used file-saver https://www.npmjs.com/package/file-saver for easier saveAs
    const exportToCSV = () => {
        const headers = [
            "First name",
            "Last name",
            "Address",
            "Postcode",
            "City",
            "Email",
            "Phone",
            "Link"
        ]

        const rows = customers.map((customer: TCustomerLong) => [
            customer.firstname,
            customer.lastname,
            customer.streetaddress,
            customer.postcode,
            customer.city,
            customer.email,
            customer.phone,
            customer._links.self.href
        ])

        // csv content pulled from https://dev.to/graciesharma/implementing-csv-data-export-in-react-without-external-libraries-3030
        const csvContent = [
            headers.join(","),
            ...rows.map(row => row.join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        saveAs(blob, "customers.csv");
    }

    return (
        <>
            <h1>Customers</h1>
            {/* box added to add margins around Buttons */}
            <Box justifyContent="center" display="flex" gap={2} mb={2}>
                <AddCustomer addCustomer={addCustomer} />
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={exportToCSV}
                >Export Customers</Button>
            </Box>
            {/* rowHeight fixes Button object height issues in rows */}
            <div style={{ height: 700 }}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={columnDefs}
                    rowHeight={46}
                />
            </div>
        </>
    );
}