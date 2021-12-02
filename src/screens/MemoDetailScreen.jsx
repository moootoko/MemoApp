import React, { useEffect, useState } from 'react'
import { View, ScrollView, Text, StyleSheet } from 'react-native'

import { shape, string } from 'prop-types'

import { getAuth } from 'firebase/auth'
import { getFirestore, collection, doc, onSnapshot } from 'firebase/firestore'

import CircleButton from '../components/CircleButton'

import { dateToString } from '../utils'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  memoHeader: {
    backgroundColor: '#467FD3',
    height: 96,
    justifyContent: 'center',
    paddingVertical: 24,
    paddingHorizontal: 19
  },
  memoTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    lineHeight: 32,
    fontWeight: 'bold'
  },
  memoDate: {
    color: '#FFFFFF',
    fontSize: 12,
    lineHeight: 16
  },
  memoBodyInner: {
    paddingHorizontal: 27,
    paddingVertical: 32,
    paddingBottom: 80
  },
  memoText: {
    fontSize: 16,
    lineHeight: 24
  }
})

MemoDetailScreen.propTypes = {
  route: shape({
    params: shape({ id: string })
  }).isRequired
}

export default function MemoDetailScreen({ navigation, route }) {
  const { id } = route.params
  const [memo, setMemo] = useState(null)

  useEffect(() => {
    const { currentUser } = getAuth()
    let unsubscribe = () => {}

    if (currentUser) {
      const db = getFirestore()
      const ref = doc(collection(db, `users/${currentUser.uid}/memos`), id)

      unsubscribe = onSnapshot(ref, (doc) => {
        const data = doc.data()
        setMemo({
          id: doc.id,
          bodyText: data.bodyText,
          updatedAt: data.updatedAt.toDate()
        })
      })
    }

    return unsubscribe
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.memoHeader}>
        <Text style={styles.memoTitle} numberOfLines={1}>
          {memo && memo.bodyText}
        </Text>
        <Text style={styles.memoDate}>
          {memo && dateToString(memo.updatedAt)}
        </Text>
      </View>

      <ScrollView>
        <View style={styles.memoBodyInner}>
          <Text style={styles.memoText}>{memo && memo.bodyText}</Text>
        </View>
      </ScrollView>

      <CircleButton
        style={{ top: 60, bottom: 'auto' }}
        name='edit-2'
        onPress={() =>
          navigation.navigate('MemoEdit', {
            id: memo.id,
            bodyText: memo.bodyText
          })
        }
      />
    </View>
  )
}
