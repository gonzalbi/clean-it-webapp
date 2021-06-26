import React,{useState} from 'react';

function Accordion(props) {
   // const { title, content } = accordionData;
   const [isActive, setIsActive] = useState(false);



    return (
        <div>
            <h1>React Accordion Demo</h1>
            <div className="accordion">
                <div className="accordion-item">
                    <div
                    className="accordion-title"
                    onClick={() => setIsActive(!isActive)}
                    >
                    <div>{props.title}</div>
                    <div>{isActive ? '-' : '+'}</div>
                    </div>
                    {isActive && <div className="accordion-content">{props.content}</div>}
                </div>
            </div>
        </div>
    );
}

export default Accordion;