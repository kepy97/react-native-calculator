import React, { Component } from 'react';
import {
    View,
    Alert,
    Text
} from 'react-native';
import Style from './Style';
import InputButton from './InputButton';

const inputButtons = [
    [1,2,3,'AC'],
    [4,5,6,'/'],
    [7,8,9,'*'],
    [0,'-','+','=']
];

export default class CalculatorLayout extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            previousInputValue: 0,
            inputValue: 0,
            selectedSymbol: null
        }
    }

    render() {
        return (
            <View style={Style.rootContainer}>
                <View style={Style.displayContainer}>
                    <Text style={Style.displayText}>
                        {this.state.inputValue}
                    </Text>
                </View>
                <View style={Style.inputContainer}>
                    {this._renderInputButtons()}
                </View>
            </View>
        )
    }

    _renderInputButtons() {
        let views = [];

        for (let r = 0; r < inputButtons.length; r ++) {
            let row = inputButtons[r];
            
            let inputRow = [];
            for (let s = 0; s < row.length; s++) {
                let current = row[s];
                inputRow.push(
                    <InputButton value={current} 
                        key={r +"->"+ s}
                        highlight={this.state.selectedSymbol === current}
                        onPress={this._onInputButtonPressed.bind(this, current)}/>
                );
            }
            views.push(<View style={Style.inputRow} key={"row-" + r}>{inputRow}</View>);
        }

        return views;
    }

    _onInputButtonPressed(input) {
        switch (typeof input) {
            case 'number':
                return this._handleNumberInput(input)
            case 'string':
                return this._handleStringInput(input)
        }
    }

    _handleNumberInput(num) {
        let inputValue = (this.state.inputValue * 10) + num;

        this.setState({
            inputValue: inputValue
        })
    }

    _handleStringInput(str) {
        switch (str) {
            case '/':
            case '*':
            case '+':
            case '-':
                this.setState({
                    selectedSymbol: str,
                    previousInputValue: this.state.inputValue,
                    inputValue: 0
                });
                break;
            case '=':
                let symbol = this.state.selectedSymbol,
                    inputValue = this.state.inputValue,
                    previousInputValue = this.state.previousInputValue;

                if (!symbol) {
                    return;
                }

                this.setState({
                    previousInputValue: 0,
                    inputValue: eval(previousInputValue + symbol + inputValue),
                    selectedSymbol: null
                });
                break;
            case 'AC':
                this.setState({
                    previousInputValue: 0,
                    inputValue: 0,
                    selectedSymbol: null
                });
                break;
        }
    }
}