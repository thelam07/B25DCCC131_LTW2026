import StudentItem from './StudentItem'

const StudentTable = ({ students, onDelete }) => {
    return (
        <table className="student-table">
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Họ tên</th>
                    <th>Lớp</th>
                    <th>Điểm</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                {students.map((student, index) => (
                    <StudentItem
                        key={student.id}
                        student={student}
                        index={index}
                        onDelete={onDelete}
                    />
                ))}
            </tbody>
        </table>
    )
}
export default StudentTable