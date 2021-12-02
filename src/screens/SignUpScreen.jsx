import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native'

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

import Button from '../components/Button'
import { translateErrors } from '../utils'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8'
  },
  inner: {
    paddingHorizontal: 27,
    paddingVertical: 24
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold',
    marginBottom: 24
  },
  input: {
    fontSize: 16,
    height: 48,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    marginBottom: 16
  },
  footer: {
    flexDirection: 'row'
  },
  footerText: {
    fontSize: 14,
    lineHeight: 24,
    marginRight: 8
  },
  footerLink: {
    fontSize: 14,
    lineHeight: 24,
    color: '#467FD3'
  }
})

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handlePress = () => {
    const auth = getAuth()
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'MemoList' }]
        })
      })
      .catch((error) => {
        const errorMsg = translateErrors(error.code)
        Alert.alert(errorMsg.title, errorMsg.description)
      })
  }

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          value={email}
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize='none'
          keyboardType='email-address'
          placeholder='Email Address'
          textContentType='emailAddress'
        />
        <TextInput
          value={password}
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          autoCapitalize='none'
          placeholder='Password'
          secureTextEntry
          textContentType='password'
        />
        <Button label='Submit' onPress={handlePress} />
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already registered?</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: 'LogIn' }]
              })
            }
          >
            <Text style={styles.footerLink}>Log In.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
