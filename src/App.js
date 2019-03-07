import React, { Component } from 'react';
import Board from './components/board.js';
import { Dropdown } from 'react-bootstrap';
import MaterialIcon from 'material-icons-react';
import InputTrigger from './components/inputTrigger';
import logo from './logo.svg';
import user from './user.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentBoard:false,
      editableName:false,
      boards:[]
    };
  }

  //Board bindings
  editBoardName = this.editBoardName.bind(this);
  onBoardNameChange = this.onBoardNameChange.bind(this);
  addNewBoard = this.addNewBoard.bind(this);
  deleteBoard = this.deleteBoard.bind(this);

  //List bindings
  onListAdd = this.onListAdd.bind(this);
  onListRemove = this.onListRemove.bind(this);
  onListNameChange = this.onListNameChange.bind(this);

  //Card bindings
  onAddCard = this.onAddCard.bind(this);
  onCardRemoved = this.onCardRemoved.bind(this);
  onCardChanged = this.onCardChanged.bind(this);


  //Board events
  editBoardName(){
    if(this.state.boards.length == 0) return;
    this.setState({editableName:true});
    console.log(this.refs);
  }

  onBoardNameChange(value){
    if(this.state.boards.length == 0) return;
    var boards = this.state.boards;
    boards[this.state.currentBoard].name = value;
    this.setState({boards:boards, editableName:false})
    
  }

  addNewBoard(){
    var boards = this.state.boards;
    boards.push({name:"Board", lists:[]});
    this.setState({boards:boards});
    this.setCurrentBoard(boards.length-1);
    // this.editBoardName();
  }

  deleteBoard(){
    if(this.state.boards.length == 0) return;
    var boards = this.state.boards;
    var cb = this.state.currentBoard;
    boards = boards.filter(function(item, i){
      return (i !== cb);
    })
    //Set fallback board
    if(cb > 0) cb--;
    this.setCurrentBoard(cb);
    console.log('fallback board index', cb);
    //Render boards
    this.setState({boards:boards})
  }

  setCurrentBoard(i){
    console.log('setCurrentBoard', i);
    this.setState({currentBoard:i})
  }

  //List events
  onListAdd(name){
    console.log("onListAdd", name);
    var boardIndex = this.state.currentBoard;
    var boards = this.state.boards;
    boards[boardIndex].lists.push({name:name, cards:[]});
    this.setState({boards:boards});
  }

  onListRemove(listIndex){
    console.log("onListRemove", listIndex);
    var boardIndex = this.state.currentBoard;
    var boards = this.state.boards;
    var lists = boards[boardIndex].lists;
    boards[boardIndex].lists = lists.filter(function(list, i){
      return (i !== listIndex);
    });
    this.setState({boards:boards});
  }

  onListNameChange(listIndex, name){
    console.log("onListNameChange", listIndex, name);
    var boardIndex = this.state.currentBoard;
    var boards = this.state.boards;
    boards[boardIndex].lists[listIndex].name = name;
    this.setState({boards:boards});
  }

  //Card events
  onAddCard(listIndex, card){
    var boardIndex = this.state.currentBoard;
    var boards = this.state.boards;
    boards[boardIndex].lists[listIndex].cards.push(card);
    this.setState({boards:boards});
    console.log('onAddCard', boardIndex, listIndex, card);
  }

  onCardRemoved(listIndex, cardIndex){
    console.log('onCardRemoved', listIndex, cardIndex);
    var boardIndex = this.state.currentBoard;
    var boards = this.state.boards;
    var cards = boards[boardIndex].lists[listIndex].cards;
    boards[boardIndex].lists[listIndex].cards = cards.filter(function(card, i){
      return (i !== cardIndex);
    });
    this.setState({boards:boards});
  }

  onCardChanged(listIndex, cardIndex, text){
    console.log('onCardChanged', listIndex, cardIndex, text);
    var boardIndex = this.state.currentBoard;
    var boards = this.state.boards;
    var cards = boards[boardIndex].lists[listIndex].cards;
    boards[boardIndex].lists[listIndex].cards[cardIndex].text = text;
    this.setState({boards:boards});
  }

  render() {
    var self = this;

    var isThereBoards = (this.state.boards.length > 0);
    var currentBoard = isThereBoards ? this.state.boards[this.state.currentBoard]:{}
    var displayBoardTitle = isThereBoards ? currentBoard.name:"Boards";
    console.log("Rendering board:", currentBoard)

    //Board name
    const boardNameList = <Dropdown>
        <Dropdown.Toggle id="dropdown-basic" className={(isThereBoards) ? "":"disabled"}>
          {displayBoardTitle}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {this.state.boards.map(function(board, i){
            return <Dropdown.Item onClick={() => self.setCurrentBoard(i)}>{board.name}</Dropdown.Item>
          })}
        </Dropdown.Menu>
      </Dropdown>

    const boardNameEdit = <InputTrigger ref="boardNameInput" defaultValue={displayBoardTitle} onSubmit={this.onBoardNameChange}/>

    const boardActions = <div className="boardactions">
      {(!this.state.editableName) ? boardNameList:boardNameEdit}
      <Dropdown>
        <Dropdown.Toggle className="noarrow" variant="default">
          <MaterialIcon icon="more_vert"/>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={this.addNewBoard}>Create</Dropdown.Item>
          <Dropdown.Item onClick={this.editBoardName}>Rename</Dropdown.Item>
          <Dropdown.Item onClick={this.deleteBoard}>Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>

    const userActions = <Dropdown id="useractions">
        <Dropdown.Toggle className="noarrow" variant="default">
          <MaterialIcon icon="more_vert"/>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>Account</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Log out</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

    //Content
    const board = <Board
      lists={currentBoard.lists}

      onAddCard={this.onAddCard}
      onCardRemoved={this.onCardRemoved}
      onCardChanged={this.onCardChanged}

      onListRemove={this.onListRemove}
      onListAdd={this.onListAdd}
      onListNameChange={this.onListNameChange}
      />

    const empty = <p id="emptynotif">Create some boards</p>

    return (
      <div className="App">
        <div id="header">
          <div className="boardZone">
            {boardActions}
          </div>
          <div className="logo">
            <img id="logo" src={logo}/>
          </div>
          <div className="user">
            {userActions}
            <div id="profile">
              <img src={user}/>
            </div>
          </div>
        </div>
        <div id="content">
          {(isThereBoards) ? board:empty} 
        </div>
      </div>
    );
  }
}

export default App;
