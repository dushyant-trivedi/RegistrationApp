

import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/SimpleLineIcons';
import LinearGradient from 'react-native-linear-gradient';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/RegisterAction';
import {connect} from 'react-redux';



const userIcon = (<Icon name='user-o' size={30} style={{ opacity: 0.5 }} />)
const lockIcon = (<Icon1 name='lock' size={30} style={{ opacity: 0.5 }} />)

class LogIn extends Component {
  
  constructor(props) {
      super(props);
      this.state = {
        mail: '',
        password:'',
      }
  }

  loginUser() {
    let m=this.state.mail;
    let p=this.state.password;
    let loginSuccess=false;
  //   console.log("------------");
  // for(let user of this.props.users) console.log("mail is "+ user.mail);
  // console.log("------------");
  
    
    for(let user of this.props.users) {
      //console.log("image source is " +JSON.stringify(user.imageSource));
      if(user.mail == m && user.password==p) {
        this.props.navigation.navigate('HomeScreen',{loginMail : m});
        loginSuccess=true;
      }
    }
    if(!loginSuccess) {
    alert("Invalid User");
    this.setState({mail: ''});
    this.setState({password: ''});
    }
  }
  
  render() {
    return (
        <View style={styles.container}>
         <Text style={styles.headingText}>LOGIN SCREEN</Text>
         
         <TouchableOpacity style={styles.ImageHolder}>

        

        
        </TouchableOpacity>    
        
        
        <View style={styles.inputContainer}>
        
        {userIcon}
        <TextInput 
            style={styles.inputText}
            maxLength={30}
            placeholder='johnathin.wick@gmail.com'
            placeholderTextColor= 'grey'
            value={this.state.mail}
            onChangeText={(text) => this.setState({mail: text})}
            
        />
        </View>

        <View style={styles.inputContainer}>
        {lockIcon}
        <TextInput 
            style={styles.inputText}
            maxLength={30}
            placeholder='***************'
            placeholderTextColor= 'grey'
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={(text) => this.setState({password: text})}
        />
        </View>

        <TouchableOpacity
          onPress={()=>this.loginUser()}
        >
        <LinearGradient colors={['#4AF6D5', '#40E7C7', '#35BBA1']} style={styles.linearGradient}>
            <Text style={styles.buttonText}>
                Login
            </Text>
        </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={{marginTop: 30}}
        onPress = {()=> {this.props.navigation.navigate('RegistrationScreen')}}
        >
            <Text style={{color: '#616968'}}>CREATE NEW ACCOUNT</Text>
        </TouchableOpacity>

    </View>
    );
  
}
}

function mapDispatchToProps(dispatch) {
  
  return bindActionCreators(Actions, dispatch);
  
}

function mapStateToProps(state) {
  console.log("@@@@@ map state to props of login");
  const red=state.RegisterReducer;
  
  
  // console.log("------------");
  // for(let user of red.users) console.log("Names is "+ user.firstName);
  // console.log("------------");
  return {
    users : red.users
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
  },
  headingText: {
    fontSize: 22,
    color: 'grey'
},
  ImageHolder : {
    borderRadius: 60,
    width: 120,
    height: 120,
    borderColor: '#9B9B9B',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6F0EE',
    borderWidth: 8,
    borderColor: '#4AF6D5',
    shadowOffset:{  width: 0,  height: 0,  },
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowRadius : 8,
    marginTop: 30,
    marginBottom: 30
  },
  inputText : {
    height : 40,
    width : 200,
    marginLeft: 10
},
inputContainer : {
  marginTop: 10,
  flexDirection: 'row',
  borderBottomColor: 'grey',
  borderBottomWidth : 1
},
linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    marginTop : 40,
    marginBottom: 30,
    height: 50,
    width : 250,
    justifyContent : 'center',
    shadowOffset:{  width: 0,  height: 0,  },
    shadowColor: 'grey',
    shadowOpacity: 0.8,
    shadowRadius : 7
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  ringGradient : {
    height: 120,
    width: 120,
    borderRadius: 60,
    borderWidth: 5

  }
  
  
});
