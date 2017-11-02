import React from 'react';
import Aux from 'react-aux';
import { Link } from 'react-router-dom';

/**
 * Surveys display list of created surveys.
 */
const Surveys = () => {
  return (
    <Aux>
      <div className="fixed-action-btn">
        <Link
          to="/surveys/new"
          className="btn-floating btn-large waves-effect waves-light red"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    </Aux>
  );
};

export default Surveys;
