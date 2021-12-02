import React from 'react'
import { LogBox } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import {
  createStackNavigator,
  CardStyleInterpolators
} from '@react-navigation/stack'

import { initializeApp, getApps, getApp } from 'firebase/app'

import MemoListScreen from './src/screens/MemoListScreen'
import MemoDetailScreen from './src/screens/MemoDetailScreen'
import MemoEditScreen from './src/screens/MemoEditScreen'
import MemoCreateScreen from './src/screens/MemoCreateScreen'
import LogInScreen from './src/screens/LogInScreen'
import SignUpScreen from './src/screens/SignUpScreen'

import { firebaseConfig } from './env'

// 画面上に出る黄色のWarningBoxを非表示
LogBox.ignoreLogs(['Setting a timer', 'AsyncStorage'])

// Firebase初期化
getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

// Navigation初期化
const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='LogIn'
        screenOptions={{
          headerStyle: { backgroundColor: '#467FD3' },
          headerTitleStyle: { color: '#FFFFFF' },
          headerTitle: 'Memo App',
          headerTintColor: '#FFFFFF',
          headerBackTitle: 'Back',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          gestureEnabled: true,
          gestureDirection: 'horizontal'
        }}
      >
        <Stack.Screen name='MemoList' component={MemoListScreen} />
        <Stack.Screen name='MemoDetail' component={MemoDetailScreen} />
        <Stack.Screen name='MemoEdit' component={MemoEditScreen} />
        <Stack.Screen name='MemoCreate' component={MemoCreateScreen} />
        <Stack.Screen
          name='LogIn'
          component={LogInScreen}
          options={{
            cardStyleInterpolator:
              CardStyleInterpolators.forFadeFromBottomAndroid
          }}
        />
        <Stack.Screen
          name='SignUp'
          component={SignUpScreen}
          options={{
            cardStyleInterpolator:
              CardStyleInterpolators.forFadeFromBottomAndroid
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}