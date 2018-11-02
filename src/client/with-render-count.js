import React from 'react';

const withRenderCount = (name, Comp) => {
  return class WithRenderComponent extends React.PureComponent {
    constructor(props) {
      super(props);
      this.renderCount = 0;
    }

    render() {
      console.log(`${name}[${this.props.index}]: rendered ${++this.renderCount} times`);
      return <Comp {...this.props}/>;
    }
  }
};
export default withRenderCount;
