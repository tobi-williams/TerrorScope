import '../styling/Table.css';
import { useNavigate } from 'react-router-dom';

function Table({ data }) {
    const navigate = useNavigate();

    if (data === null) {
        return <p>No data available.</p>;
    }
    if (data.length === 0) {
        return <p>No data available.</p>;
    }

    const handleRowClick = (id) => {
        navigate(`/searchXL?id=${encodeURIComponent(id)}`);
    }

    return (
        // <table>
        //     <thead>
        //         <tr>
        //             {Object.keys(data[0]).map(key => (
        //                 <th key={key}>{key.toUpperCase()}</th>
        //             ))}
        //         </tr>
        //     </thead>
        //     <tbody>
        //         {data.map((item, index) => (
        //             <tr key={index}>
        //                 {Object.values(item).map((val, idx) => (
        //                     <td key={idx}>{val}</td>
        //                 ))}
        //             </tr>
        //         ))}
        //     </tbody>
        // </table>

        <table>
            <thead>
                <tr>
                    {Object.keys(data[0]).map(key => (
                        key !== 'id' ? <th key={key}>{key.toUpperCase()}</th> : null// Exclude 'id' from headers
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={item.id || index} onClick={() => handleRowClick(item.id)}> {/* Use ID if available, otherwise fallback to index */}
                        {Object.entries(item).map(([key, val], idx) => (
                            key !== 'id' ? <td key={idx}>{val}</td> : null // Exclude 'id' from display
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Table;