

import React, {Component} from 'react';
import store from './src/store/store';
import Registration from './src/components/Registration';
import { StackNavigator } from 'react-navigation';
import LogIn from './src/components/LogIn';
import Home from './src/components/Home';
import { Provider } from 'react-redux';
const RegistrationAppNavigator = StackNavigator({
  
  RegistrationScreen : { screen : Registration, navigationOptions:{header:null}},
  LogInScreen : { screen : LogIn},
  HomeScreen : {screen : Home}
  
});


export default class App extends Component {
  render() {
    return (
        <Provider store={store}>
        <RegistrationAppNavigator />
        </Provider>
        );
  }
}

