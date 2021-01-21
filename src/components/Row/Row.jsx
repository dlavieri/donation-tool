import React, { useContext } from 'react';
import cn from 'classnames';
import Button from '../Button/Button';
// import fetchData from '../../utils/fetchData';
import modalCtx from '../../context/modalCtx';
import donationsCtx from '../../context/donationsCtx';

const Row = ({ name, address, amount, _id, altColor }) => {
    const [ modal, setModal ] = useContext(modalCtx);
    const [ donations, setDonations ] = useContext(donationsCtx)

    const classnames = cn({
        'cell': true,
        'alt-color': altColor
    })

    function formatAddress(fullAddress) {
        return address.split(',')[0]
    }

    function handleSend() {
        // post check data to API
        // const date = new Date();
        // const data = fetchData(`https://givelively.api/nonprofit/${_id}/checks`, { method: 'POST', body: { datePosted: date, amount: amount}});
        // if (data.ok) {
        let updatedDonations = [...donations].filter(d => d._id !== _id);
        setDonations(updatedDonations);
        // } else { throw Error('Error posting to API')}
    }

    function handleEdit() {
        setModal({ open: true, id: _id });
    }

    return (
        <tr className="row">
            <td className={classnames}>{name}</td>
            <td className={classnames}>{formatAddress(address)}</td>
            <td className={classnames}>${amount}</td>
            <td className="cell btn">
                <Button
                    primary={false}
                    onClick={handleEdit}>
                    Edit
                </Button>
            </td>
            <td className="cell btn">
                <Button
                    primary
                    onClick={handleSend}>
                    Send
                </Button>
            </td>
        </tr>
    )
}

export default Row;