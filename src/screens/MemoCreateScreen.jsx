import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Alert
} from 'react-native'

import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { getAuth } from '@firebase/auth'

import CircleButton from '../components/CircleButton'

import { translateErrors } from '../utils'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputContainer: {
    flex: 1,
    paddingHorizontal: 27,
    paddingVertical: 32
  },
  input: {
    flex: 1,
    textAlignVertical: 'top',
    fontSize: 16,
    lineHeight: 24
  }
})

export default function MemoCreateScreen({ navigation }) {
  const [bodyText, setBodyText] = useState('')

  const handlePress = () => {
    const { currentUser } = getAuth()
    const db = getFirestore()
    const ref = collection(db, `users/${currentUser.uid}/memos`)

    addDoc(ref, {
      bodyText,
      updatedAt: new Date()
    })
      .then(() => {
        navigation.goBack()
      })
      .catch((error) => {
        const errorMsg = translateErrors(error.code)
        Alert.alert(errorMsg.title, errorMsg.description)
      })
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          value={bodyText}
          multiline
          style={styles.input}
          onChangeText={(text) => setBodyText(text)}
          autoFocus
        />
      </View>
      <CircleButton name='check' onPress={handlePress} />
    </KeyboardAvoidingView>
  )
}
