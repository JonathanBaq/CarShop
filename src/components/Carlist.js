import React, { useState, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import AddCar from './AddCar'
import EditCar from './EditCar'

const Carlist = () => {
  const [cars, setCars] = useState([])
  const [open, setOpen] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    fetchCars()
  }, [])

  const fetchCars = () => {
    fetch('http://carrestapi.herokuapp.com/cars')
      .then((response) => response.json())
      .then((data) => setCars(data._embedded.cars))
      .catch((error) => console.error(error))
  }

  const handleClose = () => {
    setOpen(false)
  }

  const deleteCar = url => {
    if (window.confirm('Confirm delete?')) {
      fetch(url, { method: 'DELETE' })
        .then(response => {
          if (response.ok) {
            setMsg('Car deleted')
            setOpen(true)
            fetchCars()
          } else {
            alert('Error')
          }
        })
        .catch(error => console.error(error))
    }
  }

  const addCar = car => {
    fetch('http://carrestapi.herokuapp.com/cars', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(car)
    })
      //Check response in final task! : what code, etc
      .then(response => {
        if (response.ok) {
          setMsg('Car added')
          setOpen(true)
          fetchCars()
        } else {
          alert('Error')
        }
      })
      .catch(error => console.error(error))
  }

  const editCar = (url, car) => {
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(car)
    })
    .then(response => {
      if (response.ok) {
        setMsg('Car edited')
        setOpen(true)
        fetchCars()
      } else {
        alert('Error')
      }
    })
    .catch(error => console.error(error))
  }

  const columns = [
    { field: 'brand', sortable: true, filter: true },
    { field: 'model', sortable: true, filter: true },
    { field: 'color', sortable: true, filter: true },
    { field: 'fuel', width: 100, sortable: true, filter: true },
    { field: 'year', width: 100, sortable: true, filter: true },
    { field: 'price', width: 100, sortable: true, filter: true },
    {
      headerName: '',
      sortable: false,
      filter: false,
      width: 120,
      field: '_links.self.href',
      cellRendererFramework: (params) => <EditCar row={params} editCar={editCar} />
    },
    {
      headerName: '',
      sortable: false,
      filter: false,
      width: 120,
      field: '_links.self.href',
      cellRendererFramework: (params) => (
        <Button
          color='error'
          onClick={() => deleteCar(params.value)}>Delete</Button>
      )
    },
  ]

  return (
    <div style={{marginTop: 20}}>
      <AddCar addCar={addCar} />
      <div className="ag-theme-material" style={{ marginTop: 20, height: 600, width: '90%', margin: 'auto' }}>
        <AgGridReact
          rowData={cars}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={10}
          suppressCellSelection={true}
        >
        </AgGridReact>
      </div>
      <Snackbar
        open={open}
        message={msg}//we can use state for message to show different messages at diff places, eg. errors
        autoHideDuration={4000}
        onClose={handleClose}
      />
    </div>
  )
}

export default Carlist