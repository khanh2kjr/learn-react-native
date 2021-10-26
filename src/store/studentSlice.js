import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import studentRequest from '../http-protocol/studentRequest'
import {
    THUNK_GET_STUDENTS,
    STUDENT_SLICE,
    PROMISE_STATUS,
} from '../constants/redux'

export const getStudents = createAsyncThunk(
    THUNK_GET_STUDENTS,
    async (query) => {
        try {
            const response = await studentRequest.getStudents(query)
            return response.data.data
        } catch (error) {
            console.error(error)
        }
    }
)

const INITIAL_STATE = {
    studentList: [],
    keyword: '',
    limit: 8,
    promiseStatus: null,
}

const studentSlice = createSlice({
    name: STUDENT_SLICE,
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: {
        [getStudents.pending]: (state) => {
            state.promiseStatus = PROMISE_STATUS.pending
        },
        [getStudents.fulfilled]: (state, action) => {
            state.studentList = action.payload
            state.promiseStatus = PROMISE_STATUS.fulfilled
        },
        [getStudents.rejected]: (state) => {
            state.promiseStatus = PROMISE_STATUS.rejected
        },
    },
})

const { reducer } = studentSlice

export default reducer
