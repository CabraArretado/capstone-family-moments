import React from 'react';
import { Jumbotron, Button } from 'reactstrap';
import { Link } from "react-router-dom";

const Home = (props) => {
    return (
        <div>
            <Jumbotron className="container mt-5">
                <h1 className="display-3">Welcome to Family Moments!</h1>
                <p className="lead">Family gatherings made easy</p>
                <hr className="my-2" />

                <div className="form-row">
                    <div className="col">
                        <p className="lead">
                            Are you new here?
                        </p>
                        <Link to="/register"><Button color="dark">Register</Button></Link>
                    </div>
                    <div className="col">
                        <p className="lead">
                            Already have a account?
                        </p>
                        <Link to="/login"><Button color="dark">Login</Button></Link>
                    </div>
                </div>
            </Jumbotron>
        </div>
    );
};

export default Home;