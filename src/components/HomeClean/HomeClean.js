import React from 'react';
import { Jumbotron, Button } from 'reactstrap';
import { Link } from "react-router-dom";

const HomeClean = (props) => {
    return (
        <div>
            <Jumbotron className="container mt-5">
                <h1 className="display-3">Welcome to Family Moments!</h1>
                <p className="lead">Looks like you are not linked to any gathering! Create one or join one to enjoy the app!</p>
                <hr className="my-2" />
                <div className="">
                    <div className="">
                        <p className="lead">
                            If you wanna create a new ghatering for your family click in the button bellow!
                        </p>
                        <Link to="TODO"><Button color="dark">Create a gathering!</Button></Link>
                    </div>
                    <hr className="my-2" />
                    <div className="">
                        <p className="lead">
                            If you wanna join in an existent gathering click in the buton bellow!
                        </p>
                        <Link to="TODO"><Button color="dark">Join in a gathering!</Button></Link>
                    </div>
                </div>
            </Jumbotron>
        </div>
    );
};

export default HomeClean;