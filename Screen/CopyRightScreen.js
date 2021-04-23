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

const CopyRightScreen = ({ navigation }) => {
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
                                Copyright Registration
                            </Text>

                        </View>
                        <View style={styles.SectionStyle}>
                            <Icon style={styles.searchIcon} name="book-outline" size={18} color="#7B8B9A" />
                            <TextInput
                                style={styles.inputStyle}
                                type="email"
                                onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                                placeholder="Title" //dummy@abc.com
                                placeholderTextColor="#7B8B9A"
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
                            <Icon style={styles.searchIcon} name="document-text-outline" size={18} color="#7B8B9A" />
                            <TextInput
                                style={styles.inputStyle}
                                type="email"
                                onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                                placeholder="Description" //dummy@abc.com
                                placeholderTextColor="#7B8B9A"
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
                            <Icon style={styles.searchIcon} name="call-outline" size={18} color="#7B8B9A" />
                            <TextInput
                                style={styles.inputStyle}
                                type="email"
                                onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                                placeholder="Cell Phone" //dummy@abc.com
                                placeholderTextColor="#7B8B9A"
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
                            <Icon style={styles.searchIcon} name="cog-outline" size={18} color="#7B8B9A" />
                            <TextInput
                                style={styles.inputStyle}
                                type="email"
                                onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                                placeholder="Technology" //dummy@abc.com
                                placeholderTextColor="#7B8B9A"
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
                            <Icon style={styles.searchIcon} name="alert-circle-outline" size={18} color="#7B8B9A" />
                            <TextInput
                                style={styles.inputStyle}
                                type="email"
                                onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                                placeholder="Number of claims" //dummy@abc.com
                                placeholderTextColor="#7B8B9A"
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
                            <Icon style={styles.searchIcon} name="home-outline" size={18} color="#7B8B9A" />
                            <TextInput
                                style={styles.inputStyle}
                                type="email"
                                onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                                placeholder="City" //dummy@abc.com
                                placeholderTextColor="#7B8B9A"
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
                        <TouchableOpacity
                            style={styles.registerbuttonStyle}
                            activeOpacity={0.5}>
                            <View>
                                <Text style={styles.buttonTextStyle}>Register</Text>
                            </View>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </View>
            </ScrollView>
        </View>
    );
};
export default CopyRightScreen;

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
        height: 45,
        marginTop: 20,
        marginLeft: 40,
        marginRight: 40,
    },
    registerbuttonStyle: {
        backgroundColor: Colors.primaryColor,
        borderWidth: 0,
        color: '#fff',
        borderColor: '#7DE24E',
        height: 40,
        width: 80,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 8,
        marginLeft: 135,
        marginTop: 40
    },
    buttonTextStyle: {
        color: '#fff',
        paddingVertical: 10,
        fontSize: 16,
    },
    inputStyle: {
        flex: 1,
        color: '#dadae8',
        paddingLeft: 35,
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
        height: 160,
        // paddingTop: 36,
        backgroundColor: Colors.primaryColor, //greencolorfyp //
        alignItems: 'stretch',
        justifyContent: 'center',
        paddingLeft: 20,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        marginTop: 150
    },
    headerTitle: {
        color: 'white',  //white
        fontSize: 30,
        textAlign: 'left',
        marginTop: 18,
        paddingLeft: 18

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