import React from 'react';
import { Text, View, TextInput, TouchableOpacity, Picker } from 'react-native';
import Connector from '../Utils/Connector'

//import stylesheet
import styles from './Styles/LoginScreenStyles';

export default class RegisterScreen extends React.Component{
    constructor(props){
      super(props);
      this.state={
        newUsername: '',
        newPassword: '',
        passwordConfirm: '',
        email: '',
        name: '',
        sex: '',
        birthday: '',
        phone_number: '',
        bio: '',
      }
    }

    //This sets the title on the top header
    static navigationOptions = {
        title: 'Register',
    };

    render(){
        return(
          <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>
              Register new Swolemate account here
            </Text>

            <TextInput
              /*placeholder='Username'
              style={styles.textbox}
              onChangeText={ (newUsername) => this.setState({newUsername})}
              autoCapitalize='none'
              autoCorrect={false}
              textContentType='username'*/
            />

            <TextInput
              placeholder='Email'
              style={styles.textbox}
              onChangeText={ (email) => this.setState({email})}
              autoCapitalize='none'
              keyboardType='email-address'
              textContentType='emailAddress'
            />

            <TextInput
              placeholder='Password'
              style={styles.textbox}
              onChangeText={ (newPassword) => this.setState({newPassword})}
              autoCapitalize='none'
              autoCorrect={false}
              maxLength={15}
              secureTextEntry={true}
              textContentType='password'
            />

            <TextInput
              placeholder='Confirm Password'
              style={styles.textbox}
              onChangeText={ (passwordConfirm) => this.setState({passwordConfirm})}
              autoCapitalize='none'
              autoCorrect={false}
              maxLength={15}
              secureTextEntry={true}
              textContentType='password'
            />

            <Text>
              Create Profile
            </Text>

            <TextInput
              placeholder='Name'
              style={styles.textbox}
              onChangeText={ (name) => this.setState({name})}
              autoCapitalize='words'
              textContentType='name'
            />

            <Picker
              selectedValue={this.state.sex}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => this.setState({sex: itemValue})}>
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Prefer not to specify" value="not_specified" />
              <Picker.Item label="Apache attack helicopter" value="heli" />
            </Picker>

            <TextInput
              placeholder='Birthday (mm/dd/yyyy)'
              style={styles.textbox}
              onChangeText={ (birthday) => this.setState({birthday})}
              keyboardType='decimal-pad'
              maxLength={10}
            />

            <TextInput
              placeholder='Phone number'
              style={styles.textbox}
              onChangeText={ (phone_number) => this.setState({phone_number})}
              keyboardType='phone-pad'
            />

            <Text>
              Add a bio
            </Text>

            <TextInput
              placeholder='Describe what you are looking for'
              onChangeText={ (bio) => this.setState({bio})}
              style={{height: 200, width: 200, borderColor: 'black', borderWidth: 1}}
              multiline={true}
            />

            <TouchableOpacity style={styles.button} onPress={this.registerAccount}>
              <Text>
                Register Account
              </Text>
            </TouchableOpacity>
          </View>
        )
    }

    //register function
    registerAccount = () => {
      Connector.post("/user/register", {
        useremail:  this.state.email,
        password: this.state.newPassword,
        username: this.state.name,
        dateofbirth: this.state.birthday,
        userphone: this.state.phone_number,
        userbio: this.state.bio,
      }, {}, (response) => {
        console.log(response);
      });

      //this is how userinfo will be passed to other screens
      var userinfo = {
        username: this.state.name,
        email: this.state.email,
        interests: [],
      };
      //eventually change 'Home' to 'CreateProfile'
      this.props.navigation.navigate('Home', userinfo);
    };
}
