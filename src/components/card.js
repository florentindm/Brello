import React, { Component } from 'react';
import MaterialIcon, {colorPalette} from 'material-icons-react';
import InputTrigger from './inputTrigger';

class Card extends Component {

  constructor(props) {
    super(props);

    this.state = {
      editable:false
    }
  }

  onContentClick = this.onContentClick.bind(this);
  onChange = this.onChange.bind(this);

  onContentClick(){
    this.setState({editable:true})
  }

  onChange(value){
    this.setState({editable:false})
    this.props.onChange(this.props.i, value)
  }

  render() {

    //Text
    const textDisplay = <p>{this.props.text}</p>;
    const textEditable = <InputTrigger ref="input" defaultValue={this.props.text} onSubmit={this.onChange}/>;

    return (
      <div className="task">
        <div className="content" onClick={this.onContentClick}>
          {(!this.state.editable) ? textDisplay:textEditable}
        </div>
        <div className="actions">
          <button onClick={() => this.props.onRemove(this.props.i)}>
            <MaterialIcon icon="remove"/>
          </button>
        </div>
        
      </div>
    );
  }
}

export default Card;
