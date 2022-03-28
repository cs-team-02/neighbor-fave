import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createFavor } from '../store/favors';
import useForm from './utils/useForm';
import useAuth from './utils/useAuthHook';
import { useHistory } from 'react-router-dom';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

 function SearchField() {
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
                    <button type="button" key={index} onClick={(e) => {
                        const address = result.label.split(',');
                        console.log(e.target.innerText)
                        console.log('result', 'x', result.x, 'y', result.y)
                        console.log({
                            streetNumber: address[0],
                            streetName: address[1], 
                            city: address[2],
                            state: address[address.length-3],
                            zipcode: address[address.length-2],
                            country: address[address.length-1],
                            lat: result.x,
                            lng: result.y
                        })
                    }}>
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
export default SearchField