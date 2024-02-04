import React from "react";

const Selects = () => {
  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Selects</h5>
        </div>
        <div className="card-body">
          <select className="form-select mb-3">
            <option selected>Open this select menu</option>
            <option>One</option>
            <option>Two</option>
            <option>Three</option>
          </select>

          <select multiple className="form-control">
            <option>One</option>
            <option>Two</option>
            <option>Three</option>
            <option>Four</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Selects;
