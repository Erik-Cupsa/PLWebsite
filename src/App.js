import React, { useEffect } from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Teams from './components/Teams';
import DataHandling from './components/DataHandling';
// import Contact from './components/Contact';
// import Portfolio from './components/Portfolio';
// import Work from './components/Work';
// import Tech from './components/About/Tech';
// import Dev from './components/About/Dev';

function App() {
  useEffect(() => {
    document.title = 'PremierZone Fantasy';
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="teams" element={<Teams />} />
          <Route path="data" element={<DataHandling />} />
          {/* <Route path="about/tech" element={<Tech />} />
          <Route path="about/dev" element={<Dev />} />
          <Route path="contact" element={<Contact />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="work" element={<Work />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;