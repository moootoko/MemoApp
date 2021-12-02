import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Feather } from '@expo/vector-icons'

import { shape, string, arrayOf } from 'prop-types'

import { getAuth } from '@firebase/auth'
import { getFirestore, doc, collection, deleteDoc } from 'firebase/firestore'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  memoListItem: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 19,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.15)'
  },
  memoInner: {
    flex: 1
  },
  memoListItemTitle: {
    fontSize: 16,
    lineHeight: 32
  },
  memoListItemDate: {
    fontSize: 12,
    lineHeight: 16,
    color: '#848484'
  },
  memoDelete: {
    padding: 8
  }
})

MemoList.propTypes = {
  memos: arrayOf(
    shape({
      id: string,
      bodyText: string,
      updatedAt: string
    })
  ).isRequired
}

export default function MemoList({ memos }) {
  const navigation = useNavigation()

  const deleteMemo = (id) => {
    const { currentUser } = getAuth()
    if (currentUser) {
      const db = getFirestore()
      const ref = doc(collection(db, `users/${currentUser.uid}/memos`), id)
      // style:destructiveはiOSのみ
      Alert.alert('メモを削除します', 'よろしいですか？', [
        {
          text: 'キャンセル',
          onPress: () => {}
        },
        {
          text: '削除する',
          style: 'destructive',
          onPress: () => {
            deleteDoc(ref).catch(() => {
              Alert.alert('削除に失敗しました。')
            })
          }
        }
      ])
    }
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.memoListItem}
        onPress={() => navigation.navigate('MemoDetail', { id: item.id })}
      >
        <View style={styles.memoInner}>
          <Text style={styles.memoListItemTitle} numberOfLines={1}>
            {item.bodyText}
          </Text>
          <Text style={styles.memoListItemDate}>
            {item.updatedAt.toString()}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.memoDelete}
          onPress={() => deleteMemo(item.id)}
        >
          <Feather name='x' size={24} color='#B0B0B0' />
        </TouchableOpacity>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={memos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}
