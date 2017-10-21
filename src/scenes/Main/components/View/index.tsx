import * as React from 'react';

interface ViewProps extends React.Props<{}> {
  renders: string[];
}

interface ViewState extends React.ComponentState {
  currentFrame: number;
}

export default class View extends React.Component<ViewProps, ViewState> {
  constructor(props: ViewProps) {
    super(props);
    this.state = {currentFrame: 0};
  }

  drawCanvas(): string {
    if (this.state.currentFrame < 0 ||
        this.state.currentFrame >= this.props.renders.length) {
      return '';
    }
    return this.props.renders[this.state.currentFrame];
  }

  changeFrame(offset: number) {
    let newFrame = this.state.currentFrame + offset;
    if (newFrame < 0) {
      newFrame = 0;
    }
    if (newFrame >= this.props.renders.length) {
      newFrame = this.props.renders.length - 1;
    }
    this.setState({currentFrame: newFrame});
  }

  getCurrentFrameDisplay(): string {
    return `${this.state.currentFrame + 1}/${this.props.renders.length}`;
  }

  render() {
    return (
      <div className="View">
        <div className="ViewControl field has-addons is-grouped is-grouped-centered">
          <p className="control">
            <input className="button" type="button" value="Prev" onClick={() => this.changeFrame(-1)} />
          </p>
          <p className="control">
            <label className="label">
              {this.getCurrentFrameDisplay()}
            </label>
          </p>
          <p className="control">
            <input className="button" type="button" value="Next" onClick={() => this.changeFrame(1)} />
          </p>
        </div>
        <div className="ViewCanvas">
          <textarea id="canvas" value={this.drawCanvas()} />
        </div>
      </div>
    );
  }
}
