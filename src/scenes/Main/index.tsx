import * as React from 'react';
import Editor from './components/Editor';
import View from './components/View';
import { plaintext } from '../../api/Interpret';
import './styles.css';

interface MainState extends React.ComponentState {
  code: string;
  renders: string[];
}

export default class Main extends React.Component<{}, MainState> {
  constructor(props: {}) {
    super(props);
    this.state = {code: '', renders: []};
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(code: string): void {
    const {text} = plaintext(code);
    this.setState({code: code, renders: text});
  }

  render() {
    return (
      <div className="Main container">
        <div className="columns">
          <div className="column is-half">
            <Editor code={this.state.code} callback={this.handleOnChange} />
          </div>
          <div className="column is-half">
            <View renders={this.state.renders} />
          </div>
        </div>
      </div>
    );
  }
}
