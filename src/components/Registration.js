

import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/SimpleLineIcons';
import Icon2 from 'react-native-vector-icons/Entypo';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import LinearGradient from 'react-native-linear-gradient';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/RegisterAction';
import {connect} from 'react-redux';

const userIcon = (<Icon name='user-o' size={30} style={{ opacity: 0.5 }} />)
const lockIcon = (<Icon1 name='lock' size={30} style={{ opacity: 0.5 }} />)
//const plusIcon = (<Icon name='plus-circle' size={30} color='#35BBA1'/>)
const plusIcon = (<Icon2 name='plus' size={25} color='white' />)

class Registration extends Component {
  
  constructor(props) {
      super(props);
      console.log("@@@@@@@  constructor registration");
      this.state={
          ImageSource : null,
          mail : '',
          password : '',
          firstName : '',
          lastName : '',
          gender: 'male',
      }
    }

  
  
  
  selectPhotoTapped() {
    console.log("@@@@@@@@@@ select photo tapped registration");
    const options = {
        quality : 1.0,
        maxWidth : 500,
        maxHieght : 500,
        storageOptions : {
            skipBackup : true
        }
    };
    ImagePicker.showImagePicker(options, (response)=> {
        console.log('Response = '+response);
        if(response.didCancel) {
            console.log("User cancelled photo picker");
        }
        else if(response.error) {
            console.log('Image Picker error :',response.error);
        }
        else if(response.customButton) {
            console.log('User tapped custom button : '+response.customButton);
        }
        else {
            let source = { uri : response.uri };
            this.setState({
                ImageSource: source
            });
        }
    });


  }
  register() {
      console.log("@@@@@@@@@"+this.state.mail+" "+this.state.gender);
      if(this.validateUser()) {
      let user = {
          mail : this.state.mail,
          password : this.state.password,
          firstName : this.state.firstName,
          lastName : this.state.lastName,
          gender : this.state.gender,
          imageSource : this.state.ImageSource,
      };
      let localUsers=JSON.parse(JSON.stringify(this.props.users));
      localUsers.push(user);
      this.props.registerUser(localUsers);
      this.props.navigation.navigate('LogInScreen');
    }
    else {
        return;
    }
  
  
  
    }

  validateUser() {
      if(this.state.mail=='' || this.state.password=='' || this.state.firstName=='' || this.state.lastName=='') {
          alert("Enter all values");
          return false;
      }
      return true;
  }
       
  
  
  render() {
    console.log("@@@@@@@@@ render registration called");
    return (
      <View style={styles.container}>
        <Text style={styles.headingText}> REGISTRATION SCREEN</Text>
        <TouchableOpacity
            style={styles.ImageHolder}
            onPress = {this.selectPhotoTapped.bind(this)}
        >
        
        <View style={styles.ImageContainer}>
        { 
            this.state.ImageSource === null ? <Text>Select a Photo</Text> : <Image style={styles.ImageContainer} source={this.state.ImageSource} />
        }
        </View>
        
        <View style={styles.plusIconStyle}>
        {plusIcon}
        </View>
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

        <View style={styles.inputContainer}>
        {userIcon}
        <TextInput 
            style={styles.inputText}
            maxLength={30}
            placeholder='First Name'
            placeholderTextColor= 'grey'
            value={this.state.firstName}
            onChangeText={(text) => this.setState({firstName: text})}
        />
        </View>

        <View style={styles.inputContainer}>
        {userIcon}
        <TextInput 
            style={styles.inputText}
            maxLength={30}
            placeholder='Last Name'
            placeholderTextColor= 'grey'
            value={this.state.lastName}
            onChangeText={(text) => this.setState({lastName: text})}
        />
        </View>

        <View style={styles.radioButtonContainer}>
           <RadioGroup
                onSelect = {(index, value) => this.setState({gender: value})}
                color={'#4AF6D5'}
                selectedIndex={0}
                style={{flexDirection: 'row'}}
            >
                <RadioButton value={'male'} >
                    <Text style={{color: '#616968'}}>Male</Text>
                </RadioButton>
 
                <RadioButton value={'female'}
                style={{marginLeft: 80}}
                >
                    <Text style={{color: '#616968'}}>Female</Text>
                </RadioButton>
             </RadioGroup>
        </View>

        <TouchableOpacity
        onPress={()=>this.register()}
        >
        <LinearGradient colors={['#4AF6D5', '#40E7C7', '#35BBA1']} style={styles.linearGradient}>
            <Text style={styles.buttonText}>
                Create account
            </Text>
        </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={{marginTop: 30}}
        onPress = {()=> this.props.navigation.navigate('LogInScreen')}
        >
            <Text style={{color: '#616968'}}>Already have an account</Text>
        </TouchableOpacity>
       
        </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  
    return bindActionCreators(Actions, dispatch);
    
  }
  
  function mapStateToProps(state) {
    console.log("@@@@@ map state to props of registration");
    const red=state.RegisterReducer;
    
    
    // console.log("------------");
    // for(let user of red.users) console.log("Names is "+ user.firstName);
    // console.log("------------");
    return {
      users : red.users
    }
    
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Registration);





















const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    alignItems: 'center',
    
  },
  headingText: {
      fontSize: 22,
      color: 'grey'
  },
  ImageContainer: {
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
  },
  ImageHolder: {
    marginTop: 30,
    marginBottom: 20,
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
  radioButtonContainer : {
      flexDirection : 'row',
      marginTop : 20
  },
  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    marginTop : 20,
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
  plusIconStyle : {
    position: 'absolute',
    top: 85 , 
    left: 85,
    borderRadius: 50,
    backgroundColor: '#4AF6D5'
  }
  
});
