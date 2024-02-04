import React from "react";

const RadioButtons = () => {
  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Radios</h5>
        </div>
        <div className="card-body">
          <div>
            <label className="form-check">
              <input
                className="form-check-input"
                type="radio"
                value="option1"
                name="radios-example"
                checked
              />
              <span className="form-check-label">
                Option one is this and that&mdash;be sure to include why it's
                great
              </span>
            </label>
            <label className="form-check">
              <input
                className="form-check-input"
                type="radio"
                value="option2"
                name="radios-example"
              />
              <span className="form-check-label">
                Option two can be something else and selecting it will deselect
                option one
              </span>
            </label>
            <label className="form-check">
              <input
                className="form-check-input"
                type="radio"
                value="option3"
                name="radios-example"
                disabled
              />
              <span className="form-check-label">Option three is disabled</span>
            </label>
          </div>
          <div>
            <label className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inline-radios-example"
                value="option1"
              />
              <span className="form-check-label">1</span>
            </label>
            <label className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inline-radios-example"
                value="option2"
              />
              <span className="form-check-label">2</span>
            </label>
            <label className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inline-radios-example"
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

export default RadioButtons;
