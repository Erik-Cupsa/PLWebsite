import React, { useEffect, useState } from "react";
import Loader from "react-loaders";
import { Link } from 'react-router-dom';
import "./index.scss";
import AnimatedLetters from "../AnimatedLetters";
import nationData from "../../data/nations.json";
import { ReactCountryFlag } from 'react-country-flag';

const Nations = () => {
    const [letterClass, setLetterClass] = useState('text-animate');

    useEffect(() => {
        const timer = setTimeout(() => {
            setLetterClass("text-animate-hover");
        }, 3000); 

        return () => { 
            clearTimeout(timer);
        }
    });

    const renderCountryFlags = (countries) => {
        return (
          <div className="images-container">
            {countries.map((country, idx) => (
              <div key={idx} className="image-box">
                <ReactCountryFlag
                  countryCode={country.code}
                  svg
                  style={{
                    width: '100%',
                    height: '100%', 
                  }}
                />
                <div className="content">
                  <p className="title">{country.name}</p>
                  <Link className="btn" to={`/data?nation=${encodeURIComponent(country.search)}`}>
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        );
      };
      return (
        <>
          <div className="container nation-page">
            <h1 className="page-title">
              <AnimatedLetters letterClass={letterClass} strArray={"Nations".split("")} idx={15} />
            </h1>
            <div>{renderCountryFlags(nationData.nations)}</div>
          </div>
          <Loader type="pacman" />
        </>
      );
}
  

export default Nations