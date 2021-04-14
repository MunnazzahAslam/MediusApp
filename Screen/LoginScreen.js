// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useState, createRef } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import Colors from '../constants/Color';
import Card from '../components/Card';

import AsyncStorage from '@react-native-community/async-storage';

import Loader from './Components/Loader';

const LoginScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const passwordInputRef = createRef();

  const handleSubmitPress = () => {
    setErrortext('');
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    setLoading(true);
    let dataToSend = { user_email: userEmail, user_password: userPassword };
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch('https://aboutreact.herokuapp.com/login.php', {
      method: 'POST',
      body: formBody,
      headers: {
        //Header Defination
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        setLoading(false);
        console.log(responseJson);
        // If server response message same as Data Matched
        if (responseJson.status == 1) {
          AsyncStorage.setItem('user_id', responseJson.data[0].user_id);
          console.log(responseJson.data[0].user_id);
          navigation.replace('DrawerNavigationRoutes');
        } else {
          setErrortext('Please check your email id or password');
          console.log('Please check your email id or password');
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View>
          <KeyboardAvoidingView enabled>
            <View style={styles.header}>
              <Text style={styles.headerTitle} >
                Welcome Back!
           </Text>
              <View>
                <View style={styles.card}>
                  <Card style={styles.buttonConatiner}>
                    <View style={styles.SectionStyle}>
                      <TextInput
                        style={styles.inputStyle}
                        onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                        placeholder="Enter your email address" //dummy@abc.com
                        placeholderTextColor="#8b9cb5"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        returnKeyType="next"
                        onSubmitEditing={() =>
                          passwordInputRef.current && passwordInputRef.current.focus()
                        }
                        underlineColorAndroid="#f000"
                        blurOnSubmit={false}
                      />
                    </View>
                    <View style={styles.SectionStyle}>
                      <TextInput
                        style={styles.inputStyle}
                        onChangeText={(UserPassword) => setUserPassword(UserPassword)}
                        placeholder="Enter your password" //12345
                        placeholderTextColor="#8b9cb5"
                        keyboardType="default"
                        ref={passwordInputRef}
                        onSubmitEditing={Keyboard.dismiss}
                        blurOnSubmit={false}
                        secureTextEntry={true}
                        underlineColorAndroid="#f000"
                        returnKeyType="next"
                      />
                    </View>
                    {errortext != '' ? (
                      <Text style={styles.errorTextStyle}> {errortext} </Text>
                    ) : null}
                    <TouchableOpacity
                      style={styles.buttonStyle}
                      activeOpacity={0.5}
                      onPress={handleSubmitPress}>
                      <Text style={styles.buttonTextStyle}>Login</Text>
                    </TouchableOpacity>
                  </Card>
                  <Text
                    style={styles.registerTextStyle}
                    onPress={() => navigation.navigate('RegisterScreen')}>
                    Don't have an account? Sign Up Now!
            </Text>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({

  card: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 15,
  },

  mainBody: {
    marginTop: -280,
    flex: 1,
    backgroundColor: '#fff',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'column',
    height: 40,
    marginTop: 20,
    marginLeft: 5,
    marginRight: 5,
  },
  buttonStyle: {
    backgroundColor: Colors.primaryColor,
    borderWidth: 0,
    color: '#fff',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 50,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 20,
    zIndex:999,
    marginBottom: -50,
  },
  buttonTextStyle: {
    color: '#fff',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  registerTextStyle: {
    color: '#c8c8c8',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
    marginLeft:-20
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  header: {
    width: '100%',
    height: 400,
    // paddingTop: 36,
    backgroundColor: Colors.primaryColor, //greencolorfyp //
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingLeft: 20,
    borderBottomLeftRadius: 50,
    paddingTop: 300,
    borderBottomRightRadius: 50,
  },
  headerTitle: {
    color: 'white',  //white
    fontSize: 30,
    alignItems: 'center',
    justifyContent: 'center'

  },
  buttonConatiner: {
    marginBottom:20,
    marginTop: 60,
    width: 800,
    maxWidth: '90%',
    height: 230,
    paddingTop: 20
  },
  card: {
    paddingLeft: 40,
    paddingRight: 20,
  },
  button: {
    marginBottom: '2rem',
    color: '#fff',
    backgroundColor: '#111'
  }

});
