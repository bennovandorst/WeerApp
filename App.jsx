import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Location from './src/screens/Location'; 
import Search from './src/screens/Search';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
                        } else if (route.name === 'Search') {
                            iconName = 'magnify';
                        }

                        return <Icon name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: '#0D47A1',
                    tabBarInactiveTintColor: 'gray',
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: 'transparent',
                        borderTopWidth: 0,
                        position: 'absolute',
                        elevation: 0
                    },
                })}
            >
                <Tab.Screen name="Location" component={Location} />
                <Tab.Screen name="Search" component={Search} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default App;