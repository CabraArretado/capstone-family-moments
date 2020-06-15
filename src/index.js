
import React from 'react';
import ReactDOM from 'react-dom';
import FamilyMoments from './FamilyMoments';
import {BrowserRouter as Router} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <Router>
    <FamilyMoments />
  </Router>,
  document.getElementById('root')
);