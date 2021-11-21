import React, {useEffect, useState} from 'react';
import {Col, Container, Navbar} from "react-bootstrap";
import {faAt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function PhotoPadFooter() {
    const [fullYear, setFullYear] = useState();

    useEffect(() => {
       setFullYear(new Date().getFullYear());
    }, [fullYear]);

    return (
        <Navbar fixed="bottom" style={{"backgroundColor": "#47403d"}} variant="light">
            <Container>
                <Col md={12} className="text-center text-white" sm={12}>
                    <div>
                        {fullYear} - {fullYear+1} <FontAwesomeIcon icon={faAt}/> All Rights Reserved by PhotoPad
                    </div>
                </Col>
            </Container>
        </Navbar>
    );
};