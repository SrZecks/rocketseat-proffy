import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

import Study from '../pages/Study';
import Favorites from '../pages/Favorites';

const { Navigator, Screen } = createBottomTabNavigator();

function StudyTabs() {
    return (
        <Navigator
            tabBarOptions={{
                style: {
                    elevation: 0,
                    shadowOpacity: 0,
                    height: 64
                },
                tabStyle: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                },
                iconStyle: {
                    flex: 0,
                    width: 20,
                    height: 20
                },
                labelStyle: {
                    fontFamily: 'Archivo_700Bold',
                    fontSize: 13,
                    margin: 16
                },
                inactiveBackgroundColor: '#fafafc',
                activeBackgroundColor: '#ebebf5',
                inactiveTintColor: '#c1bccc',
                activeTintColor: '#32264d'
            }}
        >
            <Screen
                name='Study'
                component={Study}
                options={{
                    tabBarLabel: 'Proffys',
                    tabBarIcon: ({ color, size, focused }) => { return <Ionicons name="ios-easel" color={focused ? '#8257e5' : color} size={size} /> }
                }}
            />
            <Screen
                name='Favorites'
                component={Favorites}
                options={{
                    tabBarLabel: 'Favorites',
                    tabBarIcon: ({ color, size, focused }) => { return <Ionicons name="ios-heart" color={focused ? '#8257e5' : color} size={size} /> }
                }}
            />
        </Navigator>
    )
}

export default StudyTabs;