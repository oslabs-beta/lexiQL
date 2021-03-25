import React, { useEffect, useState } from 'react';
// import G6 from '@antv/g6';
// import Visualizer from './components/Visualizer.jsx';

const App = (props) => {

  const [ state, setState ] = useState([]);

  useEffect(() => {
    fetch('/sql-schema')
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
      // .then(res => setState(res.data))
        res => setState(res.data)
        // setState(data)
        console.log('data: ', data);
        // console.log('data: ', data);
  });
  });
  
  // const { data, setState } = useState('');

  // create a function for API call
  // const fetchData = async () => {
  //   const apiCall = await fetch('/sql-schema');
  //   const incomingData = await apiCall.json;
  //   // call setState func to change the state "data"
  //   setState(incomingData.data);
  //   console.log(data);
  // }

  // // useEffect will run after every render
  // useEffect(() => {
  //   fetchData();
  //   // console.log('HERE');
  // })

  // return (
  //   // <Visualizer />
  //   <div>
  //     {/* {data} */}
  //     <h1>testing!!!</h1>
  //   </div>
  // );


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
      {/* <p> {data} </p> */}
    </div>
  );
};

export default App;
