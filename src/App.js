import React, { useState, useEffect, useRef } from 'react';
import { data } from './data';
// import fetchData from './utils/fetchData';
import useIntersection from './hooks/useIntersection';
import Row from './components/Row/Row';
import Table from './components/Table/Table';
import Modal from './components/Modal/Modal';
import './App.css';
import donationsCtx from './context/donationsCtx'
import modalCtx from './context/modalCtx';

function App() {
  const [ donations, setDonations ] = useState([]);
  const [ pageNumber, setPageNumber ] = useState(0);
  const [ lastPage, setLastPage ] = useState(null)
  const [ modal, setModal ] = useState({open: false, id: null});

  const observerRef = useRef();

  useEffect(() => {
    // fetch first page of donations from API
    // const data = fetchData(`https://givelively.api/donations?page=${pageNumber}`, { method: 'GET'});
    // if (data.ok) {
    // setDonations(data.donations)
    // } else { throw Error('unable to get donations from API')}
    setLastPage(5)
    setDonations(data[0])
  },[])

  function concatNextPage(){
    if (pageNumber < lastPage) {
      let currentPage = [...donations];
      let nextPage = data[pageNumber+1];
      setDonations([...currentPage, ...nextPage]);
      setPageNumber(prev => prev+1);
    } else return
    
  }

  useIntersection(observerRef, concatNextPage)

  return (
    <div className="App">
      <modalCtx.Provider value={[modal, setModal]}>
        <donationsCtx.Provider value={[donations, setDonations]}>
          <Table headers={['Nonprofit', 'Mailing Address', 'Amount USD', 'Edit', 'Send']}>
          {donations.map((d,idx) => <Row 
            key={d._id} 
            _id={d._id} 
            name={d.name} 
            amount={d.amount} 
            address={d.address} 
            altColor={idx%2 === 0}/>)}
          </Table>
          {modal.open && <Modal />}
          <div className="observer" ref={observerRef}></div>
        </donationsCtx.Provider>
      </modalCtx.Provider>
    </div>
  );
}

export default App;
