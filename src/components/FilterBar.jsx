const FILTERS = [
    { value: 'all', label: 'Tất cả' },
    { value: 'good', label: 'Giỏi (>= 8)' },
    { value: 'fail', label: 'Trượt môn (< 5)' },
]

const FilterBar = ({ filter, onChangeFilter }) => (
    <div className="filter-bar">
        <span>Lọc danh sách: </span>
        {FILTERS.map(({ value, label }) => (
            <button
                key={value}
                type="button"
                className={`btn-filter ${filter === value ? 'active' : ''}`}
                onClick={() => onChangeFilter(value)}
            >
                {label}
            </button>
        ))}
    </div>
)

export default FilterBar