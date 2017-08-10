/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import rootReducer from './reducers/index';
import { createStore } from 'redux';
import Root from './root';
const store = createStore(rootReducer);
export default class App extends Component {
    render() {
        return (
            <Provider store = {store}>
                <Root />
            </Provider>
        )
    }
}
