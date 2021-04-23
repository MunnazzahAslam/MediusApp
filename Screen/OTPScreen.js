// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
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
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import Colors from '../constants/Color';
import Card from '../components/Card';

import AsyncStorage from '@react-native-community/async-storage';

import Loader from './Components/Loader';

const OTPScreen = ({ navigation }) => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const CELL_COUNT = 4;
   const [value, setValue] = useState('');
        const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
        const [props, getCellOnLayoutHandler] = useClearByFocusCell({
            value,
            setValue,
        });
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
                                    Verification Code
                            </Text>
                                <View>
                                    <View style={styles.card}>
                                        <Card style={styles.buttonConatiner}>
                                            <Text
                                                style={styles.registerTextStyle}
                                                onPress={() => navigation.navigate('RegisterScreen')}>
                                                Please enter the 4 digit OTP code sent to +92********809
                                            </Text>
                                            <CodeField
                                                ref={ref}
                                                {...props}
                                                value={value}
                                                onChangeText={setValue}
                                                cellCount={CELL_COUNT}
                                                rootStyle={styles.codeFieldRoot}
                                                keyboardType="number-pad"
                                                textContentType="oneTimeCode"
                                                renderCell={({ index, symbol, isFocused }) => (
                                                    <View
                                                        // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
                                                        onLayout={getCellOnLayoutHandler(index)}
                                                        key={index}
                                                        style={[styles.cellRoot, isFocused && styles.focusCell]}>
                                                        <Text style={styles.cellText}>
                                                            {symbol || (isFocused ? <Cursor /> : null)}
                                                        </Text>
                                                    </View>
                                                )}
                                            />
                                            <TouchableOpacity
                                                style={styles.buttonStyle}
                                                activeOpacity={0.5}
                                                onPress={handleSubmitPress}>
                                                <View>
                                                    <Icon style={styles.arrowIcon} name="arrow-forward-outline" size={80} color="#fff" />
                                                    <Text style={styles.buttonTextStyle}></Text>
                                                </View>
                                            </TouchableOpacity>
                                        </Card>
                                    </View>
                                </View>
                            </View>
                        </KeyboardAvoidingView>
                    </View>
                </ScrollView>
            </View>
        );
    };
    export default OTPScreen;

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
            height: 45,
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
            marginLeft: 65,
            marginRight: 50,
            marginTop: 165,
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
            borderBottomColor: '#dadae8',
            borderBottomWidth: 1,
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
            textAlign: 'left',
            marginTop: 18

        },
        buttonConatiner: {
            marginBottom: 20,
            marginTop: 80,
            width: 800,
            maxWidth: '90%',
            height: 280,
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