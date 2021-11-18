import React from 'react';
import {Alert} from "react-bootstrap";
import accessKey from "../../../src/utilities/accessKey";

export default function PhotoPadWelcome(props) {
    if (localStorage.access_key) {
        accessKey(localStorage.access_key);
    }

    return (
        <Alert variant="primary" className="text-dark">
            <Alert.Heading>{props.title}</Alert.Heading>
            <blockquote className="blockquote mb-0">
                <p>
                    "{props.msg}"
                </p>
                <hr />
                <footer className="blockquote-footer text-dark">
                    {props.footer}
                </footer>
            </blockquote>
        </Alert>
    );
}