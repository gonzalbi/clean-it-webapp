import React from 'react';
import MUIDataTable from 'mui-datatables'
import { createTheme, ThemeProvider } from "@mui/material/styles";


function CustomTable(props) {

  const options = {
    download: false,
    print : false,
    viewColumns: false,
    filter : false,
    selectableRows: 'none',
    enableNestedDataAccess: '.',
    tableBodyHeight: '600px',
    tableBodyMaxHeight : '600px'    
  };

    const theme = () => createTheme({
        components: {
            MuiPaper: {
                styleOverrides:{
                    root: {
                        backgroundColor: "#14213d",
                        color : "#fff"
                    }
                }
            },
            MuiTableCell: {
                styleOverrides:{
                    root: {
                        backgroundColor: "#14213d",
                        borderBottomColor: "#5f5f7a",
                        color : "#fff",
                        verticalAlign: "top",
                        width: "fit-content"
                    }
                }
            },
            MUIDataTableHeadCell: {
                styleOverrides :{
                    root : {
                        sortActive: {
                            '& path': {
                              color: "white" // or whatever you need
                            }, 
                        }, 
                    }
                }
            },
        },
    });

  return (
          <ThemeProvider theme={theme()}>
            <MUIDataTable 
              title={props.title}
              data={props.data}
              columns = {props.columns}
              options={options}
              />
          </ThemeProvider>
  );
}

export default CustomTable;