// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/
import 'react-native-gesture-handler';

// Import React and Component
import React from 'react';

// Import Navigators from React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import Screens
import SplashScreen from './Screen/SplashScreen';
import LoginScreen from './Screen/LoginScreen';
import RegisterScreen from './Screen/RegisterScreen';
import ForgetPasswordScreen from './Screen/ForgetPasswordScreen';
import OTPScreen from './Screen/OTPScreen';
import ResetPasswordScreen from './Screen/ResetPassword';
import DrawerNavigationRoutes from './Screen/DrawerNavigationRoutes';
import PatentScreen from './Screen/PatentScreen';
import DesignScreen from './Screen/DesignScreen';
import TrademarkScreen from './Screen/TrademarkScreen';
import CopyRightScreen from './Screen/CopyRightScreen';

const Stack = createStackNavigator();

const Auth = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="TrademarkScreen">

      <Stack.Screen
        name="CopyRightScreen"
        component={CopyRightScreen}
        options={{ headerShown: false }}
      />


      {/*<Stack.Screen
        name="PatentScreen"
        component={PatentScreen}
        options={{ headerShown: false }}
      />
      
      <Stack.Screen
        name="TrademarkScreen"
        component={TrademarkScreen}
        options={{ headerShown: false }}
      />
      
      <Stack.Screen
        name="DesignScreen"
        component={DesignScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="CopyRightScreen"
        component={CopyRightScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
        options={{
          headerShown: false
        }}
      />
      
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          headerShown: false
        }}
      />
      
      <Stack.Screen
        name="ForgetPasswordScreen"
        component={ForgetPasswordScreen}
        options={{
          headerShown: false
        }}
      />
      
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      
      <Stack.Screen
        name="OTPScreen"
        component={OTPScreen}
        options={{
          headerShown: false
        }}
      />
      */}
    </Stack.Navigator>
  );
};

/* Switch Navigator for those screens which needs to be switched only once
  and we don't want to switch back once we switch from them to the next one */
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        {/* SplashScreen which will come once for 5 Seconds */}
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // Hiding header for Splash Screen
          options={{ headerShown: false }}
        />
        {/* Auth Navigator which includer Login Signup will come once */}
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{ headerShown: false }}
        />
        {/* Navigation Drawer as a landing page */}
        <Stack.Screen
          name="DrawerNavigationRoutes"
          component={DrawerNavigationRoutes}
          // Hiding header for Navigation Drawer as we will use our custom header
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
