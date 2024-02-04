import React from "react";

const FormSelects = () => {
  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Disabled</h5>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">Disabled input</label>
            <input
              type="text"
              className="form-control"
              placeholder="Disabled input"
              disabled
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Disabled select menu</label>
            <select className="form-control" disabled>
              <option>Disabled select</option>
            </select>
          </div>
          <label className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              disabled
            />
            <span className="form-check-label">Can't check this</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default FormSelects;
