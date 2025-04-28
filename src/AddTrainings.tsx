import { useState, ChangeEvent, FormEvent } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TAddTrainingProps } from './types';
import { FormControl, Input, InputLabel } from '@mui/material';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

// Using basic form dialog from MUI materials as basis
// https://mui.com/material-ui/react-dialog/#form-dialogs
export default function AddTrainings({ customer, addTraining }: TAddTrainingProps) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        date: "",
        duration: "",
        activity: "",
        customer: customer._links.self.href,
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // handles the datechange in form
    const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        const localDate = event.target.value;
        setTraining({ ...training, date: localDate });
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTraining({ ...training, [event.target.name]: event.target.value })
    };

    // handleSubmit to make the submit form clearer in Dialog
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // formats the date to utc at submit as datetime-local was giving issues with +9 timezone
        const formattedDate = dayjs(training.date).utc().format();
        addTraining({
            ...training,
            date: formattedDate,
        });
        handleClose();
    };

    return (
        <>
            <Button variant="contained" onClick={handleClickOpen}>
                Add training
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        component: 'form',
                        onSubmit: handleSubmit,
                    },
                }}
            >
                <DialogTitle>Add new training</DialogTitle>
                <DialogContent>
                    {/* Had to switch to formcontrol to get rid of Date label on top of input
                    needed InputLabel but it was depreceated on Textfield
                    https://mui.com/material-ui/api/form-control/ */}
                    <FormControl fullWidth variant="standard" margin="dense">
                        <InputLabel shrink htmlFor="date">
                            Date
                        </InputLabel>
                        <Input
                            id="date"
                            name="date"
                            type="datetime-local"
                            value={training.date}
                            onChange={handleDateChange}
                            fullWidth
                        />
                    </FormControl>
                    <TextField
                        required
                        margin="dense"
                        id="duration"
                        name="duration"
                        label="Duration (minutes)"
                        type="number"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        value={training.duration}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="activity"
                        name="activity"
                        label="Activity"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        value={training.activity}
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