export const refactorStudentDetailView = (student, studentInformationLabel) => {
    const newStudent = { ...student }
    delete newStudent['_id']
    delete newStudent['__v']

    const resultPerfect = Object.keys(newStudent).map((key, index) => {
        return {
            label: studentInformationLabel[key],
            text: newStudent[key],
        }
    })

    return resultPerfect
}
