import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ActionButton from './ActionButton'

const StudentItem = ({ student, index, onPress, onDeletePress, onUpdatePress }) => {
    const handleDeletePress = () => {
        const { _id } = student

        !!onDeletePress && onDeletePress(_id)
    }

    const handleUpdatePress = () => {
        !!onUpdatePress && onUpdatePress(student)
    } 

    return (
        <TouchableOpacity
            style={[styles.wrapper, index === 1 && styles.firstStudentItem]}
            onPress={() => onPress(student)}
        >
            <View style={[styles.field, styles.index]}>
                <Text style={styles.textIndex}>{index}</Text>
            </View>
            <View style={styles.information}>
                <Text style={styles.field}>{student.studentCode}</Text>
                <Text style={styles.field}>{student.fullName}</Text>
            </View>
            <View style={styles.studentAction}>
                <ActionButton
                    style={styles.buttonDelete}
                    name="trash"
                    size={20}
                    color="white"
                    onPress={handleDeletePress}
                />
                <ActionButton
                    style={styles.buttonUpdate}
                    name="cogs"
                    size={20}
                    color="white"
                    onPress={handleUpdatePress}
                />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 16,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        alignItems: 'center',
    },
    index: {
        width: 50,
        height: 50,
        backgroundColor: '#749677',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textIndex: {
        color: '#ffffff',
        fontSize: 32,
    },
    information: {
        marginLeft: 16,
        justifyContent: 'space-evenly',
    },
    field: {
        fontSize: 16,
    },
    firstStudentItem: {
        marginTop: 8,
    },
    studentAction: {
        flexDirection: 'row',
        position: 'absolute',
        right: 8,
    },
    buttonDelete: {
        backgroundColor: '#fc1925',
        marginRight: 8,
    },
    buttonUpdate: {
        backgroundColor: '#188a0e',
    },
})

export default StudentItem
