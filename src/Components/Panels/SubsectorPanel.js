import React,{useState} from 'react';
import { TextField } from '@mui/material';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button } from '@mui/material';
import axios from 'axios';

function SubsectorPanel(props) {
  const [subsectorName,setSubsectorName] = useState(props.name ? props.name : null)
  const sectorId = props.sectorId

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

      const saveSubsector = () => {
        if(sectorId){
            try{
                axios.post(`/idga/addSubsector/${sectorId}`,{subsectorName})
                    .then( (res) => {
                        props.closeDrawer()
                        props.reloadData()
                    })
                    .catch((err) => {
                        console.log(err)
                        alert(err)
                    })
            }catch{
                alert("Hubo un error agregando el subsector")
            }
        }else{
            alert("Hubo un error agregando el subsector")
        }
    }   

      return (
        <div className="innerPanel" >
            <ThemeProvider theme={theme}>
                <TextField 
                    label="Nombre Subsector"
                    color="secondary"
                    value={subsectorName}
                    onChange={(e) => setSubsectorName(e.target.value)} 
                />
            </ThemeProvider>

            <Button variant="contained" color="success" onClick={saveSubsector}>Guardar</Button>
        </div>
    )
}

export default SubsectorPanel;