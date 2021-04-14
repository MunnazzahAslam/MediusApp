import React from 'react';
import { View, StyleSheet } from 'react-native';

const Button = props => {
    return (
        <View>
            <Button
                title="Press me"
                disabled
                onPress={() => Alert.alert('Button Pressed')}
                style={{ ...styles.button }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
   
    button:{
        
        backgroundColor:'red',
        bottom:0

    },
});

export default Button;
