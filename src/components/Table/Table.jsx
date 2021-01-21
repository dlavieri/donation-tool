import React from 'react';

const Table = ({ children, headers }) => {

    return (
        <table className="table">
            <thead>
            <tr className="row">
                {headers.map(header => <th className="cell" key={header}>{header}</th>)}
            </tr>
            </thead>
            <tbody>
            {children}
            </tbody>
        </table>
    )
}

export default Table;