import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link, Outlet, useRouteError } from "react-router-dom"

export default function Error() {
    const error = useRouteError();
    console.log(error);

    return (
        <>
            <AppBar position="relative">
                <Toolbar>
                    {/* Using muimaterials flexbox to handle the toolbar a bit better 
      Without the flexGrow, header and links get pushed together
      https://mui.com/system/flexbox/#flex-grow */}
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Tuke's Personal training
                    </Typography>
                    {/* Box object to handle the position and look of the links in the toolbar
          Have to set color to inherit, otherwise the color gets set to basic blue*/}
                    <Box sx={{ gap: 2 }}>
                        <Button color="inherit" component={Link} to="/">
                            Customers
                        </Button>
                        <Button color="inherit" component={Link} to="/training">
                            Trainings
                        </Button>
                        <Button color="inherit" component={Link} to="/calendar">
                            Calendar
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Outlet />
            <h1>Page not found</h1>
        </>

    )
}