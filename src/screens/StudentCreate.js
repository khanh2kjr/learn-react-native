import React from 'react'
import { ToastAndroid } from 'react-native'
import { useDispatch } from 'react-redux'
import { CustomStudentForm } from '../components'
import { STUDENT_LIST_NAVIGATOR } from '../constants/navigator'
import studentRequest from '../http-protocol/studentRequest'
import { getStudents } from '../store/studentSlice'

const StudentCreate = ({ navigation, route }) => {
    const dispatch = useDispatch()

    const handleStudentCreate = (_, student) => {
        const bodyRequest = { ...student }
        delete bodyRequest._id
        delete bodyRequest.__v

        studentRequest
            .createStudent(bodyRequest)
            .then(() => {
                ToastAndroid.showWithGravity(
                    'Thêm thành công!',
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
            buttonTitle="Thêm"
            onAction={handleStudentCreate}
            alertMessage="thêm mới"
            defaultValue={{
                studentCode: '',
                fullName: '',
                email: '',
                phoneNumber: '',
            }}
        />
    )
}

export default StudentCreate
