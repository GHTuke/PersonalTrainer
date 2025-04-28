import { useState, ChangeEvent, FormEvent } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TEditCustomerProps} from './types';

// Using basic form dialog from MUI materials as basis
// https://mui.com/material-ui/react-dialog/#form-dialogs
export default function EditCustomer({ currentCustomer, editCustomer }: TEditCustomerProps) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({
        firstname: currentCustomer.firstname,
        lastname: currentCustomer.lastname,
        streetaddress: currentCustomer.streetaddress,
        postcode: currentCustomer.postcode,
        city: currentCustomer.city,
        email: currentCustomer.email,
        phone: currentCustomer.phone
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value })
    };

    return (
        <>
            <Button variant="contained" onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        component: 'form',
                        onSubmit: (event: FormEvent<HTMLFormElement>) => {
                            event.preventDefault();
                            editCustomer({
                                ...customer
                            }, currentCustomer._links.self.href)
                            handleClose();
                        },
                    },
                }}
            >
                <DialogTitle>Edit customer</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="firstname"
                        name="firstname"
                        label="First Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        value={customer.firstname}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="lastname"
                        name="lastname"
                        label="Last Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        value={customer.lastname}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="streetaddress"
                        name="streetaddress"
                        label="Street Address"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        value={customer.streetaddress}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="postcode"
                        name="postcode"
                        label="Postal Code"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        value={customer.postcode}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="city"
                        name="city"
                        label="City"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        value={customer.city}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        value={customer.email}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="phone"
                        name="phone"
                        label="Phone"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        value={customer.phone}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}