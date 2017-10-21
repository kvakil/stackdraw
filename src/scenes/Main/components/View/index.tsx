import * as React from 'react';

export default class View extends React.Component {
  render() {
    return (
      <div className="View">
        <div className="ViewControl field is-grouped is-grouped-centered">
        <p className="control is-primary">
          <input className="button" type="button" value="Next" />
        </p>
        <p className="control">
          <input className="button" type="button" value="Prev" />
        </p>
      </div>
      <div className="ViewCanvas">
          <code id="canvas">
            &nbsp;
          </code>
        </div>
      </div>
    );
  }
}
