import React,{useState} from 'react';
import { TextField } from '@mui/material';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button } from '@mui/material';
import axios from 'axios';

function OperationPanel(props) {
  const [operationName,setOperationName] = useState(props.name ? props.name : null)
  const subsectorId = props.subsectorId

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

      const saveOperation = () => {
        if(subsectorId){
            try{
                axios.post(`/idga/addOperation/${subsectorId}`,{operationName})
                    .then( (res) => {
                        props.closeDrawer()
                        props.reloadData()
                    })
                    .catch((err) => {
                        console.log(err)
                        alert(err)
                    })
            }catch{
                alert("Hubo un error agregando la operacion")
            }
        }else{
            alert("Hubo un error agregando la operacion")
        }
    }   

      return (
        <div className="innerPanel" >
            <ThemeProvider theme={theme}>
                <TextField 
                    label="Nombre Operacion"
                    color="secondary"
                    value={operationName}
                    onChange={(e) => setOperationName(e.target.value)} 
                />
            </ThemeProvider>

            <Button variant="contained" color="success" onClick={saveOperation}>Guardar</Button>
        </div>
    )
}

export default OperationPanel;