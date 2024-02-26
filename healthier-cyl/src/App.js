import logo from './logo.svg';
import './App.css';
import BarChart from "./BarChart.js"
import ApiService from './ApiService.js';
import React, { useState, useEffect } from 'react';

function App() {
  const data = [10, 25, 15, 30, 20];

  const [dataAPI, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await ApiService.getDatos();
        setData(apiData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }


  return (
    <div>
      <h1>Gráfico de Barras con D3 en React</h1>
      <BarChart data={data} />
      <div>
      <h1>App con Servicio de API en React</h1>
      <pre>{JSON.stringify(dataAPI, null, 2)}</pre>
    </div>
    </div>
  );
}

export default App;
