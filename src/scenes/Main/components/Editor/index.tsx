import * as React from 'react';
import './styles.css';

interface EditorProps extends React.Props<{}> {
  code: string;
  callback: (newCode: string) => void;
}

export default class Editor extends React.Component<EditorProps> {
  constructor(props: EditorProps) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    const code = e.target.value;
    this.props.callback(code);
  }

  render() {
    return (
      <div className="Editor">
        <div className="field is-grouped is-grouped-right">
          <p className="control">
            <input className="button is-primary" type="button" value="Render" />
          </p>
        </div>
        <textarea
          className="textarea is-primary is-medium"
          placeholder="Enter stackdraw code here"
          value={this.props.code}
          onChange={this.handleOnChange}
        />
      </div>
    );
  }
}
