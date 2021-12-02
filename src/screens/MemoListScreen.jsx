import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Alert, Text } from 'react-native'

import { getAuth } from '@firebase/auth'
import {
  getFirestore,
  collection,
  onSnapshot,
  orderBy,
  query
} from 'firebase/firestore'

import MemoList from '../components/MemoList'
import Button from '../components/Button'
import CircleButton from '../components/CircleButton'
import LogOutButton from '../components/LogOutButton'
import Loading from '../components/Loading'

import { dateToString } from '../utils'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8'
  }
})

const emptyStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inner: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    marginBottom: 24
  },
  button: {
    alignSelf: 'center'
  }
})

export default function MemoListScreen({ navigation }) {
  const [memos, setMemos] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogOutButton />
    })
  }, [])

  useEffect(() => {
    const { currentUser } = getAuth()

    let unsubscribe = () => {}

    if (currentUser) {
      setIsLoading(true)
      const db = getFirestore()
      const q = query(
        collection(db, `users/${currentUser.uid}/memos`),
        orderBy('updatedAt', 'desc')
      )
      unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const userMemos = []
          snapshot.forEach((doc) => {
            const data = doc.data()
            userMemos.push({
              id: doc.id,
              bodyText: data.bodyText,
              updatedAt: dateToString(data.updatedAt.toDate())
            })
          })
          setMemos(userMemos)
          setIsLoading(false)
        },
        (error) => {
          setIsLoading(false)
          Alert.alert(error.code, error.message)
        }
      )
    }

    return unsubscribe
  }, [])

  if (memos.length === 0) {
    return (
      <View style={emptyStyles.container}>
        <Loading isLoading={isLoading} />
        <View style={emptyStyles.inner}>
          <Text style={emptyStyles.title}>最初のメモを作成しよう!!</Text>
          <Button
            style={emptyStyles.button}
            label='作成する'
            onPress={() => {
              navigation.navigate('MemoCreate')
            }}
          />
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <MemoList memos={memos} />
      <CircleButton
        name='plus'
        onPress={() => navigation.navigate('MemoCreate')}
      />
    </View>
  )
}
