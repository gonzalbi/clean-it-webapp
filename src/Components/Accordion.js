import React,{useState} from 'react';
import axios from 'axios';

function Accordion(props) {
   // const { title, content } = accordionData;
   const [isActive, setIsActive] = useState(false);
   const [operationData,setOperationData] = useState([])

   const onclick = (opid) => {
        setIsActive(!isActive)
        getOperationData(opid)
   }

   
   const getOperationData = (id) =>{
    axios.get("/getOperationData/"+id).then( (res) => {
        setOperationData(res.data)
    })
    .catch((err) => {
        console.log(err)
    })
}

    return (
        <div>
            <div className="accordion">
                <div className="accordion-item">
                    <div
                    className="accordion-title"
                    onClick={() => onclick(props.operationId)}
                    >
                    <div>{props.title}</div>
                    <div>{isActive ? '-' : '+'}</div>
                    </div>
                        {isActive && <div className="accordion-content">
                        {
                            operationData.map(op => 
                                <div className="operation-contents">
                                    <div className="operation-img">
                                        <img src={window.location+'img/'+op.ImgPath.replace(/\\\\/g, '\\')} alt="img" />
                                    </div>
                                    <div className="operation-info">
                                        <p>Fecha {op.Date}</p>
                                        <p>Puntaje: {op.Score}</p>
                                    </div>
                                </div>
                            )
                        }
                        </div>}
                </div>
            </div>
        </div>
    );
}

export default Accordion;