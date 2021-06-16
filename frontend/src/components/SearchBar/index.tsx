import React, { useState } from 'react';
// import styled from 'styled-components';
// import { InputGroup, FormControl, Button, Form, Col } from 'react-bootstrap';
// import { useHistory } from 'react-router';
//import { faSearch } from '@fortawesome/free-solid-svg-icons';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
    type HTMLElementEvent<T extends HTMLElement> = Event & {
        target: T;
    }

    function handleChange(event: HTMLElementEvent<HTMLButtonElement>) {
        const { target } = event
        console.log(target.value);
        setSearchQuery(target.value)
    }
    return (
        <form action="/" method="get">
            <label htmlFor="header-search">
                <span className="visually-hidden">Search blog posts</span>
            </label>
            <input
                // value={searchQuery}
                onInput= {event => handleChange} //{e => setSearchQuery(e.target.value)}
                type="text"
                id="header-search"
                placeholder="Search blog posts"
                name="s"
            />
            <button type="submit">Search</button>
        </form>     
    )
}


export default SearchBar;