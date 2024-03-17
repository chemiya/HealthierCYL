import logo from './logo.svg';
import './App.css';
import BarChart from "./BarChart.js"
import apiService from './apiService';
import React, { useState, useEffect } from 'react';
import Mapa3D from './Mapa3D';
import Tierra from './Tierra';



function App() {


  const [dataCentros, setDataCentros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const meses = [
    'Mes', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const nivelesAsistenciales = ['Nivel asistencial', 'Atención Especializada', 'Atención Primaria', 'Gerencias de Área', 'Otros Gerencia Regional de Salud']


  const motivosGenerales = ['Motivo general', 'Asistenciales', 'Contenido económico', 'Documentación', 'Hostelería/Confortabilidad', 'Información', 'Listas de espera/Demoras', 'Organización/ Funcionamiento', 'Trato']



  const [opcionMotivoGeneralCentro, setMotivoGeneralCentro] = useState('Motivo general');
  const [opcionMesCentro, setMesCentro] = useState('Nivel asistencial');
  const [opcionNivelAsistencialCentro, setNivelAsistencialCentro] = useState('Mes');

  const cambioNivelAsistencialCentro = async (event) => {
    const selectedValue = event.target.value;
    setNivelAsistencialCentro(selectedValue)


    try {
      const apiData = await apiService.getNumeroReclamacionesCentrosNivelAsistencial(selectedValue);

      setDataCentros(apiData.results);
      console.log(apiData.results)
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const cambioMesCentro = async (event) => {
    const selectedValue = event.target.value;
    setMesCentro(selectedValue)

    try {
      const apiData = await apiService.getNumeroReclamacionesCentrosMes(selectedValue);

      setDataCentros(apiData.results);
      console.log(apiData.results)
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const cambioMotivoGeneralCentro = async (event) => {
    const selectedValue = event.target.value;
    setMotivoGeneralCentro(selectedValue)

    try {
      const apiData = await apiService.getNumeroReclamacionesCentrosMotivoGeneral(selectedValue);

      setDataCentros(apiData.results);
      console.log(apiData.results)
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const numeroReclamacionesCentros = async () => {
      try {
        const apiData = await apiService.getNumeroReclamacionesCentros();

        setDataCentros(apiData.results);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };



    numeroReclamacionesCentros();

  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }






  return (
    <div>

      <nav class="navbar navbar-expand-lg  navbar">
        <div class="container-fluid">
          <a class="texto-navbar">Aplicación para la visualización de las reclamaciones en el <br></br>ámbito sanitario  en centros de Castilla y León en 2022</a>


        </div>
      </nav>



      <div className='container-fluid'>
        <div className='row'>
          <div className='col-6 mt-3 mb-3'>
            <div className='grafico'>
              <h1 className='text-center'>Datos por centros</h1>

              <div className='grafico-barras d-flex justify-content-center align-items-center'>
                <BarChart data={dataCentros} />
              </div>

              <div className='selects d-flex flex-column justify-content-around align-items-center'>
                <select id="nivelAsistencialCentro" value={opcionNivelAsistencialCentro} onChange={cambioNivelAsistencialCentro}>
                  {nivelesAsistenciales.map((month, index) => (
                    <option key={index} value={month}>{month}</option>
                  ))}
                </select>

                <select className='mt-4' id="motivoGeneralCentro" value={opcionMotivoGeneralCentro} onChange={cambioMotivoGeneralCentro}>
                  {motivosGenerales.map((month, index) => (
                    <option key={index} value={month}>{month}</option>
                  ))}
                </select>


                <select className='mt-4 mb-3' id="mesCentro" value={opcionMesCentro} onChange={cambioMesCentro}>
                  {meses.map((month, index) => (
                    <option key={index} value={month}>{month}</option>
                  ))}
                </select>
              </div>







            </div>

          </div>

          <div className='col-6 mt-3 mb-3'>
            <div className='grafico'>
              <h1 className='text-center'>Datos por provincias</h1>


              <Mapa3D></Mapa3D>


              <div className='selects d-flex flex-column justify-content-around align-items-center'>
                <select id="nivelAsistencialCentro" value={opcionNivelAsistencialCentro} onChange={cambioNivelAsistencialCentro}>
                  {nivelesAsistenciales.map((month, index) => (
                    <option key={index} value={month}>{month}</option>
                  ))}
                </select>

                <select className='mt-4' id="motivoGeneralCentro" value={opcionMotivoGeneralCentro} onChange={cambioMotivoGeneralCentro}>
                  {motivosGenerales.map((month, index) => (
                    <option key={index} value={month}>{month}</option>
                  ))}
                </select>


                <select className='mt-4 mb-3' id="mesCentro" value={opcionMesCentro} onChange={cambioMesCentro}>
                  {meses.map((month, index) => (
                    <option key={index} value={month}>{month}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className='row'>
        <div className='col d-flex flex-column justify-content-around align-items-center'>
          <h3>José María Lozano Olmedo </h3>
          <h3>Interfaces gráficas y entornos virtuales</h3>
        </div>
      </div>





    </div>
  );
}

export default App;
