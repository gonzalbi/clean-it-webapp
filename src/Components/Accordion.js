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
                                    <div className="operation-header">
                                        <p>Fecha {op.op_date}</p>
                                        <p>Puntaje: {op.op_score}</p>
                                    </div>
                                    <div className="operation-img">
                                        <img src="https://i1.wp.com/tecnoversia.com/wp-content/uploads/sites/2/2018/11/Apple-Store.jpg?ssl=1" alt="img" />
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