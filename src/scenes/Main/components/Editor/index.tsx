import * as React from 'react';
import './styles.css';

export default class Editor extends React.Component {
  render() {
    return (
      <div className="Editor">
        <div className="field is-grouped is-grouped-right">
          <p className="control">
            <input className="button is-primary" type="button" value="Render" />
          </p>
        </div>
        <textarea />
      </div>
    );
  }
}
