import { useState } from 'react';

import './App.css';

import StateDropdown from './components/StateDropdown';
import DistrictDropdown from './components/DistrictDropdown';
import SubdistrictDropdown from './components/SubdistrictDropdown';
import VillageList from './components/VillageList';
import SearchVillage from './components/SearchVillage';

function App() {

  const [selectedState, setSelectedState] = useState('');

  const [selectedDistrict, setSelectedDistrict] = useState('');

  const [selectedSubdistrict, setSelectedSubdistrict] = useState('');

  return (

    <div>

      <nav className="navbar navbar-dark bg-dark px-4">

        <span className="navbar-brand mb-0 h1">
          All India Village API
        </span>

      </nav>

      <div className="container py-5">

        <div className="card shadow-lg p-4 border-0 main-card">

          <h1 className="text-center mb-3 page-title">
            Indian Geographical Data Platform
          </h1>

          <p className="text-center text-muted mb-5 page-subtitle">
            Search villages, districts and states across India
          </p>

          <StateDropdown
            selectedState={selectedState}
            setSelectedState={setSelectedState}
          />

          {selectedState && (

            <DistrictDropdown
              stateId={selectedState}
              selectedDistrict={selectedDistrict}
              setSelectedDistrict={setSelectedDistrict}
            />
          )}

          {selectedDistrict && (

            <SubdistrictDropdown
              districtId={selectedDistrict}
              selectedSubdistrict={selectedSubdistrict}
              setSelectedSubdistrict={setSelectedSubdistrict}
            />
          )}

          {selectedSubdistrict && (

            <VillageList
              subdistrictId={selectedSubdistrict}
            />
          )}

          <SearchVillage />

          <div className="footer">
            Built with React, Node.js and PostgreSQL
          </div>

        </div>

      </div>

    </div>
  );
}

export default App;