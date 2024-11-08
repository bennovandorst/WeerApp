import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Location from './src/screens/Location'; 
import Search from './src/screens/Search';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Saved from './src/screens/Saved';

const Tab = createBottomTabNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName;

                        if (route.name === 'Location') {
                            iconName = 'navigation-variant';
                        } else if (route.name === 'Saved') {
                            iconName = 'playlist-star';
                        } else if (route.name === 'Search') {
                            iconName = 'magnify';
                        }

                        return <Icon name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: '#0D47A1',
                    tabBarInactiveTintColor: 'gray',
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: '#E0F7FA',
                    },
                })}
            >
                <Tab.Screen name="Location" component={Location} />
                <Tab.Screen name="Search" component={Search} />
                <Tab.Screen name="Saved" component={Saved} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default App;