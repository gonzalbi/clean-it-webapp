import React,{useEffect, useState} from 'react';
import CustomTable from '../Tables/CustomTable';
import axios from 'axios';
import { Tooltip,IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';


function ManageOperationPanel(props) {
    const subsectorId = props.subsectorId
    const [operationData,setOperationData] = useState([])

    const columns = [
        {
            name : "id_operation",
            options : {
                display : false
            }
        },
        {
            name: "name",
            sort: false,
            label : "Operacion"
        },
        {
            name: "Actions",
            options: {
              sort : false,
              customBodyRender: (value, tableMeta, updateValue) => {
                return (
                    <Tooltip title='Editar Operacion'>
                        <IconButton color="secondary" onClick={() => (console.log('hola'))}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                );
              }
            }  
        }
    ]

    useEffect(() => {
        const getData = () => {
            axios.get(`/idga/getOperations/${subsectorId}`)
            .then( (res) => {
                setOperationData(res.data)
            })
            .catch((err) => {
                setOperationData([])
                console.log(err)
            })
        }

        getData()
    }, [subsectorId])


    return (
    <div className="innerPanel" >
        <CustomTable 
            title={"Operaciones"}
            columns={columns}
            data={operationData}
        />
    </div>
    )
}

export default ManageOperationPanel;