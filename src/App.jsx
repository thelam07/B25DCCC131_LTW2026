import { useState } from "react";
import StudentTable from "./components/StudentTable";
import { initialStudents } from "./data/students";
import StudentForm from "./components/StudentForm";
import FilterBar from "./components/FilterBar";
import Statistics from "./components/Statistics";

const App = () => {
  const [students, setStudents] = useState(initialStudents)

  const [filter, setFilter] = useState('all')

  const handleAdd = (newStudent) => {
    setStudents([...students, { id: Date.now(), ...newStudent }])
  }
  const handleDelete = (id) => {
    setStudents(students.filter((student) => student.id !== id))
  }
  const filteredStudents = students.filter(({ score }) => {
    if (filter === 'good') return score >= 8
    if (filter === 'fail') return score < 5
    return true
  })
  return (
    <div className="app">
      <h1>Quản lý Điểm Sinh viên</h1>
      <StudentForm onAdd={handleAdd} />
      <Statistics students={students} />
      <FilterBar filter={filter} onChangeFilter={setFilter} />
      <StudentTable students={filteredStudents} onDelete={handleDelete} />

    </div>
  )
}
export default App