import React,{useEffect, useState} from 'react';
import CustomTable from '../Tables/CustomTable';
import axios from 'axios';
import { Tooltip,IconButton } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';

function EntregaRopaPanel(props) {
    const sectorId = props.sectorId
    const [operatorsData,setOperatorsData] = useState([])

    const columns = [
        {
            name : "id_operator",
            options : {
                display : false
            }
        },
        {
            name: "name",
            label : "Nombre",
            options : {
                sort: false,
            }
        },
        {
            name: "last_name",
            label : "Apellido",
            options : {
                sort: false,
            }
        },
        {
            name: "Actions",
            options: {
              sort : false,
              customBodyRender: (value, tableMeta, updateValue) => {
                return (
                    <Tooltip title='Subir PDF Entrega de Ropa'>
                        <IconButton color="secondary" onClick={() => (console.log('hola'))}>
                            <FileUploadIcon />
                        </IconButton>
                    </Tooltip>
                );
              }
            }  
        }
    ]

    useEffect(() => {
        const getData = () => {
            axios.get(`/idga/getOperatorsBySector/${sectorId}`)
            .then( (res) => {
                setOperatorsData(res.data)
            })
            .catch((err) => {
                setOperatorsData([])
                console.log(err)
            })
        }

        getData()
    }, [sectorId])


    return (
    <div className="innerPanel" >
        <CustomTable 
            title={`Operarios del Sector: ${props.sectorName}`}
            columns={columns}
            data={operatorsData}
        />
    </div>
    )
}

export default EntregaRopaPanel;