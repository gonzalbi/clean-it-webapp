import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button} from '@mui/material';
import axios from 'axios';

function SectorPanel(props) {


    const [sectorName,setSectorName] = useState(props.name ? props.name : null)
    const locationId = props.locationId

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
    

    const saveSector = () => {
        if(locationId){
            try{
                axios.post(`/idga/addSector/${locationId}`,{sectorName})
                    .then( (res) => {
                        props.closeDrawer()
                        props.reloadData()
                    })
                    .catch((err) => {
                        console.log(err)
                        alert(err)
                    })
            }catch{
                alert("Hubo un error agregando el sector")
            }
        }else{
            alert("Hubo un error agregando el sector")
        }
    }   

    return (
        <div className="innerPanel" >
            <ThemeProvider theme={theme}>
                <TextField 
                    label="Nombre Sector"
                    color="secondary"
                    value={sectorName}
                    onChange={(e) => setSectorName(e.target.value)} 
                />
            </ThemeProvider>

            <Button variant="contained" color="success" onClick={saveSector}>Guardar</Button>
        </div>
    )
}

export default SectorPanel;