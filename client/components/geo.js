import React, { useRef, useState } from 'react';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

function SearchField({ onChange }) {
  const timeout = useRef();
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const provider = new OpenStreetMapProvider();

  const handleAddress = (e) => {
    setInput(e.target.value);

    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(async () => {
      const results = await provider.search({ query: e.target.value });
      console.log(results);
      setResults(results);
    }, 500);
  };
  return (
    <div className='no-margin-div'>
      <div className='spacer-div' />
      <label htmlFor='address'>
        <b>Address*</b>
      </label>
      <input
        type='text'
        name='address'
        className='signup'
        onChange={handleAddress}
        value={input}
        placeholder='123 Maple St...'
        required
      />
      <div className='list-group'>
        {results.map((result, index) => {
          return (
            <div className='geo-button'>
              <a
                type='button'
                key={index}
                onClick={(e) => {
                  const address = result.label.split(',');
                  onChange({
                    streetNumber: address[0],
                    streetName: address[1],
                    city: address[2],
                    state: address[address.length - 3],
                    zipcode: address[address.length - 2],
                    lat: result.y,
                    lng: result.x,
                  });
                }}
              >
                {result.label}
                <hr />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default SearchField;
