import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button} from '@mui/material';
import axios from 'axios';

function LocationPanel(props) {


    const [locationName,setLocationName] = useState(props.name ? props.name : null)

    const theme = createTheme({
        components: {
          MuiInputBase: {
            styleOverrides: {
              root: {
                color: 'white',
              },
            },
          },
          MuiInputLabel: {
            styleOverrides: {
                root: {
                  color: '#acacac',
                },
              },
          },
          MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: {
                    borderColor: '#acacac',
                },
            },
          }
        },
      });
    

    const saveLocation = () => {
      try{
          axios.post(`/idga/addLocation/`,{locationName})
              .then( (res) => {
                  props.closeDrawer()
                  props.reloadData()
              })
              .catch((err) => {
                  console.log(err)
                  alert(err)
              })
      }catch{
          alert("Hubo un error agregando la locacion")
      }
    }
    

    return (
        <div className="innerPanel" >
            <ThemeProvider theme={theme}>
                <TextField 
                    label="Nombre Locacion"
                    color="secondary"
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)} 
                />
            </ThemeProvider>

            <Button variant="contained" color="success" onClick={saveLocation}>Guardar</Button>
        </div>
    )
}

export default LocationPanel;