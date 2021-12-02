import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'

import { func, shape, string } from 'prop-types'

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#467FD3',
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 24
  },
  buttonLabel: {
    fontSize: 16,
    lineHeight: 32,
    paddingVertical: 8,
    paddingHorizontal: 32,
    color: '#FFFFFF'
  }
})

Button.propTypes = {
  label: string.isRequired,
  onPress: func,
  style: shape()
}

Button.defaultProps = {
  onPress: null,
  style: null
}

export default function Button({ label, onPress, style }) {
  return (
    <TouchableOpacity style={[styles.buttonContainer, style]} onPress={onPress}>
      <Text style={styles.buttonLabel}>{label}</Text>
    </TouchableOpacity>
  )
}
