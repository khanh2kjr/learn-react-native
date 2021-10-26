import React from 'react'
import { ToastAndroid } from 'react-native'
import { useDispatch } from 'react-redux'
import { CustomStudentForm } from '../components'
import { STUDENT_LIST_NAVIGATOR } from '../constants/navigator'
import studentRequest from '../http-protocol/studentRequest'
import { getStudents } from '../store/studentSlice'

const StudentUpdate = ({ navigation, route }) => {
    const dispatch = useDispatch()

    const handleStudentUpdate = (id, student) => {
        const bodyRequest = { ...student }
        delete bodyRequest._id
        delete bodyRequest.__v

        studentRequest
            .updateStudent(id, bodyRequest)
            .then(() => {
                ToastAndroid.showWithGravity(
                    'Sửa thành công!',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                )
                navigation.navigate(STUDENT_LIST_NAVIGATOR.name)
                dispatch(getStudents())
            })
            .catch((err) => {
                console.log(err)
                console.warn('Failed')
            })
    }

    return (
        <CustomStudentForm
            navigation={navigation}
            route={route}
            buttonTitle="Cập nhật"
            onAction={handleStudentUpdate}
            alertMessage="sửa"
        />
    )
}

export default StudentUpdate
