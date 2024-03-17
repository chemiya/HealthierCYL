'use strict';

window.addEventListener("load", main);

const fileLoader = new THREE.FileLoader()
function asyncLoadFile(filepath) {
  return new Promise((resolve, reject) => {
    fileLoader.load(filepath, (data) => {
      resolve(data);
    })
  })
}

async function main() {
  var date = '22/02/2022';

  var hospitalizationsData = true;
  var infectionsData = true;
  var vaccinationsData = true;

  var valladolidData = true;
  var zamoraData = true;
  var salamancaData = true;
  var avilaData = true;
  var segoviaData = true;
  var soriaData = true;
  var burgosData = true;
  var palenciaData = true;
  var leonData = true;
  var cylData = true;


  //cargo archivos
  const hospitalizedCsv = await asyncLoadFile("hospitalizados.csv");
  const testsCsv = await asyncLoadFile("pruebas.csv");
  const vaccinesCsv = await asyncLoadFile("vacunas.csv");
  


  //creo escena
  //const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1.5, 0.1, 1000);
  camera.position.set(-45, 95, 65);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(450, 300);
  renderer.setClearColor(new THREE.Color(0xFFFFFF));

  const color = 0xFFFFFF;
  const light = new THREE.AmbientLight(color);
  scene.add(light);

  var spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-100, 50, 75);
  scene.add(spotLight);


  //csv
  //var hospitalized = $.csv.toObjects(hospitalizedCsv, {separator: ";"});




  //fecha
  /*var map;

  $( "#datepicker" ).datepicker({
    onSelect: (selectedDate) => {
         document.querySelector("#date").innerText = selectedDate;
         date = selectedDate;
         scene.remove(map);
         drawScene();
    },
    dateFormat: "dd/mm/yy",
    maxDate: "22/02/2022"
  })*/





  //dibujo escena
  drawScene();
  document.getElementById("3d").appendChild(renderer.domElement);

  const controls = new THREE.TrackballControls( camera, renderer.domElement );
  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 1.2;
  controls.panSpeed = 0.8;
  controls.keys = [ 65, 83, 68 ];
  
  render();

  /* FUNCIONES */

  function drawScene() {
    map = new THREE.Object3D();
    scene.add(map);

    // Plano con el mapa
    const mapPlaneGeometry = new THREE.PlaneGeometry(93, 74);
    const loader = new THREE.TextureLoader();
    var mapPlaneMaterial;

      mapPlaneMaterial = new THREE.MeshBasicMaterial({map: loader.load('mapa_cyl.jpg')});
    
    const mapPlaneMesh = new THREE.Mesh(mapPlaneGeometry, mapPlaneMaterial);
    mapPlaneMesh.rotation.x = -1.5708;
    map.add(mapPlaneMesh);

    // Porcentaje de ocupación en UCI por COVID
    if (hospitalizationsData) {
      const hospValladolid = hospitalizationsInCityOnDay('Valladolid', date);


      if (valladolidData) {
        hospitalizationsBar('Valladolid', hospValladolid);
      }
      
    }


    
  }

  function hospitalizationsInCityOnDay(city, day) {


    return 59;
  }



  function hospitalizationsBar(city, hospitalizations) {
    var radius;
    if (city == 'Castilla y León') {
      radius = 3.5;
    } else {
      radius = 2;
    }

    const hospitalizations100BarGeometry = new THREE.CylinderGeometry(radius, radius, 100/4, 50);
    const hospitalizations100BarMaterial = new THREE.MeshLambertMaterial({color: 0xFF4545, opacity: 0.3, transparent: true});
    const hospitalizations100BarMesh = new THREE.Mesh(hospitalizations100BarGeometry, hospitalizations100BarMaterial);
    hospitalizations100BarMesh.position.y = 100/8;

    const hospitalizationsBarGeometry = new THREE.CylinderGeometry(radius, radius, hospitalizations/4, 50);
    const hospitalizationsBarMaterial = new THREE.MeshLambertMaterial({color: 0xFF4545});
    const hospitalizationsBarMesh = new THREE.Mesh(hospitalizationsBarGeometry, hospitalizationsBarMaterial);
    hospitalizationsBarMesh.position.y = hospitalizations/8;

    var coordX;
    var coordZ;
    if (city == 'Valladolid') {
      coordX = -3;
      coordZ = 1;
    } 

    hospitalizations100BarMesh.position.x = coordX;
    hospitalizations100BarMesh.position.z = coordZ;
    hospitalizationsBarMesh.position.x = coordX;
    hospitalizationsBarMesh.position.z = coordZ;
    map.add(hospitalizations100BarMesh);
    map.add(hospitalizationsBarMesh);
  }

  

  

  function render() {
    renderer.render(scene, camera);

    requestAnimationFrame(render);
    controls.update();
  }


//mostrar u ocultar
  document.getElementById('checkBurgos').addEventListener('change', (event) => {
    burgosData = !burgosData;
    scene.remove(map);
    drawScene();
  });

}