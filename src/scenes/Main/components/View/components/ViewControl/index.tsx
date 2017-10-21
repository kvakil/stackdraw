import * as React from 'react';

export default class ViewControl extends React.Component {
  render() {
    return (
      <div className="ViewControl field is-grouped is-grouped-centered">
        <p className="control">
          <input className="button is-primary" type="button" value="Render" />
        </p>
        <p className="control">
          <input className="button" type="button" value="Next" />
        </p>
        <p className="control">
          <input className="button" type="button" value="Prev" />
        </p>
      </div>
    );
  }
}
