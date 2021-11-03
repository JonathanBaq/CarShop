import React, { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

const AddCar = (props) => {
  const [open, setOpen] = useState(false)
  const [car, setCar] = useState({
    brand:'',
    model:'',
    color:'',
    fuel:'',
    year:'',
    price:'',
  })
  
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleInputChange = event => {
    setCar({...car, [event.target.name]: event.target.value})
  }

  const handleSave = () => {
    props.addCar(car)
    handleClose()
    setCar({
      brand:'',
      model:'',
      color:'',
      fuel:'',
      year:'',
      price:'',
    })
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Car
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            margin="dense"
            name='brand'
            value={car.brand}
            onChange={handleInputChange}
            label="Brand"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name='model'
            value={car.model}
            onChange={handleInputChange}
            label="Model"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name='color'
            value={car.color}
            onChange={handleInputChange}
            label="Color"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name='fuel'
            value={car.fuel}
            onChange={handleInputChange}
            label="Fuel"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name='year'
            value={car.year}
            onChange={handleInputChange}
            label="Year"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name='price'
            value={car.price}
            onChange={handleInputChange}
            label="Price"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddCar