import React, { useEffect, useState } from "react";
import Loader from "react-loaders";
import "./index.scss";
import AnimatedLetters from "../AnimatedLetters";

const Search = () => {
    const [letterClass, setLetterClass] = useState('text-animate');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setLetterClass("text-animate-hover");
        }, 3000); 

        return () => { 
            clearTimeout(timer);
        }
    }, []);

    const handleSearchChange = event => {
        setSearchQuery(event.target.value);
    };

    const handleGoButtonClick = () => {
        window.location.href = `/data?name=${encodeURIComponent(searchQuery)}`;
    };

    return (
        <>
            <div className="container teams-page">
                <h1 className="page-title">
                    <br/>
                    <br/>
                    <AnimatedLetters letterClass={letterClass} strArray={"Search".split("")} idx={15}/>
                </h1>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search for players"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <button onClick={handleGoButtonClick}>Go</button>
                </div>
            </div>
            <Loader type="pacman"/>
        </>
    );
}

export default Search;
