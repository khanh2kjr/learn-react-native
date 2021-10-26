import React, { useEffect, useRef, useState } from 'react'
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    ToastAndroid,
    TouchableOpacity,
    View,
    Text,
    ActivityIndicator,
} from 'react-native'
import { SearchBar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useDispatch, useSelector } from 'react-redux'
import { StudentItem } from '../components'
import {
    STUDENT_CREATE_NAVIGATOR,
    STUDENT_DETAIL_NAVIGATOR,
    STUDENT_UPDATE_NAVIGATOR,
} from '../constants/navigator'
import { PROMISE_STATUS } from '../constants/redux'
import studentRequest from '../http-protocol/studentRequest'
import { getStudents } from '../store/studentSlice'

const StudentList = ({ navigation }) => {
    const [studentList, keyword, limit, promiseStatus] = useSelector(
        ({ STUDENT_SLICE }) => [
            STUDENT_SLICE.studentList,
            STUDENT_SLICE.keyword,
            STUDENT_SLICE.limit,
            STUDENT_SLICE.promiseStatus,
        ]
    )

    const [searchValue, setSearchValue] = useState(keyword || '')

    const dispatch = useDispatch()

    const typingSearchRef = useRef()

    const handleSearchChange = (text) => {
        setSearchValue(text)

        if (typingSearchRef.current) {
            clearTimeout(typingSearchRef.current)
        }

        typingSearchRef.current = setTimeout(() => {
            dispatch(getStudents({ limit, keyword: text }))
        }, 300)
    }

    const executeDelete = (id) => {
        studentRequest
            .deleteStudent(id)
            .then(() => {
                ToastAndroid.showWithGravity(
                    'Xoá thành công!',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                )
                dispatch(getStudents())
            })
            .catch(() => {
                console.warn('Failed')
            })
    }

    const handleStudentPress = (student) => {
        navigation.navigate(STUDENT_DETAIL_NAVIGATOR.name, { student })
    }

    const handleDeletePress = (id) => {
        Alert.alert(
            'Cảnh báo!',
            'Bạn có chắc chắn muốn xóa sinh viên này không?',
            [
                {
                    text: 'Hủy',
                    onPress: () => {},
                },
                {
                    text: 'Đồng ý',
                    onPress: () => executeDelete(id),
                },
            ]
        )
    }

    const handleUpdatePress = (student) => {
        navigation.navigate(STUDENT_UPDATE_NAVIGATOR.name, { student })
    }

    const handleButtonPlusPress = () => {
        navigation.navigate(STUDENT_CREATE_NAVIGATOR.name, {})
    }

    const handleLoadMorePress = () => {
        dispatch(getStudents({ keyword: searchValue, limit: limit + 3 }))
    }

    useEffect(() => {
        dispatch(getStudents({ limit, keyword: keyword || null }))
    }, [])

    return (
        <SafeAreaView style={styles.wrapper}>
            <SearchBar
                lightTheme
                placeholder="Tìm kiếm"
                onChangeText={handleSearchChange}
                value={searchValue}
            />
            <ScrollView>
                {studentList.length === 0 ? (
                    <View style={styles.emptyArrayContainer}>
                        <Text style={styles.emptyArrayText}>
                            Không có dữ liệu
                        </Text>
                    </View>
                ) : (
                    studentList.map((student, index) => (
                        <StudentItem
                            key={index}
                            index={index + 1}
                            student={student}
                            onPress={handleStudentPress}
                            onDeletePress={handleDeletePress}
                            onUpdatePress={handleUpdatePress}
                        />
                    ))
                )}
            </ScrollView>
            {studentList.length >= 8 ? (
                <View style={styles.footer}>
                    <TouchableOpacity
                        onPress={handleLoadMorePress}
                        style={styles.loadMoreBtn}
                    >
                        <Text style={styles.btnText}>Load More</Text>
                        {promiseStatus === PROMISE_STATUS.pending ? (
                            <ActivityIndicator
                                color="white"
                                style={{ marginLeft: 8 }}
                            />
                        ) : null}
                    </TouchableOpacity>
                </View>
            ) : null}
            <TouchableOpacity
                style={styles.buttonPlus}
                onPress={handleButtonPlusPress}
            >
                <Icon name="plus" color="white" size={20} />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        padding: 16,
        backgroundColor: '#d4d4d4',
    },
    buttonPlus: {
        position: 'absolute',
        backgroundColor: '#09c2d6',
        borderRadius: 50,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 12,
        bottom: 16,
    },
    emptyArrayContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 16,
    },
    emptyArrayText: {
        fontSize: 24,
    },
    footer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    loadMoreBtn: {
        padding: 10,
        backgroundColor: '#800000',
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
    },
})

export default StudentList
