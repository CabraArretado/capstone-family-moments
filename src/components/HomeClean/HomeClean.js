import React from 'react';
import { Jumbotron, Button } from 'reactstrap';
import { Link } from "react-router-dom";

const HomeClean = (props) => {
    return (
        <div>
            <div className="container --yellow-bg">
                <h1 className="--page-title">Welcome to Family Moments!</h1>
                <p className="lead">Looks like you are not linked to any gathering! Create one or join one to enjoy the app!</p>
                <hr className="my-2" />
                <div className="">
                    <div className="">
                        <p className="lead">
                            If you wanna create a new ghatering for your family click in the button bellow!
                        </p>
                        <Link to="/registerevent"><button className="--button">Create a gathering!</button></Link>
                    </div>
                    <hr className="my-2" />
                    <div className="">
                        <p className="lead">
                            If you wanna join in an existent gathering click in the buton bellow!
                        </p>
                        <Link to="/searchevent"><button className="--button">Join in a gathering!</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeClean;