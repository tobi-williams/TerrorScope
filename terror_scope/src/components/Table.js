import '../styling/Table.css';

function Table({ data }) {
    if (data === null) {
        return <p>No data available.</p>;
    }
    if (data.length === 0) {
        return <p>No data available.</p>;
    }

    return (
        <table>
            <thead>
                <tr>
                    {Object.keys(data[0]).map(key => (
                        <th key={key}>{key.toUpperCase()}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        {Object.values(item).map((val, idx) => (
                            <td key={idx}>{val}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Table;