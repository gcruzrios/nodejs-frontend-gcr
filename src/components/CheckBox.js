import React from "react";

const CheckBox = () => {
  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Checkboxes</h5>
        </div>
        <div className="card-body">
          <div>
            <label className="form-check">
              <input className="form-check-input" type="checkbox" value="" />
              <span className="form-check-label">
                Option one is this and that&mdash;be sure to include why it's
                great
              </span>
            </label>
            <label className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                disabled
              />
              <span className="form-check-label">Option two is disabled</span>
            </label>
          </div>
          <div>
            <label className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                value="option1"
              />
              <span className="form-check-label">1</span>
            </label>
            <label className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                value="option2"
              />
              <span className="form-check-label">2</span>
            </label>
            <label className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                value="option3"
                disabled
              />
              <span className="form-check-label">3</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckBox;
