import React, { useState, createRef } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import * as yup from 'yup'
import Colors from '../constants/Color';
import Card from '../components/Card';
import { Formik } from 'formik'
import AsyncStorage from '@react-native-community/async-storage';
import Loader from './Components/Loader';
const phoneRegExp = RegExp(/^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/);

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} letters`)
    .required('Password is required'),
  firstName: yup
    .string()
    .required('First Name is Required'),
  lastName: yup
    .string()
    .required('Last Name is Required'),
  number: yup
    .string().matches(phoneRegExp, 'Phone number is not valid')
    .required('Cellphone number is Required'),
  passwordConfirmation: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
})


const TrademarkScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

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
                Create Your Account
           </Text>
            </View>
            <View>
              <View style={styles.card}>
                <Card style={styles.buttonConatiner}>
                  <Formik
                    validateOnMount={true}
                    validationSchema={loginValidationSchema}
                    initialValues={{ email: '', password: '' }}
                    onSubmit={values => console.log(values)}
                  >
                    {({
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      values,
                      errors,
                      touched,
                      isValid,
                    }) => (
                      <>
                        <View style={styles.SectionStyle}>
                          <TextInput
                            style={styles.inputStyle}
                            name="firstName"
                            placeholder="Enter your first name"
                            placeholderTextColor="#7B8B9A"
                            onChangeText={handleChange('firstName')}
                            onBlur={handleBlur('firstName')}
                            value={values.firstName}
                            keyboardType="default"
                          />
                          {(errors.firstName && touched.firstName) &&
                            <Text style={styles.errorTextStyle}>{errors.firstName}</Text>
                          }
                        </View>
                        <View style={styles.SectionStyle}>
                          <TextInput
                            style={styles.inputStyle}
                            name="lastName"
                            placeholder="Enter your last name"
                            placeholderTextColor="#7B8B9A"
                            onChangeText={handleChange('lastName')}
                            onBlur={handleBlur('lastName')}
                            value={values.lastName}

                          />
                          {(errors.lastName && touched.lastName) &&
                            <Text style={styles.errorTextStyle}>{errors.lastName}</Text>
                          }
                        </View>

                        <View style={styles.SectionStyle}>
                          <TextInput
                            style={styles.inputStyle}
                            name="email"
                            placeholder="Enter your email address"
                            placeholderTextColor="#7B8B9A"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            keyboardType="email-address"
                          />
                          {(errors.email && touched.email) &&
                            <Text style={styles.errorTextStyle}>{errors.email}</Text>
                          }
                        </View>
                        <View style={styles.SectionStyle}>
                          <TextInput
                            style={styles.inputStyle}
                            name="password"
                            placeholder="Enter your password"
                            placeholderTextColor="#7B8B9A"
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry
                          />
                          {(errors.password && touched.password) &&
                            <Text style={styles.errorTextStyle}>{errors.password}</Text>
                          }
                        </View>
                        <View style={styles.SectionStyle}>
                          <TextInput
                            style={styles.inputStyle}
                            name="passwordConfirmation"
                            placeholder="Confirm your password"
                            placeholderTextColor="#7B8B9A"
                            onChangeText={handleChange('passwordConfirmation')}
                            onBlur={handleBlur('passwordConfirmation')}
                            value={values.passwordConfirmation}
                            secureTextEntry
                          />
                          {(errors.passwordConfirmation && touched.passwordConfirmation) &&
                            <Text style={styles.errorTextStyle}>{errors.passwordConfirmation}</Text>
                          }
                        </View>
                        <View style={styles.SectionStyle}>
                          <TextInput
                            style={styles.inputStyle}
                            name="number"
                            placeholder="Enter your cellphone number"
                            placeholderTextColor="#7B8B9A"
                            onChangeText={handleChange('number')}
                            onBlur={handleBlur('number')}
                            value={values.number}
                          />
                          {(errors.number && touched.number) &&
                            <Text style={styles.errorTextStyle}>{errors.number}</Text>
                          }
                        </View>
                        <TouchableOpacity
                          style={styles.buttonStyle}
                          activeOpacity={0.5}
                          onPress={handleSubmit}
                          disabled={!isValid || values.email === ''}>
                          <View>
                            <Icon style={styles.arrowIcon} name="arrow-forward-outline" size={80} color="#fff" />
                            <Text style={styles.buttonTextStyle}></Text>
                          </View>
                        </TouchableOpacity>
                      </>
                    )}

                  </Formik>
                  <Text
                    style={styles.registerTextStyle}>
                    Don't have an account?<Text onPress={() => navigation.navigate('RegisterScreen')} style={styles.spanStyle}> Sign Up Now! </Text>
                  </Text>
                </Card>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View >
  );
};
export default TrademarkScreen;

const styles = StyleSheet.create({
  searchIcon: {
    top: 23,
    left: 10,
    marginRight: 10
  },
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
    width: 450,
    height: 45,
    marginTop: 20,
    marginLeft: 2,
    marginRight: 40
  },
  buttonStyle: {
    backgroundColor: Colors.primaryColor,
    borderWidth: 0,
    color: '#fff',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 50,
    marginLeft: 85,
    marginRight: 50,
    marginTop: 35,
    zIndex: 999,
    marginBottom: 10,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100
  },
  buttonTextStyle: {
    color: '#fff',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: '#7B8B9A',
    paddingLeft: 35,
    borderBottomColor: '#dadae8',
    borderBottomWidth: 1,
    width: 230,
  },
  registerTextStyle: {
    color: '#7B8B9A',
    fontSize: 14,
    padding: 10,
    width: 250
  },
  TextStyle: {
    color: '#7B8B9A',
    textAlign: 'center',
    fontSize: 14,
    paddingTop: 20,
    textDecorationLine: 'underline',
    marginLeft: 80
  },
  spanStyle: {
    color: Colors.primaryColor,
    textAlign: 'center',
    fontSize: 14,
    paddingTop: 12,
    textDecorationLine: 'underline',
    marginLeft: 80
  },
  errorTextStyle: {
    color: 'red',
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
    textAlign: 'left',
    marginTop: -58,
    paddingLeft: 5

  },
  buttonConatiner: {
    marginBottom: 20,
    marginTop: -20,
    width: 1200,
    maxWidth: '95%',
    height: 480,
    paddingTop: 20
  },
  card: {
    paddingLeft: 40,
    paddingRight: 20,
  },
  arrowIcon: {
    paddingTop: 35,
    marginLeft: -10,
    zIndex: 999
  },
  codeFieldRoot: {
    marginTop: 20,
    width: 280,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cellRoot: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  cellText: {
    color: '#000',
    fontSize: 36,
    textAlign: 'center',
  },
  focusCell: {
    borderBottomColor: '#007AFF',
    borderBottomWidth: 2,
  },
});

{/*// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useState, createRef } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import PasswordInputText from 'react-native-hide-show-password-input';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Colors from '../constants/Color';
import Card from '../components/Card';
import Loader from './Components/Loader';

const RegisterScreen = (props) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

  const nameInputRef = createRef();
  const emailInputRef = createRef();
  const ageInputRef = createRef();
  const addressInputRef = createRef();

  const handleSubmitButton = () => {
    setErrortext('');
    if (!userName) {
      alert('Please fill Name');
      return;
    }
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userAge) {
      alert('Please fill Age');
      return;
    }
    if (!userAddress) {
      alert('Please fill Address');
      return;
    }
    //Show Loader
    setLoading(true);
    var dataToSend = {
      user_name: userName,
      user_email: userEmail,
      user_age: userAge,
      user_address: userAddress,
    };
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch('https://aboutreact.herokuapp.com/register.php', {
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
          setIsRegistraionSuccess(true);
          console.log('Registration Successful. Please Login to proceed');
        } else {
          setErrortext('Registration Unsuccessful');
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };
  if (isRegistraionSuccess) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../Image/success.png')}
          style={{ height: 150, resizeMode: 'contain', alignSelf: 'center' }}
        />
        <Text style={styles.successTextStyle}>Registration Successful.</Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonTextStyle}>Login Now</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.mainBody}>
      <KeyboardAvoidingView enabled>
        <View style={styles.header}>
          <Text style={styles.headerTitle} >
            Create Your Account
           </Text>
          <View>
            <View style={styles.card}>
              <Card style={styles.buttonConatiner}>
                <View style={styles.SectionStyle}>
                  <Icon style={styles.searchIcon} name="person-outline" size={18} color="#7B8B9A" />
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={(UserName) => setUserName(UserName)}
                    underlineColorAndroid="#f000"
                    placeholder="Enter your first name"
                    placeholderTextColor="#7B8B9A"
                    autoCapitalize="sentences"
                    returnKeyType="next"
                    onSubmitEditing={() =>
                      emailInputRef.current && emailInputRef.current.focus()
                    }
                    blurOnSubmit={false}
                  />
                </View>
                <View style={styles.SectionStyle}>
                  <Icon style={styles.searchIcon} name="person-outline" size={18} color="#7B8B9A" />
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={(UserName) => setUserName(UserName)}
                    underlineColorAndroid="#f000"
                    placeholder="Enter your last name"
                    placeholderTextColor="#7B8B9A"
                    autoCapitalize="sentences"
                    returnKeyType="next"
                    onSubmitEditing={() =>
                      emailInputRef.current && emailInputRef.current.focus()
                    }
                    blurOnSubmit={false}
                  />
                </View>
                <View style={styles.SectionStyle}>
                  <Icon style={styles.searchIcon} name="mail-outline" size={18} color="#7B8B9A" />
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                    underlineColorAndroid="#f000"
                    placeholder="Enter your email address"
                    placeholderTextColor="#7B8B9A"
                    keyboardType="email-address"
                    ref={emailInputRef}
                    returnKeyType="next"
                    onSubmitEditing={() =>
                      ageInputRef.current && ageInputRef.current.focus()
                    }
                    blurOnSubmit={false}
                  />
                </View>
                <View style={styles.SectionStyle}>
                  <Icon style={styles.searchIcon} name="call-outline" size={18} color="#7B8B9A" />
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={(UserName) => setUserName(UserName)}
                    underlineColorAndroid="#f000"
                    placeholder="Enter your contact"
                    placeholderTextColor="#7B8B9A"
                    autoCapitalize="sentences"
                    returnKeyType="next"
                    onSubmitEditing={() =>
                      emailInputRef.current && emailInputRef.current.focus()
                    }
                    blurOnSubmit={false}
                  />
                </View>
                <View style={styles.SectionStyle}>
                  <Icon style={styles.searchIcon} name="lock-open-outline" size={18} color="#7B8B9A" />
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={(UserAddress) => setUserAddress(UserAddress)}
                    underlineColorAndroid="#f000"
                    placeholder="Enter your password"
                    placeholderTextColor="#7B8B9A"
                    autoCapitalize="sentences"
                    ref={addressInputRef}
                    returnKeyType="next"
                    blurOnSubmit={false}
                  />
                </View>
                <View style={styles.SectionStyle}>
                  <Icon style={styles.searchIcon} name="lock-closed-outline" size={18} color="#7B8B9A" />
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={(UserAddress) => setUserAddress(UserAddress)}
                    underlineColorAndroid="#f000"
                    placeholder="Confirm your password"
                    placeholderTextColor="#7B8B9A"
                    autoCapitalize="sentences"
                    ref={addressInputRef}
                    returnKeyType="next"
                    onSubmitEditing={Keyboard.dismiss}
                    blurOnSubmit={false}
                  />
                </View>
                {errortext != '' ? (
                  <Text style={styles.errorTextStyle}> {errortext} </Text>
                ) : null}
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={handleSubmitButton}><View>
                    <Icon style={styles.arrowIcon} name="arrow-forward-outline" size={80} color="#fff" />
                    <Text style={styles.buttonTextStyle}></Text>
                  </View>
                </TouchableOpacity>
              </Card>
              <Text
                style={styles.registerTextStyle}
                onPress={() => navigation.navigate('RegisterScreen')}>
                Already have an account?<Text style={styles.spanStyle}> Login </Text>
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({

  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
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
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },

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

  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    marginLeft: 5,
    marginRight: 5,
    borderBottomColor: '#dadae8',
    borderBottomWidth: 1,
  },
  buttonStyle: {
    backgroundColor: Colors.primaryColor,
    borderWidth: 0,
    color: '#fff',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 50,
    marginLeft: 65,
    marginRight: 50,
    marginTop: 50,
    zIndex: 999,
    marginBottom: -50,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100
  },
  buttonTextStyle: {
    color: '#fff',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: '#dadae8',
    paddingLeft: 15,
    paddingRight: 15,
  },
  registerTextStyle: {
    color: '#7B8B9A',
    textAlign: 'center',
    fontSize: 14,
    alignSelf: 'center',
    padding: 30,
    marginTop: 20,
    marginLeft: -28
  },
  TextStyle: {
    color: '#7B8B9A',
    textAlign: 'center',
    fontSize: 14,
    paddingTop: 20,
    textDecorationLine: 'underline',
    marginLeft: 80
  },
  spanStyle: {
    color: Colors.primaryColor,
    textAlign: 'center',
    fontSize: 14,
    paddingTop: 12,
    textDecorationLine: 'underline',
    marginLeft: 80
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  header: {
    width: '100%',
    height: 350,
    // paddingTop: 36,
    backgroundColor: Colors.primaryColor, //greencolorfyp //
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingLeft: 20,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  headerTitle: {
    justifyContent: 'space-between',
    color: 'white',  //white
    fontSize: 30,
    textAlign: 'left',
    position: 'absolute',  
    bottom:200,
    left: 20
  },
  buttonConatiner: {
    width: 800,
    maxWidth: '90%',
    height: 380,
    marginTop: 500,
    zIndex: 111
  },
  card: {
    paddingLeft: 40,
    paddingRight: 20,
  },
  arrowIcon: {
    paddingTop: 35,
    marginLeft: -10,
    zIndex: 999
  },
  mainBody: {
    flex: 1,
    backgroundColor: '#fff',
    alignContent: 'center',
  },

});*/}
