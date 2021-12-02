import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

import { string, shape, func } from 'prop-types'

import { Feather } from '@expo/vector-icons'

const styles = StyleSheet.create({
  circleButton: {
    backgroundColor: '#467FD3',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 40,
    bottom: 40,
    elevation: 8
  },
  circleButtonLabel: {
    color: '#FFFFFF',
    fontSize: 40,
    lineHeight: 40
  }
})

CircleButton.propTypes = {
  style: shape(),
  name: string.isRequired,
  onPress: func
}

CircleButton.defaultProps = {
  style: null,
  onPress: null
}

export default function CircleButton({ style, name, onPress }) {
  return (
    <TouchableOpacity style={[styles.circleButton, style]} onPress={onPress}>
      <Feather name={name} size={32} color='white' />
    </TouchableOpacity>
  )
}
