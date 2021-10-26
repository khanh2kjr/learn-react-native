import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Provider } from 'react-redux'
import store from './store'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import {
    StudentList,
    StudentDetail,
    StudentUpdate,
    StudentCreate,
} from './screens'
import {
    STUDENT_LIST_NAVIGATOR,
    STUDENT_DETAIL_NAVIGATOR,
    STUDENT_UPDATE_NAVIGATOR,
    STUDENT_CREATE_NAVIGATOR,
} from './constants/navigator'

const Stack = createNativeStackNavigator()

const App = () => {
    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen
                            component={StudentList}
                            {...STUDENT_LIST_NAVIGATOR}
                        />
                        <Stack.Screen
                            component={StudentDetail}
                            {...STUDENT_DETAIL_NAVIGATOR}
                            options={({ route }) => ({
                                title: `Sinh viên: ${route.params.student.fullName}`,
                            })}
                        />
                        <Stack.Screen
                            component={StudentUpdate}
                            {...STUDENT_UPDATE_NAVIGATOR}
                            options={({ route }) => ({
                                title: `Cập nhật SV: ${route.params.student.fullName}`,
                            })}
                        />
                        <Stack.Screen
                            component={StudentCreate}
                            {...STUDENT_CREATE_NAVIGATOR}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaProvider>
        </Provider>
    )
}

export default App
