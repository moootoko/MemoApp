import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Alert
} from 'react-native'

import { shape, string } from 'prop-types'

import { getAuth } from 'firebase/auth'
import { getFirestore, collection, doc, updateDoc } from 'firebase/firestore'

import CircleButton from '../components/CircleButton'

import { translateErrors } from '../utils'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputContainer: {
    flex: 1
  },
  input: {
    flex: 1,
    textAlignVertical: 'top',
    fontSize: 16,
    lineHeight: 24,
    paddingVertical: 32,
    paddingHorizontal: 27
  }
})

MemoEditScreen.propTypes = {
  route: shape({
    params: shape({ id: string, bodyText: string })
  }).isRequired
}

export default function MemoEditScreen({ navigation, route }) {
  const { id, bodyText } = route.params
  const [body, setBody] = useState(bodyText)

  const handlePress = () => {
    const { currentUser } = getAuth()

    if (currentUser) {
      const db = getFirestore()
      const ref = doc(collection(db, `users/${currentUser.uid}/memos`), id)

      updateDoc(
        ref,
        {
          bodyText: body,
          updatedAt: new Date()
        },
        { merge: true }
      )
        .then(() => {
          navigation.goBack()
        })
        .catch((error) => {
          const errorMsg = translateErrors(error.code)
          Alert.alert(errorMsg.title, errorMsg.description)
        })
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          value={body}
          multiline
          style={styles.input}
          onChangeText={(text) => setBody(text)}
        />
      </View>
      <CircleButton name='check' onPress={handlePress} />
    </KeyboardAvoidingView>
  )
}
