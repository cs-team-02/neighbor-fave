import React, { useRef, useState } from 'react';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

 function SearchField({onChange}) {
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
      console.log(results)
      setResults(results);
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
                    <button type="button"  className='geo-button' key={index} onClick={(e) => {
                        const address = result.label.split(',');
                        onChange({
                            streetNumber: address[0],
                            streetName: address[1], 
                            city: address[2],
                            state: address[address.length-3],
                            zipcode: address[address.length-2],
                            lat: result.y,
                            lng: result.x
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