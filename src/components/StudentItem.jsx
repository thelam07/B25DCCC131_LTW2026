const StudentItem = ({ student, index, onDelete }) => {
    const { id, name, score, class: className } = student

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{name}</td>
            <td>{className}</td>
            <td>{`${score} / 10`}</td>
            <td>
                <button type="button" className="btn-delete" onClick={() => onDelete(id)}>
                    Xoá
                </button>
            </td>
        </tr>
    )
}
export default StudentItem