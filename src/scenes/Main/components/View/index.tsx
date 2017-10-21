import * as React from 'react';
import ViewControl from './components/ViewControl';
import ViewCanvas from './components/ViewCanvas';

export default class View extends React.Component {
  render() {
    return (
      <div className="View">
        <ViewControl />
        <ViewCanvas />
      </div>
    );
  }
}
