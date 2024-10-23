import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider } from 'react-redux';
import SplashScreen from './src/screens/SplashScreen';
import SignIn from './src/screens/SignInScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import store from './store';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const HomeDrawer = () => {
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
            <Drawer.Screen name="Settings" component={SettingsScreen} />
        </Drawer.Navigator>
    );
};

const App = () => {
    return (
        <Provider store={store}>
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash" >
                <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown: false}} />
                <Stack.Screen name="SignIn" component={SignIn} options={{headerShown: false}}/>
                <Stack.Screen name="HomeDrawer" component={HomeDrawer} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
        </Provider>
    );
};

export default App;
