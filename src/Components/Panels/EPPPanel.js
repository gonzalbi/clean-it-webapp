import React,{useEffect, useState} from 'react';
import CustomTable from '../Tables/CustomTable';
import axios from 'axios';
import { Tooltip,IconButton, Modal, Box, Typography } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';

function EPPPanel(props) {
    const sectorId = props.sectorId
    const [operatorsData,setOperatorsData] = useState([])
    const [openModal,setOpenModal] = useState(false)

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
                    <Tooltip title='Subir PDF Entrega EPP'>
                        <IconButton color="secondary" onClick={() => (setOpenModal(true))}>
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

    const handleClose = () =>{setOpenModal(false)}

    
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
    <div className="innerPanel" >
        <CustomTable 
            title={`Operarios del Sector: ${props.sectorName}`}
            columns={columns}
            data={operatorsData}
        />
        <Modal
            open={openModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                Cargar entrega de EPP
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>
            </Box>
        </Modal>
    </div>
    )
}

export default EPPPanel;