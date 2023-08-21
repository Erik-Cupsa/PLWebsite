import React, { useEffect, useState } from "react";
import Loader from "react-loaders";
import { Link } from 'react-router-dom';
import "./index.scss";
import AnimatedLetters from "../AnimatedLetters";
import positionData from "../../data/positions.json";

const Positions = () => {
    const [letterClass, setLetterClass] = useState('text-animate');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPositions, setFilteredPositions] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLetterClass("text-animate-hover");
        }, 3000); 

        return () => { 
            clearTimeout(timer);
        }
    }, []);

    useEffect(() => {
        const filtered = positionData.positions.filter(position =>
            position.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredPositions(filtered);
    }, [searchQuery]);

    const handleSearchChange = event => {
        setSearchQuery(event.target.value);
    };

    const renderPosition = (positions) => { 
        return (
          <div className="images-container">
            {positions.map((position, idx) => (
              <div key={idx} className="image-box">
                <img src={position.cover} alt="positions" className="teams-image" />
                <div className="content">
                  <p className="title">{position.title}</p>
                  <Link className="btn" to={`/data?position=${encodeURIComponent(position.search)}`}>
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )
    };

    return (
        <>
            <div className="container teams-page">
                <h1 className="page-title">
                    <br/>
                    <AnimatedLetters letterClass={letterClass} strArray={"Positions".split("")} idx={15}/>
                </h1>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search for positions"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
                <div>{renderPosition(filteredPositions)}</div>
            </div>
            <Loader type="pacman"/>
        </>
    );
}

export default Positions;
