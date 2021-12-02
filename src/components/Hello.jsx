import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { bool, shape, string } from 'prop-types'

const styles = StyleSheet.create({
  text: {
    color: '#ffffff',
    backgroundColor: 'blue',
    fontSize: 40,
    fontWeight: 'bold',
    padding: 16
  }
})

Hello.propTypes = {
  children: string.isRequired,
  bang: bool,
  style: shape()
}

Hello.defaultProps = {
  bang: false,
  style: null
}

export default function Hello({ children, bang, style }) {
  return (
    <View>
      <Text style={[styles.text, style]}>
        {`Hello ${children}${bang ? '!' : ''}`}
      </Text>
    </View>
  )
}
