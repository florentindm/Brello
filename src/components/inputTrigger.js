import React, { Component } from 'react';

class InputTrigger extends Component {

    onPress = this.onPress.bind(this);
    Submit = this.Submit.bind(this);

    onPress(e){
        if(e.key !== "Enter") return
        this.Submit();
    }

    Submit(){
        if(this.refs.input.value.trim() == "") return;
        this.props.onSubmit(this.refs.input.value);
        this.refs.input.value = ""
    }

    render() {
        return (
            <input
                ref="input"
                type="text"
                defaultValue={this.props.defaultValue}
                className={"inputtrigger " + this.props.class}
                placeholder={this.props.placeholder}
                onBlur={this.Submit}
                onKeyPress={this.onPress}/>
        );
    }
}

export default InputTrigger;
