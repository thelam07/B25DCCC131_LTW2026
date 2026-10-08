import { useState } from 'react'

const EMPTY_FORM = { name: '', score: '', class: '' }

const StudentForm = ({ onAdd }) => {
    const [form, setForm] = useState(EMPTY_FORM)

    const [error, setError] = useState('')

    const { name, score, class: className } = form

    const handleChange = (e) => {
        const { name: field, value } = e.target
        setForm({ ...form, [field]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (name.trim() === '' || score.trim() === '' || className.trim() === '') {
            setError('Vui lòng nhập đầy đủ Họ tên, Điểm số và Lớp!')
            return
        }

        const diem = Number(score)
        if (Number.isNaN(diem)) {
            setError('Điểm số phải là một số hợp lệ!')
            return
        }

        if (diem < 0 || diem > 10) {
            setError(`Điểm "${score}" không hợp lệ. Điểm phải từ 0 đến 10!`)
            return
        }

        onAdd({ name: name.trim(), score: diem, class: className.trim() })
        setForm(EMPTY_FORM)
        setError('')
    }

    return (
        <form className="student-form" onSubmit={handleSubmit}>
            <h2>Thêm sinh viên mới</h2>

            <label>
                Họ tên
                <input type="text" name="name" value={name} onChange={handleChange} />
            </label>

            <label>
                Điểm số
                <input type="number" name="score" step="0.1" value={score} onChange={handleChange} />
            </label>

            <label>
                Lớp
                <input type="text" name="class" value={className} onChange={handleChange} />
            </label>

            <button type="submit" className="btn-add">Thêm</button>

            {error && <p className="error-message">{error}</p>}
        </form>
    )
}

export default StudentForm