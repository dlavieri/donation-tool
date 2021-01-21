import React from 'react';

const Table = ({ children, headers }) => {

    return (
        <table className="table">
            <tr className="row">
                {headers.map(header => <th className="cell">{header}</th>)}
            </tr>
            {children}
        </table>
    )
}

export default Table;