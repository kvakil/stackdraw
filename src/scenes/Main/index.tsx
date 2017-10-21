import * as React from 'react';
import Editor from './components/Editor';
import View from './components/View';
import './styles.css';

export default class Main extends React.Component {
  render() {
    return (
      <div className="Main container">
        <div className="columns">
          <div className="column is-half">
            <Editor />
          </div>
          <div className="column is-half">
            <View />
          </div>
        </div>
      </div>
    );
  }
}
