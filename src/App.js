import { AppBar, Toolbar, Typography } from '@mui/material'
import './App.css'
import Carlist from './components/Carlist'

const App = () => {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Car Shop
          </Typography>
        </Toolbar>
      </AppBar>

      <Carlist />
    </div>
  )
}

export default App
