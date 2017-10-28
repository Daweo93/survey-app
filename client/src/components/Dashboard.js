import React from 'react';
import Aux from 'react-aux';
const Dashboard = () => {
  return (
    <Aux>
      <h1>Dawcio</h1>
      <div className="fixed-action-btn">
        <a className="btn-floating btn-large waves-effect waves-light red">
          <i className="material-icons">add</i>
        </a>
      </div>
    </Aux>
  );
};

export default Dashboard;
