export type TCustomer = {
    firstname: string;
    lastname: string;
    streetaddress: string;
    postcode: string;
    city: string;
    email: string;
    phone: string;
}

export type TAddCustomerProps = {
    addCustomer: (customer: TCustomer) => void;
}

export type TTraining = {
    date: string;
    duration: string;
    activity: string;
    customer: TCustomer;
}