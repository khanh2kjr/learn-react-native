import React, { useMemo, useState } from 'react'
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import { Button } from 'react-native-elements'
import { STUDENT_FIELD, STUDENT_INFORMATION_LABEL } from '../constants/field'
import { refactorStudentDetailView } from '../utils'
import {
    STUDENT_LIST_NAVIGATOR,
    STUDENT_UPDATE_NAVIGATOR,
} from '../constants/navigator'

const CustomStudentForm = ({
    navigation,
    route,
    buttonTitle,
    defaultValue,
    alertMessage,
    onAction,
}) => {
    const student = route.params?.student
    const [studentForm, setStudentForm] = useState(
        student?.studentCode ? student : defaultValue
    )

    const isInputDisabed = (index) => {
        return route.name === STUDENT_UPDATE_NAVIGATOR.name
            ? index !== 0
                ? true
                : false
            : true
    }

    const studentInformationList = refactorStudentDetailView(
        student ?? STUDENT_FIELD,
        STUDENT_INFORMATION_LABEL
    )

    const handleFieldChange = (text, key) => {
        setStudentForm((studentPrevios) => ({
            ...studentPrevios,
            [key]: text,
        }))
    }

    const handleClosePress = () => {
        navigation.navigate(STUDENT_LIST_NAVIGATOR.name)
    }

    const handleMainButtonPress = () => {
        Alert.alert(
            'Cảnh báo!',
            `Bạn có chắc chắn muốn ${alertMessage} sinh viên này không?`,
            [
                {
                    text: 'Hủy',
                    onPress: () => {},
                },
                {
                    text: 'Đồng ý',
                    onPress: () => {
                        !!onAction && onAction(student?._id, studentForm)
                    },
                },
            ]
        )
    }

    return (
        <View style={styles.wrapper}>
            {studentInformationList.map((row, index) => {
                return (
                    <View key={index} style={styles.row}>
                        <Text style={styles.key}>{row.label}:</Text>
                        <TextInput
                            editable={isInputDisabed(index)}
                            style={styles.inputField}
                            value={
                                studentForm[Object.keys(STUDENT_FIELD)[index]]
                            }
                            onChangeText={(text) =>
                                handleFieldChange(
                                    text,
                                    Object.keys(STUDENT_FIELD)[index]
                                )
                            }
                        />
                    </View>
                )
            })}
            <View style={styles.actionButton}>
                <Button
                    title="Thoát"
                    buttonStyle={styles.closeButton}
                    onPress={handleClosePress}
                />
                <Button title={buttonTitle} onPress={handleMainButtonPress} />
            </View>
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
        marginBottom: 16,
        justifyContent: 'space-between',
    },
    key: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    prop: {
        fontSize: 16,
        marginLeft: 24,
    },
    inputField: {
        backgroundColor: '#ffffff',
        height: 40,
        width: 200,
        borderWidth: 1,
        borderRadius: 3,
        marginLeft: 16,
        padding: 10,
    },
    actionButton: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    mainButton: {
        marginLeft: 16,
    },
    closeButton: {
        marginRight: 16,
        backgroundColor: '#fc1925',
    },
})

export default CustomStudentForm
