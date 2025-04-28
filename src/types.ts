export type TCustomer = {
    firstname: string;
    lastname: string;
    streetaddress: string;
    postcode: string;
    city: string;
    email: string;
    phone: string;
}

export type TCustomerLong = {
    firstname: string;
    lastname: string;
    streetaddress: string;
    postcode: string;
    city: string;
    email: string;
    phone: string;
    _links: {
        self: {
            href: string;
        },
        customer: {
            href: string;
        },
        trainings: {
            href: string;
        }
    }
}

export type TAddCustomerProps = {
    addCustomer: (customer: TCustomer) => void;
}

export type TEditCustomerProps = {
    currentCustomer: TCustomerLong;
    editCustomer: (customer: TCustomer, url: string) => void;
}

export type TTraining = {
    date: string;
    duration: string;
    activity: string;
    customer: TCustomer;
}

export type TNewTraining = {
    date: string;
    duration: string;
    activity: string;
    customer: string;
}

export type TAddTrainingProps = {
    customer: TCustomerLong;
    addTraining: (training: TNewTraining) => void;
}