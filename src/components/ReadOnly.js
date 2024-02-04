import React from "react";

const ReadOnly = () => {
  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Read only</h5>
        </div>
        <div className="card-body">
          <input
            className="form-control"
            type="text"
            placeholder="Readonly input"
            readonly
          />
        </div>
      </div>
    </div>
  );
};

export default ReadOnly;
