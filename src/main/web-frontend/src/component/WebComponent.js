import React, {Component} from 'react';
import "../App.css"

class WebComponent extends Component {
    render() {
        return (
            <div className="jumbotron bg-dark text-white">
                <h1 className="display-4">Welcome to Book Shop</h1>
                <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra
                    attention to featured content or information.</p>
            </div>
        );
    }
}

export default WebComponent;