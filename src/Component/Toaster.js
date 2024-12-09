import { useEffect, useState } from "react";
import { Toast } from 'react-bootstrap';


export default function Toaster({header, body, show, color}){

    const [showPop, setShowPop] = useState(show);

    useEffect(() =>{
        setShowPop(show);
    },[show]);

    if(!showPop) return;

    return (
        <Toast style={{position: "fixed"}} className="to-front" bg={color} onClose={() => setShowPop(false)} show={show} delay={3000} autohide>
            <Toast.Header>
                <strong className="me-auto">{header}</strong>
            </Toast.Header>
            <Toast.Body>
                {body}
            </Toast.Body>
        </Toast>
    );
}

