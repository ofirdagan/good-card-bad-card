import React from 'react';
import ReactDOM from 'react-dom';
import Devtools from './devtools';
import withRenderCount from './with-render-count';

class GoodCardAppRootComponent extends React.Component {
  constructor(props) {
    super(props);
    const cardValues = Array.from({length: 100}).reduce((acc, curr, index) => {
      acc[index] = '';
      return acc;
    }, {});
    this.handleChange = this.handleChange.bind(this);
    this.state = {cardValues, cardsWithValuesCount: 0};
  }

  handleChange({index, text}) {
    const cardValues = Object.assign({}, this.state.cardValues, {[index]: text});
    const cardsWithValuesCount = Object.keys(cardValues).filter(key => cardValues[key]).length;
    this.setState({cardValues, cardsWithValuesCount});
  }

  render() {
    const {cardValues} = this.state;
    const cards = Object.keys(cardValues).map((key, index) => {
      return (
        <Card
          key={index}
          index={index}
          value={cardValues[key]}
          handleChange={this.handleChange}
        />);
    });
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Devtools/>
        <h1>Cards With Values: {this.state.cardsWithValuesCount}</h1>
        <form className={'form'}>
          {cards}
        </form>
      </div>
    );
  }
}

class CardComp extends React.PureComponent {
  render() {
    const {index, value, handleChange} = this.props;
    return (
      <div className={'card'}>
        <CardHeader title={`Card ${index}`}/>
        <CardContent index={index} value={value} handleChange={handleChange}/>
        <CardFooter footNote={`foot note of card ${index}`}/>
      </div>
    );
  }
}

class CardHeaderComp extends React.Component {
  render() {
    const {title} = this.props;
    return (
      <h1>
        {title}
      </h1>
    );
  }
}

class CardContentComp extends React.Component {
  render() {
    const {index, value, handleChange} = this.props;
    return (
      <InputComponent key={index} index={index} value={value} handleChange={handleChange}/>
    );
  }
}

class InputComponentComp extends React.Component {
  doSomeNaiveCalcOnProps(value) {
    return value.split('').map(char => char).join('');
  }

  render() {
    const {index, value, handleChange} = this.props;
    const calculatedValue = this.doSomeNaiveCalcOnProps(value);
    return (
      <div>
        <input value={calculatedValue} onChange={(event) => handleChange({text: event.target.value, index})}/>
        <GrandChild hasValue={!!calculatedValue} index={index}/>
      </div>
    );
  }
}

class GrandChildComp extends React.Component {
  render() {
    const {hasValue} = this.props;
    const text = hasValue ? 'has value' : '';
    return (
      <div>
        {text}
      </div>
    );
  }
}

class CardFooterComp extends React.Component {
  render() {
    const {footNote} = this.props;
    return (
      <h4>
        {footNote}
      </h4>
    );
  }
}

const Card = withRenderCount('Card', CardComp);
const CardHeader = withRenderCount('CardHeader', CardHeaderComp);
const CardFooter = withRenderCount('CardFooter', CardFooterComp);
const CardContent = withRenderCount('CardContent', CardContentComp);
const GrandChild = withRenderCount('GrandChild', GrandChildComp);
const InputComponent = withRenderCount('InputComponent', InputComponentComp);
const GoodCardAppRoot = withRenderCount('GoodCardAppRootComponent', GoodCardAppRootComponent);

ReactDOM.render(
  <GoodCardAppRoot/>,
  document.getElementById('root')
);

