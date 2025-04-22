import { Link, Outlet } from 'react-router-dom'
import AppBar from "@mui/material/AppBar"
import './App.css'
import { Box, Button, Toolbar, Typography } from '@mui/material'

function App() {
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
          </Box>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  )
}

export default App
