import React, { useState, useEffect } from 'react';
import { data } from './data';
// import fetchData from './utils/fetchData';
import Row from './components/Row/Row';
import Table from './components/Table/Table';
import Modal from './components/Modal/Modal';
import Button from './components/Button/Button'
import './App.css';
import donationsCtx from './context/donationsCtx'
import modalCtx from './context/modalCtx';

function App() {
  const [ donations, setDonations ] = useState([]);
  const [ pageNumber, setPageNumber ] = useState(1);
  const [ modal, setModal ] = useState({open: false, id: null});



  useEffect(() => {
    // fetch first page of donations from API
    // const data = fetchData(`https://givelively.api/donations?page=${pageNumber}`, { method: 'GET'});
    // setDonations(data.donations)
    // 

    setDonations(data[pageNumber-1])
  },[pageNumber])

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
          <div className="pagination">
            {pageNumber > 1 && <Button onClick={() => setPageNumber(prev => prev-1)}>Previous Page</Button>}
            <Button onClick={() => setPageNumber(prev => prev+1)}>Next Page</Button>
          </div>
          {modal.open && <Modal />}
        </donationsCtx.Provider>
      </modalCtx.Provider>
    </div>
  );
}

export default App;
