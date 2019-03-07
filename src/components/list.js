import React, { Component } from 'react';
import Card from './card.js';
import InputTrigger from './inputTrigger.js';
import MaterialIcon, {colorPalette} from 'material-icons-react';

class List extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      editableTitle:false
    }
  }


  //List bindings
  onListNameClick = this.onListNameClick.bind(this);
  onListNameChange = this.onListNameChange.bind(this);
  onListRemove = this.onListRemove.bind(this);

  //Card bindings
  onAddCard = this.onAddCard.bind(this);
  onCardRemoved = this.onCardRemoved.bind(this);
  onCardChanged = this.onCardChanged.bind(this);

  //List events
  onListRemove(i){
    this.props.onListRemove(i)
  }

  onListNameClick(){
    this.setState({editableTitle:true})
  }

  onListNameChange(value){
    console.log('onTitleChange', value)
    this.setState({editableTitle:false})
    this.props.onListNameChange(value);
  }

  //Cards events
  onAddCard(text){
    this.props.onAddCard({text:text});
  }

  onCardRemoved(cardIndex){
    this.props.onCardRemoved(cardIndex);
  }

  onCardChanged(cardIndex, content){
    this.props.onCardChanged(cardIndex, content);
  }

  render() {
    var self = this;

    //Title
    const titleDisplay = <span>{this.props.name}</span>;
    const titleEditable = <InputTrigger ref="input" defaultValue={this.props.name} onSubmit={this.onListNameChange}/>;

    return (
      <div className="list">
        <div className="head">
          <div className="title" onClick={this.onListNameClick}>
            {(!this.state.editableTitle) ? titleDisplay:titleEditable}
          </div>
          <div className="actions">
            <button onClick={this.onListRemove}>
              <MaterialIcon icon="remove"/>
            </button>
          </div>
        </div>
        <div ref="cards" className="cards">
          {this.props.cards.map(function(card, i){
            return <Card
                    key={i}
                    i={i}
                    {...card}
                    onRemove={self.onCardRemoved}
                    onChange={self.onCardChanged}/>
          })}
          <div className="task">
            <InputTrigger placeholder="Add a card..." onSubmit={self.onAddCard}/>
          </div>
        </div>
      </div>
    );
  }
}

export default List;
