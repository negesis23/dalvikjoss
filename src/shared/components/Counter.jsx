import { h, Fragment, Component } from 'nano-jsx';

export class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 10 };
  }
  render() {
    return (
      <div className="counter-wrapper">
        <div className="counter-display">{this.state.count}</div>
        <button className="btn" onClick={() => this.setState({ count: this.state.count + 1 }, true)}>Increment</button>
      </div>
    );
  }
}