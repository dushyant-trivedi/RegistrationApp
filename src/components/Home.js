

import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import Icon1 from 'react-native-vector-icons/SimpleLineIcons';
// import LinearGradient from 'react-native-linear-gradient';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/RegisterAction';
import {connect} from 'react-redux';



// const userIcon = (<Icon name='user-o' size={30} style={{ opacity: 0.5 }} />)
// const lockIcon = (<Icon1 name='lock' size={30} style={{ opacity: 0.5 }} />)
// let ii='aa';
class Home extends Component {
  
  constructor(props) {
      super(props);
      this.state = {
        imageSource : 'aa',
        mail : '',
        firstName:'',
        lastName: '',
        password: '',
        gender: '',
        
    };
  }
  
  componentWillMount() {
    let m=this.props.navigation.state.params.loginMail;
    this.setState({mail: m});
    for(let userT of this.props.users) {
        if(userT.mail == m) {
            
            
                this.setState({imageSource: userT.imageSource});
            
            
            
            this.setState({firstName: userT.firstName});
            this.setState({lastName: userT.lastName});
            this.setState({gender: userT.gender});
            this.setState({password: userT.password});
            
            // console.log("source is "+JSON.stringify(userT.imageSource));
            // let i=JSON.parse(userT.imageSource);
            //console.log(" img is vvv "+userT.imageSource.uri);
            
            // console.log("img is "+ii);
            
        }
    }
    
  }
  render() {
    
    return (
        
        <View style={styles.container}>
        <Text> Welcome {this.state.firstName} {this.state.lastName}{'\n'}</Text>
        <Image
                style = {styles.avatar}
                source={this.state.imageSource?this.state.imageSource:require('../../images/noProfile.jpg')}
        /> 
        
        <Text>{'\n'} Mail: {this.state.mail}{'\n'}</Text>
        <Text> Gender: {this.state.gender}</Text>
        </View>
    );
  
}
}

function mapDispatchToProps(dispatch) {
  
  return bindActionCreators(Actions, dispatch);
  
}

function mapStateToProps(state) {
  console.log("@@@@@ map state to props of add users");
  const red=state.RegisterReducer;
  
  
  // console.log("------------");
  // for(let user of red.users) console.log("Names is "+ user.firstName);
  // console.log("------------");
  return {
    users : red.users
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
  },
  avatar: {
      height: 100,
      width: 100,
      borderRadius: 50,
  }
  
});
