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

    title: yup
        .string()
        .required('Title is Required'),
    description: yup
        .string()
        .required('Description is Required'),
    technology: yup
        .string()
        .required('Technology is Required'),
    claims: yup
        .number('Number of claims must be a number')
        .typeError('Number of claims must be a number')
        .max(50, ({ max }) => `Please enter a number less than 50`)
        .required('Number of claims is Required')
        .positive('Number of claims must be positive')
        .integer('Number of claims must be a number'),
    number: yup
        .string().matches(phoneRegExp, 'Phone number is not valid')
        .required('Cellphone number is Required'),
    city: yup
        .string()
        .required('City is Required'),
})


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
                                Copy Right Registration
                            </Text>
                        </View>
                        <View>
                            <View style={styles.card}>
                                <Card style={styles.buttonConatiner}>
                                    <Formik
                                        validateOnMount={true}
                                        validationSchema={loginValidationSchema}
                                        initialValues={{ title: '', description: '', number: '', technology: '', claims: '', city: '' }}
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
                                                        name="title"
                                                        placeholder="Enter the title"
                                                        placeholderTextColor="#7B8B9A"
                                                        onChangeText={handleChange('title')}
                                                        onBlur={handleBlur('title')}
                                                        value={values.title}
                                                        keyboardType="default"
                                                    />
                                                    {(errors.title && touched.title) &&
                                                        <Text style={styles.errorTextStyle}>{errors.title}</Text>
                                                    }
                                                </View>
                                                <View style={styles.SectionStyle}>
                                                    <TextInput
                                                        style={styles.inputStyle}
                                                        name="description"
                                                        placeholder="Enter the description"
                                                        placeholderTextColor="#7B8B9A"
                                                        onChangeText={handleChange('description')}
                                                        onBlur={handleBlur('description')}
                                                        value={values.description}
                                                    />
                                                    {(errors.description && touched.description) &&
                                                        <Text style={styles.errorTextStyle}>{errors.description}</Text>
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
                                                <View style={styles.SectionStyle}>
                                                    <TextInput
                                                        style={styles.inputStyle}
                                                        name="technology"
                                                        placeholder="Enter the technology"
                                                        placeholderTextColor="#7B8B9A"
                                                        onChangeText={handleChange('technology')}
                                                        onBlur={handleBlur('technology')}
                                                        value={values.technology}
                                                    />
                                                    {(errors.technology && touched.technology) &&
                                                        <Text style={styles.errorTextStyle}>{errors.technology}</Text>
                                                    }
                                                </View>
                                                <View style={styles.SectionStyle}>
                                                    <TextInput
                                                        style={styles.inputStyle}
                                                        name="claims"
                                                        placeholder="Enter the number of claims"
                                                        placeholderTextColor="#7B8B9A"
                                                        onChangeText={handleChange('claims')}
                                                        onBlur={handleBlur('claims')}
                                                        value={values.claims}
                                                    />
                                                    {(errors.claims && touched.claims) &&
                                                        <Text style={styles.errorTextStyle}>{errors.claims}</Text>
                                                    }
                                                </View>
                                                <View style={styles.SectionStyle}>
                                                    <TextInput
                                                        style={styles.inputStyle}
                                                        name="city"
                                                        placeholder="Choose a city"
                                                        placeholderTextColor="#7B8B9A"
                                                        onChangeText={handleChange('city')}
                                                        onBlur={handleBlur('city')}
                                                        value={values.city}
                                                    />
                                                    {(errors.city && touched.city) &&
                                                        <Text style={styles.errorTextStyle}>{errors.city}</Text>
                                                    }
                                                </View>
                                                <TouchableOpacity
                                                    style={styles.registerbuttonStyle}
                                                    activeOpacity={0.5}
                                                    onPress={handleSubmit}
                                                    disabled={!isValid || values.title === ''}
                                                >
                                                    <View>
                                                        <Text style={styles.buttonTextStyle}>Register</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </>
                                        )}
                                    </Formik>
                                </Card>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </ScrollView>
        </View >
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
        width: 450,
        height: 45,
        marginTop: 20,
        marginLeft: 2,
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
        marginLeft: 75,
        marginTop: 40
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
        width: 230
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
        height: 520,
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