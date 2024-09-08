import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

function Mapa3D() {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    // Creamos una escena
    const scene = new THREE.Scene();

    // Creamos una cámara
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // Aspect ratio 1
    camera.position.z = 5;

    // Creamos un renderizador
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(300, 300); // Tamaño 300x300
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer; // Guardamos una referencia al renderizador

    // Creamos un cubo
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Renderizamos la escena
    const renderScene = () => {
      renderer.render(scene, camera);
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
