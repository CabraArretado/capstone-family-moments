import React from 'react';
import { Jumbotron, Button } from 'reactstrap';
import { Link } from "react-router-dom";

const Welcome = (props) => {
    return (
        <>
                <h1 className="--page-title">Welcome to Family Moments!</h1>
                <p className="lead">Family gatherings made easy</p>
                <hr className="my-2" />

                <div className="form-row">
                    <div className="col --yellow-bg">
                        <p className="--superbold">
                            Are you new here?
                        </p>
                        <Link to="/register"><Button color="dark">Register</Button></Link>
                    </div>
                    <div className="col --yellow-bg">
                        <p className="lead">
                            Already have an account?
                        </p>
                        <Link to="/login"><Button color="dark">Login</Button></Link>
                    </div>
                </div>
        </>
    );
};

export default Welcome;