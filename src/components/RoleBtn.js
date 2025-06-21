import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function RoleBtn({onPress, Role}) {
    return (
        <TouchableOpacity onPress={() => {onPress}} >
        <Text>{Role}</Text>
        </TouchableOpacity>
    )
}