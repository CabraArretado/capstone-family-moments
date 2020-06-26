import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";

import {
    Jumbotron,
    Button,
    Form,
    FormGroup,
    Input
} from 'reactstrap';

import { getStorageSession } from "../Helpers"

const NavBar = () => {
    let session = getStorageSession()

    return <>
    <Link to="/home"><Button>Home</Button></Link>
    { (session.participationStatus === 1 || session.participationStatus === 2) && <Link to="/news"><Button>News Feed</Button></Link>}
    { session.participationStatus === 1 && <Link to="/requestlist"><Button>Request Participation List</Button></Link>}
    {/* { session.participationStatus === 0 && <Link to="/searchevent"><Button>Home</Button></Link>} */}
    </>
}

export default NavBar