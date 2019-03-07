import React, { Component } from 'react';
import List from './list';
import InputTrigger from './inputTrigger';

class Board extends Component {

    constructor(props) {
        super(props);

        this.state = {
            editableName:false,
            lists:this.props.lists
        };
    }

    //List bindings
    onListAdd = this.onListAdd.bind(this);
    onListRemove = this.onListRemove.bind(this);
    onListNameChange = this.onListNameChange.bind(this);

    //Card bindings
    onAddCard = this.onAddCard.bind(this);
    onCardRemoved = this.onCardRemoved.bind(this);
    onCardChanged = this.onCardChanged.bind(this);


    //List events
    onListAdd(name){
        this.props.onListAdd(name);
    }

    onListRemove(listIndex){
        this.props.onListRemove(listIndex);
    }

    onListNameChange(listIndex, name){
        this.props.onListNameChange(listIndex, name);
    }


    //Card events
    onAddCard(list, card){
        console.log('onAddCard', list, card)
        this.props.onAddCard(list, card);
    }

    onCardRemoved(listIndex, cardIndex){
        this.props.onCardRemoved(listIndex, cardIndex);
    }

    onCardChanged(listIndex, cardIndex, content){
        this.props.onCardChanged(listIndex, cardIndex, content)
    }

    render() {
        var self = this;
        return (
            <div className="board">
                {this.props.lists.map(function(list, i){
                    return <List
                        key={i}
                        i={i}
                        {...list}
                        onListRemove={() => self.onListRemove(i)}
                        onListNameChange={(name) => self.onListNameChange(i, name)}
                        onCardRemoved={(cardIndex) => self.onCardRemoved(i, cardIndex)}
                        onAddCard={(text) => self.onAddCard(i, text)}
                        onCardChanged={(cardIndex, text) => self.onCardChanged(i, cardIndex, text)}
                        />;
                })}
                <div className="list">
                    <InputTrigger
                        placeholder="Add a list..."
                        onSubmit={this.onListAdd}
                        class="input-trigger-list"/>
                </div>
            </div>
        );
    }
}

export default Board;
