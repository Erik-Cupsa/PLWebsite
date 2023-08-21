import React, { useEffect } from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Teams from './components/Teams';
import TeamData from './components/TeamData';
import Nation from "./components/Nation";
import Position from "./components/Position";
import Search from "./components/Search";

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
          <Route path="data" element={<TeamData />} />
          <Route path="nation" element={<Nation />} />
          <Route path="position" element={<Position />} />
          <Route path="search" element={<Search />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;