import { configureStore } from '@reduxjs/toolkit'
import { STUDENT_SLICE } from '../constants/redux'

import studentReducer from './studentSlice'

const rootReducer = {
    [STUDENT_SLICE]: studentReducer,
}

export default configureStore({
    reducer: rootReducer,
})
