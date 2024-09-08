import React, { useEffect } from 'react';
import * as THREE from 'three';


function Tierra() {
  useEffect(() => {
    // Crear una escena
    const scene = new THREE.Scene();

    // Crear una cámara
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    // Crear un renderizador
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Lighting
    const sunlight = new THREE.PointLight(0xffffff, 1, 0, 2);
    sunlight.position.set(-10, 0, 25);
    scene.add(sunlight);

    // Earth
    const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load("earth_texture.jpg")
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // Moon
    const moonGeometry = new THREE.SphereGeometry(0.27, 32, 32);
    const moonMaterial = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load("cylMap.jpg")
    });
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    moon.position.set(2, 0, 0);
    scene.add(moon);

    // Camera position
    camera.position.z = 5;

    // Orbit
    let moonOrbitRadius = 2;
    let moonOrbitSpeed = 0.01;
    let moonOrbitAngle = 0;
    function animate() {
      requestAnimationFrame(animate);
      moonOrbitAngle += moonOrbitSpeed;
      moon.position.x = Math.cos(moonOrbitAngle) * moonOrbitRadius;
      moon.position.z = Math.sin(moonOrbitAngle) * moonOrbitRadius;
      renderer.render(scene, camera);
    }
    animate();

    // Limpiar recursos al desmontar el componente
    return () => {
      document.body.removeChild(renderer.domElement);
    };
  }, []); // Solo se ejecuta una vez al montar el componente

  return null; // No se renderiza nada en el DOM, el renderizado se realiza en el canvas de three.js
}

export default Tierra;
