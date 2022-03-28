import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createFavor } from '../store/favors';
import useForm from './utils/useForm';
import useAuth from './utils/useAuthHook';
import { useHistory } from 'react-router-dom';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

 function searchField() {
  const timeout = useRef();
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const provider = new OpenStreetMapProvider();

  const handleAddress = e =>{
    setInput(e.target.value);

    if(timeout.current){
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(async() => {
      const results = await provider.search({query: e.target.value});
      setResults(results);
      console.log('results:',results)
    }, 500);
}
return (
    <div>
          <br />
          <br />
        <div>
            <label htmlFor='address'>Address: </label>
            <input
            type='text'
            name='address'
            className='signup'
            onChange={handleAddress} value={input}
            />
            <ul className='list-group'>
                {results.map((result, index) =>{
                    return (
                    <button type="button" key={index}>
                        {result.label}
                        <br /> 
                    </button>  
                    )

                })}

            </ul>
        </div>
  </div>
)
}
export default searchField