import React from "react";

const Inputs = () => {
  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Input</h5>
        </div>
        <div className="card-body">
          <input type="text" className="form-control" placeholder="Input" />
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Textarea</h5>
        </div>
        <div className="card-body">
          <textarea
            className="form-control"
            rows="2"
            placeholder="Textarea"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Inputs;
