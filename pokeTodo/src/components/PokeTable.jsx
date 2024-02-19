/*
 Date: 17/02/2024
 Author: Mario A. N. Zavala
 NOTE: I decide to change the focus from a table to divs to define columns.
*/

import React, { useState, useEffect } from 'react';

export const PokeTable = () => {
 const [availablePokemon, setAvailablePokemon] = useState([]);
 const [pendingPokemon,   setPendingPokemon]   = useState([]);
 const [trappedPokemon,   setTrappedPokemon]   = useState([]);
 const [searchedPokemon,  setSearchedPokemon]  = useState([]);
 // Pagination
 const [currentPage,      setCurrentPage]                  = useState(1);
 const itemsPerPage                                      =   3;
 const indexOfLastPokemon                      = currentPage * itemsPerPage;
 const indexOfFirstPokemon                     = indexOfLastPokemon - itemsPerPage;
 const currentPokemon                          = availablePokemon.slice(indexOfFirstPokemon, indexOfLastPokemon);
 const paginate                                = (pageNumber) => setCurrentPage(pageNumber);

 // Styles
 const tableHeaderStyle = {
  background: '#f0f0f0',
  padding   : '10px',
  textAlign : 'left'
 }
 const columnStyle = {
  border : '1px solid #ddd',
  padding: '10px'
 }
 const pokemonItemStyle = {
  marginBottom: '5px',
  margin: '0 auto' 
 }

 useEffect(() => {
  const getPokemon = async () => {
    try {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=20');
      const data = await res.json();
      console.log(data?.results);

      // Fetch additional details for each Pokemon, including the image URL from the official PokeAPI
      const detailedPokemon = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
          const details = await res.json();
          return {
            id: details.id,
            name: details.name,
            image: details.sprites.front_default, // Use the official PokeAPI image URL
          };
        })
      );

      setAvailablePokemon(detailedPokemon);
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
    }
  };

  getPokemon();
}, []);
;
 const handleMoveToWild = (pokemon) => {
  const updatedAvailablePokemon = [...trappedPokemon];
  const pokemonIndex = updatedAvailablePokemon.findIndex(p => p.id === pokemon.id);
  const movedPokemon = updatedAvailablePokemon.splice(pokemonIndex, 1)[0];
  setAvailablePokemon((prevPendingPokemon) => [...prevPendingPokemon, movedPokemon]);
  setTrappedPokemon(updatedAvailablePokemon);
 }
 const handleMoveToPending =  (pokemon) => {
  const updatedAvailablePokemon = [...availablePokemon];
  const pokemonIndex = updatedAvailablePokemon.findIndex(p => p.id === pokemon.id);
  const movedPokemon = updatedAvailablePokemon.splice(pokemonIndex, 1)[0];
  setPendingPokemon((prevPendingPokemon) => [...prevPendingPokemon, movedPokemon]);
  setAvailablePokemon(updatedAvailablePokemon);
 };
 const handleMoveToTrapped = (pokemon) => {
  const updatedAvailablePokemon = [...pendingPokemon];
  const pokemonIndex = updatedAvailablePokemon.findIndex(p => p.id === pokemon.id);
  const movedPokemon = updatedAvailablePokemon.splice(pokemonIndex, 1)[0];
  setTrappedPokemon((prevPendingPokemon) => [...prevPendingPokemon, movedPokemon]);
  setPendingPokemon(updatedAvailablePokemon);
 }

 return(
  <div>

   
<i
    className="fas fa-cat"
    style={{
      position: 'absolute',
      right: '10px',
      bottom: '10px',
      cursor: 'pointer',
    }}
    onClick={() => handleSearch()}
  ></i>

   <input 
    type             = 'text'
    placeholder = 'Search Pokemon...'
    value           = { searchedPokemon }
    onChange    = { e => setSearchedPokemon(e.target.value)  } 
    style={{
     marginBottom: '10px',
     padding: '5px',
     border: 'none',
     borderBottom: '2px solid #ccc',
     outline: 'none',
    }}
   />


  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
    <div>
     <h2>Wild Pokemon</h2>
      {currentPokemon.map( (pokemon, currentIndex) => (
            <div key={currentIndex}> 
                {pokemon.name}
                <img src={pokemon.image} alt={pokemon.name} style={{ width: '50px', height: '50px' }} />
                <br />
                <button onClick={() => handleMoveToPending(pokemon)}>Let's trapped!</button>
              </div>
           ))
      }
     </div> 
     <div>
      <h2>Trapped Pokemon</h2>
     {pendingPokemon.map( (pokemon, currentIndex) => (
            <div key={currentIndex}>
                {pokemon.name}
                <img src={pokemon.image} alt={pokemon.name} style={{ width: '50px', height: '50px' }} />
                <br />
                <button onClick={() => handleMoveToTrapped(pokemon)}>I choose you!</button>
              </div>
           ))
      }
      </div> 
      <div>
      <h2>Transfer Pokemon</h2>
     {trappedPokemon.map( (pokemon, currentIndex) => (
            <div key={currentIndex}>
                {pokemon.name}
                <img src={pokemon.image} alt={pokemon.name} style={{ width: '50px', height: '50px' }} />
                <br />
                <button 
                 onClick={() => handleMoveToWild(pokemon)}
                >Send To Dr. Oak</button>
              </div>
           ))
      } 
     </div>

   </div>
   <Pagination 
    itemsPerPage={itemsPerPage}
    totalItems  ={availablePokemon.length}
    currentPage ={currentPage}
    paginate    ={paginate}
   />
  </div>
 );
};

const Pagination = ({ itemsPerPage, totalItems, currentPage, paginate }) => {
  const pageNumbers = [];
  for(let i = 1; i <= Math.ceil(totalItems/itemsPerPage); i++)
  pageNumbers.push(i);

  return (
   <ul
   style={{ listStyle: 'none', display: 'flex', justifyContent: 'center', marginTop: '10px' }}
   >
    {
     pageNumbers.map((number) => (
      <li key={number} style={{ margin: '0 5px', cursor: 'pointer' }} >
       <a onClick={() => paginate(number)}>{number}</a>
      </li>
     ))
    }
   </ul>
 );
}
