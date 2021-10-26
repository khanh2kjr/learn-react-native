import React from 'react'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

const ActionButton = ({ style, ...otherProps }) => {
    return <Button icon={<Icon {...otherProps} />} buttonStyle={style} />
}

export default ActionButton
