import React from 'react';
import { Link } from "react-router-dom";

const Welcome = (props) => {
    return (
        <>
                <h1 className="--page-title">Welcome to Family Moments!</h1>
                <p className="--superbold">Family gatherings made easy</p>
                <hr className="my-2" />

                <div className="form-row">
                    <div className="col --yellow-bg container p-2">
                        <p className="--superbold">
                            Are you new here?
                        </p>
                        <Link to="/register"><button className="--button">Register</button></Link>
                    </div>
                    <div className="col --yellow-bg container p-2">
                        <p className="--superbold">
                            Already have an account?
                        </p>
                        <Link to="/login"><button className="--button">Login</button></Link>
                    </div>
                </div>
        </>
    );
};

export default Welcome;