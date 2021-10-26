import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { STUDENT_INFORMATION_LABEL } from '../constants/field'
import { refactorStudentDetailView } from '../utils'

const StudentDetail = ({ route }) => {
    const { student } = route.params

    const studentInformationList = refactorStudentDetailView(
        student,
        STUDENT_INFORMATION_LABEL
    )

    return (
        <View style={styles.wrapper}>
            {studentInformationList.map((row, index) => (
                <View key={index} style={styles.row}>
                    <Text style={styles.key}>{row.label}:</Text>
                    <Text style={styles.prop}>{row.text}</Text>
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 16,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    key: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    prop: {
        fontSize: 16,
        marginLeft: 24,
    },
})

export default StudentDetail
