import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

function Mapa3D() {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    // Creamos una escena
    const scene = new THREE.Scene();

    // Creamos una cámara
    const camera = new THREE.PerspectiveCamera(45, 1.5, 0.1, 1000); 
    camera.position.set(-15, 35, 35);
    camera.lookAt(0, 0, 0);

    // Creamos un renderizador
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(600, 600); // Tamaño 300x300
    renderer.setClearColor(new THREE.Color(0x808080));

    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer; 

    const color = 0xFFFFFF;
    const light = new THREE.AmbientLight(color);
    scene.add(light);
  
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-100, 50, 75);
    scene.add(spotLight);










    var map=  new THREE.Object3D();
    scene.add(map);

    // Plano con el mapa
    const mapPlaneGeometry = new THREE.PlaneGeometry(93, 57);
    const loader = new THREE.TextureLoader();
    var mapPlaneMaterial;
    loader.load(
      'cylMapa.png',
      function (texture) {
        
        console.log('Imagen cargada correctamente:', texture);
        mapPlaneMaterial = new THREE.MeshBasicMaterial({map: texture});
      },
      function (xhr) {
        
        console.log((xhr.loaded / xhr.total * 100) + '% cargado');
      },
      function (error) {
        
        console.error('Error al cargar la imagen:', error);
      }
    );
    

      
    
    const mapPlaneMesh = new THREE.Mesh(mapPlaneGeometry, mapPlaneMaterial);
    mapPlaneMesh.rotation.x = -1.5708;
    map.add(mapPlaneMesh);




    var radius=2;


    const hospitalizations100BarGeometry = new THREE.CylinderGeometry(radius, radius, 100/4, 50);
    const hospitalizations100BarMaterial = new THREE.MeshLambertMaterial({color: 0xFF4545, opacity: 0.3, transparent: true});
    const hospitalizations100BarMesh = new THREE.Mesh(hospitalizations100BarGeometry, hospitalizations100BarMaterial);
    hospitalizations100BarMesh.position.y = 100/8;

    const hospitalizationsBarGeometry = new THREE.CylinderGeometry(radius, radius, 10, 50);
    const hospitalizationsBarMaterial = new THREE.MeshLambertMaterial({color: 0xFF4545});
    const hospitalizationsBarMesh = new THREE.Mesh(hospitalizationsBarGeometry, hospitalizationsBarMaterial);
    hospitalizationsBarMesh.position.y = 10;

    var coordX;
    var coordZ;


    hospitalizations100BarMesh.position.x = 0;
    hospitalizations100BarMesh.position.z = 1;
    hospitalizationsBarMesh.position.x = 0;
    hospitalizationsBarMesh.position.z = 1;
    map.add(hospitalizations100BarMesh);
    map.add(hospitalizationsBarMesh);

    /*const controls = new THREE.TrackballControls( camera, renderer.domElement );
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.keys = [ 65, 83, 68 ];*/



    // Renderizamos la escena
    const renderScene = () => {
      renderer.render(scene, camera);
      //requestAnimationFrame(renderer);
      //controls.update();
    };

    renderScene();

    return () => {
      // Limpiamos recursos al desmontar el componente
      renderer.dispose();
      containerRef.current.removeChild(renderer.domElement); // Eliminamos el lienzo del DOM
    };
  }, []);

  return <div ref={containerRef} style={{ width: '300px', height: '300px' }} />;
}

export default Mapa3D;
