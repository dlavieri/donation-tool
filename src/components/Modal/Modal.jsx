import React, { useRef, useContext, useEffect, useState } from 'react';
import fetchData from '../../utils/fetchData';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import modalCtx from '../../context/modalCtx';
import donationsCtx from '../../context/donationsCtx';

const Modal = () => {
    const [ modal, setModal ] = useContext(modalCtx);
    const [ donations, setDonations ] = useContext(donationsCtx);
    const [ street, setStreet ] = useState('')
    const [ city, setCity ] = useState('')
    const [ state, setState ] = useState('')
    const [ zip, setZip ] = useState('')

    const modalRef = useRef(null)

    useOnClickOutside(modalRef, () => setModal({...modal, open: false}))

    useEffect(() => {
        if (modal.id) {
            let selectedOrg = donations.filter(d => d._id === modal.id)[0];
            let splitAddress = selectedOrg.address.split(',');
            setStreet(splitAddress[0]);
            setCity(splitAddress[1]);
            setState(splitAddress[2]);
            setZip(splitAddress[3]);
        }

    }, [modal])

    function handleSubmit(e) {
        e.preventDefault()
        // post new address data to API
        let address = [street, city, state, zip].join(',');
        // const data = fetchData(`https://givelively.api/nonprofit/${_id}`, { method: 'PUT', body: { address: address}});
        // if (data.ok) {
        let update = [...donations].map(donation => {
            if (donation._id === modal.id) {
                donation.address = address;
            }
            return donation
        });
        setDonations(update);
        setModal({...modal, open: false})
    }


    return (
        <>
            <div className="modal" id="modal" ref={modalRef}>
                <form>
                    <div className="form-row">
                        <label htmlFor="street">Street Address</label>
                        <input value={street} name="street" onChange={(e) => setStreet(e.target.value)}/>
                    </div>
                    <div className="form-row">
                        <label htmlFor="city">City</label>
                        <input value={city} name="city" onChange={(e) => setCity(e.target.value)}/>
                    </div>
                    <div className="form-row">
                        <label htmlFor="state">State/Province</label>
                        <input value={state} name="state" onChange={(e) => setState(e.target.value)}/>
                    </div>
                    <div className="form-row">
                        <label htmlFor="zip">Zipcode</label>
                        <input value={zip} name="zip" onChange={(e) => setZip(e.target.value)}/>
                    </div>
                    <button className="btn primary" onClick={handleSubmit}>Submit</button>
                </form>
            </div>
            <div className="modal-shadow"/>
        </>
    )
}

export default Modal;