import React from 'react';

export default ({ surveys }) => {
  if (!surveys) {
    return <h3>No surveys</h3>;
  }

  return surveys.map(({ _id, title, body, no, yes, dateSent }) => {
    return (
      <div className="card" key={_id}>
        <div className="card-content">
          <p className="card-title">{title}</p>
          <p>{body}</p>
        </div>
        <div className="card-action clearfix">
          <div className="left">
            <a>Yes: {yes}</a>
            <a>No: {no}</a>
          </div>
          <div className="right">
            Sent on: {new Date(dateSent).toLocaleDateString()}
          </div>
        </div>
      </div>
    );
  });
};
