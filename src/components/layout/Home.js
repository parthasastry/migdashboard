import React, { Component } from 'react';
import { Link } from "react-router-dom";

export class Home extends Component {
    render() {
        return (
            <div className="home">
                    <div className="container">
                        <div className="row">
                            <div className="col s12 m10 offset-m1 center">
                                <h3 className="white-text">Welcome To MyCloud Dashboard</h3>
                                <h1 className="white-text">Migrate to the Cloud</h1>
                                <h5>Cloud computing is computing based on the internet and shifting to the cloud is the best way to ensure your business stays both current and competitive</h5>
                                <br />
                                <Link to="/about" className="waves-effect waves-light btn-large">Learn more ...</Link>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}

export default Home
