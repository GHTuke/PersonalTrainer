import { useState, ChangeEvent, FormEvent } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TAddCustomerProps} from './types';

// Using basic form dialog from MUI materials as basis
// https://mui.com/material-ui/react-dialog/#form-dialogs

// TAddCustomerProps added to types to get rid of type any warning
export default function AddCustomer({ addCustomer }: TAddCustomerProps) {
    const [open, setOpen] = useState(false);
    // preset data as empty strings
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
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
            <Button variant="outlined" onClick={handleClickOpen}>
                Add customer
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        component: 'form',
                        // on submit use addCustomer function to POST data to database
                        onSubmit: (event: FormEvent<HTMLFormElement>) => {
                            event.preventDefault();
                            addCustomer({
                                ...customer
                            })
                            handleClose();
                        },
                    },
                }}
            >
                <DialogTitle>Add customer</DialogTitle>
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