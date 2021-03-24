import React, { useEffect, useState } from 'react';
// import G6 from '@antv/g6';
// import Visualizer from './components/Visualizer.jsx';

const App = () => {
  const [state, setState] = useState([]);
  useEffect(() => {
    fetch('/sql-schema')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setState(data);
        // console.log('state: ', state);
      });
  });

  /*
  const useFetch = (url) => {
    const [data, setData] = useState(null);

    useEffect(async () => {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
    }, []);

    return { data };
  };

  const { data } = useFetch('/sql-schema');
  */
  return (
    // <Visualizer />
    <div>
      <h1>Hi</h1>
      {/* <p> {state} </p> */}
    </div>
  );
};

export default App;
