// src/components/Statistics.jsx

const Statistics = ({ students }) => {
    const total = students.length

    const sum = students.reduce((acc, { score }) => acc + score, 0)

    const average = total === 0 ? 0 : sum / total

    const goodCount = students.filter(({ score }) => score >= 8).length
    const failCount = students.filter(({ score }) => score < 5).length

    return (
        <div className="statistics">
            <div className="stat-card">
                <span className="stat-value">{total}</span>
                <span className="stat-label">Tổng số sinh viên</span>
            </div>
            <div className="stat-card">
                <span className="stat-value">{`${average.toFixed(2)}`}</span>
                <span className="stat-label">Điểm trung bình lớp</span>
            </div>
            <div className="stat-card">
                <span className="stat-value">{goodCount}</span>
                <span className="stat-label">Sinh viên Giỏi</span>
            </div>
            <div className="stat-card">
                <span className="stat-value">{failCount}</span>
                <span className="stat-label">Trượt môn</span>
            </div>
        </div>
    )
}

export default Statistics
