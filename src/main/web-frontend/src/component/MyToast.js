import React, {Component} from 'react';
import {Toast} from "react-bootstrap";

class MyToast extends Component {
    render() {

        const toastStyle = {
            position: "fixed",
            top:'20px',
            right: "20px",
            zIndex:"1",
            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.3)"
        }

        return (
            <>
            <div style={this.props.show ? toastStyle : {"display":"none"}}>
                <Toast className={`"border text-white " ${this.props.type === "success" ? " border-success bg-success" : " border-danger bg-danger"} `} show={this.props.show}>
                    <Toast.Header className={`" text-white " ${this.props.type === "success" ? " bg-success " :" bg-danger " }`} closeButton={false}>
                        <strong className={"mr-auto"}>Success</strong>
                    </Toast.Header>
                    <Toast.Body>
                        {this.props.message}
                    </Toast.Body>
                </Toast>
            </div>
            <div style={this.props.error ? toastStyle : {"display":"none"}}>
                <Toast className={"border text-white border-danger bg-danger"} error={this.props.error}>
                    <Toast.Header className={"text-white  bg-danger "} closeButton={false}>
                        <strong className={"mr-auto"}>Error</strong>
                    </Toast.Header>
                    <Toast.Body>
                        {this.props.message}
                    </Toast.Body>
                </Toast>
            </div>
        </>
        );
    }
}

export default MyToast;