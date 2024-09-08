

$(document).ready(function () {


    //constantes
    let datosCentros;
    const meses = [
        'Mes', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    const nivelesAsistenciales = ['Nivel asistencial', 'Atención Especializada', 'Atención Primaria', 'Gerencias de Área', 'Otros Gerencia Regional de Salud']
    const motivosGenerales = ['Motivo general', 'Asistenciales', 'Contenido económico', 'Documentación', 'Hostelería/Confortabilidad', 'Información', 'Listas de espera/Demoras', 'Organización/ Funcionamiento', 'Trato']











    ///inicializacion de selects
    var selectNivelAsistencialCentro = $('#selectNivelAsistencialCentro');
    selectNivelAsistencialCentro.empty();
    var selectNivelAsistencialProvincia = $('#selectNivelAsistencialProvincia');
    selectNivelAsistencialProvincia.empty();
    nivelesAsistenciales.forEach(function (opcion) {
        selectNivelAsistencialCentro.append($('<option></option>').attr('value', opcion).text(opcion));
        selectNivelAsistencialProvincia.append($('<option></option>').attr('value', opcion).text(opcion));

    });

    var selectMotivoGeneralCentro = $('#selectMotivoGeneralCentro');
    selectMotivoGeneralCentro.empty();
    var selectMotivoGeneralProvincia = $('#selectMotivoGeneralProvincia');
    selectMotivoGeneralProvincia.empty();
    motivosGenerales.forEach(function (opcion) {
        selectMotivoGeneralCentro.append($('<option></option>').attr('value', opcion).text(opcion));
        selectMotivoGeneralProvincia.append($('<option></option>').attr('value', opcion).text(opcion));

    });

    var selectMesCentro = $('#selectMesCentro');
    selectMesCentro.empty();
    var selectMesProvincia = $('#selectMesProvincia');
    selectMesProvincia.empty();
    meses.forEach(function (opcion) {
        selectMesCentro.append($('<option></option>').attr('value', opcion).text(opcion));
        selectMesProvincia.append($('<option></option>').attr('value', opcion).text(opcion));

    });






//definicion grafico 3d de las proinvicias
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1.5, 0.1, 1000);
    camera.position.set(20, 175, 80);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(800, 500);
    renderer.setClearColor(new THREE.Color(0xFFFFFF));

    const color = 0xFFFFFF;
    const light = new THREE.AmbientLight(color);
    scene.add(light);

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-100, 50, 75);
    scene.add(spotLight);
    var map;












//carga de datos iniciales para los graficos
    consultarAPICentros("Nivel asistencial", "Motivo general", "Mes");
    consultarAPIProvincias("Nivel asistencial", "Motivo general", "Mes");



    document.getElementById("threeCanvas").appendChild(renderer.domElement);
    const controls = new THREE.TrackballControls(camera, renderer.domElement);
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.keys = [65, 83, 68];
    render()


    function render() {
        renderer.render(scene, camera);

        requestAnimationFrame(render);
        controls.update();
    }






    //detectar cambio en los select
    $('#selectNivelAsistencialCentro').change(function () {
        var opcionMarcadaNivelAsistencialCentro = $('#selectNivelAsistencialCentro').val();
        var opcionMarcadaMotivoGeneralCentro = $('#selectMotivoGeneralCentro').val();
        var opcionMarcadaMesCentro = $('#selectMesCentro').val();
        consultarAPICentros(opcionMarcadaNivelAsistencialCentro, opcionMarcadaMotivoGeneralCentro, opcionMarcadaMesCentro);
    });


    $('#selectMotivoGeneralCentro').change(function () {
        var opcionMarcadaNivelAsistencialCentro = $('#selectNivelAsistencialCentro').val();
        var opcionMarcadaMotivoGeneralCentro = $('#selectMotivoGeneralCentro').val();
        var opcionMarcadaMesCentro = $('#selectMesCentro').val();
        consultarAPICentros(opcionMarcadaNivelAsistencialCentro, opcionMarcadaMotivoGeneralCentro, opcionMarcadaMesCentro);
    });

    $('#selectMesCentro').change(function () {
        var opcionMarcadaNivelAsistencialCentro = $('#selectNivelAsistencialCentro').val();
        var opcionMarcadaMotivoGeneralCentro = $('#selectMotivoGeneralCentro').val();
        var opcionMarcadaMesCentro = $('#selectMesCentro').val();
        consultarAPICentros(opcionMarcadaNivelAsistencialCentro, opcionMarcadaMotivoGeneralCentro, opcionMarcadaMesCentro);
    });


    $('#selectNivelAsistencialProvincia').change(function () {
        var opcionMarcadaNivelAsistencialProvincia = $('#selectNivelAsistencialProvincia').val();
        var opcionMarcadaMotivoGeneralProvincia = $('#selectMotivoGeneralProvincia').val();
        var opcionMarcadaMesProvincia = $('#selectMesProvincia').val();
        scene.remove(map);
        consultarAPIProvincias(opcionMarcadaNivelAsistencialProvincia, opcionMarcadaMotivoGeneralProvincia, opcionMarcadaMesProvincia);
    });


    $('#selectMotivoGeneralProvincia').change(function () {
        var opcionMarcadaNivelAsistencialProvincia = $('#selectNivelAsistencialProvincia').val();
        var opcionMarcadaMotivoGeneralProvincia = $('#selectMotivoGeneralProvincia').val();
        var opcionMarcadaMesProvincia = $('#selectMesProvincia').val();
        scene.remove(map);
        consultarAPIProvincias(opcionMarcadaNivelAsistencialProvincia, opcionMarcadaMotivoGeneralProvincia, opcionMarcadaMesProvincia);
    });

    $('#selectMesProvincia').change(function () {
        var opcionMarcadaNivelAsistencialProvincia = $('#selectNivelAsistencialProvincia').val();
        var opcionMarcadaMotivoGeneralProvincia = $('#selectMotivoGeneralProvincia').val();
        var opcionMarcadaMesProvincia = $('#selectMesProvincia').val();
        scene.remove(map);
        consultarAPIProvincias(opcionMarcadaNivelAsistencialProvincia, opcionMarcadaMotivoGeneralProvincia, opcionMarcadaMesProvincia);
    });












    //funcion para obtener datos de la api sobre los centros
    function consultarAPICentros(nivelAsistencialCentro, motivoGeneralCentro, mesCentro) {
        var apiUrl = 'https://analisis.datosabiertos.jcyl.es/api/explore/v2.1/catalog/datasets/reclamaciones-ambito-sanitario/records?';
        var urlCompuesta = ""

        if (nivelAsistencialCentro == "Nivel asistencial" && motivoGeneralCentro == "Motivo general" && mesCentro == "Mes") {
            urlCompuesta = `${apiUrl}select=sum(total_reclamaciones_con_motivo)%20as%20suma&group_by=centro&order_by=suma%20desc&limit=10`
        } else if (nivelAsistencialCentro != "Nivel asistencial" && motivoGeneralCentro == "Motivo general" && mesCentro == "Mes") {
            urlCompuesta = `${apiUrl}select=sum(total_reclamaciones_con_motivo)%20as%20suma&where=nivel_asistencial%20like%20%22${nivelAsistencialCentro}%22&group_by=centro&order_by=suma%20desc&limit=10`
        } else if (nivelAsistencialCentro == "Nivel asistencial" && motivoGeneralCentro != "Motivo general" && mesCentro == "Mes") {
            urlCompuesta = `${apiUrl}select=sum(total_reclamaciones_con_motivo)%20as%20suma&where=motivo_general%20like%20%22${motivoGeneralCentro}%22&group_by=centro&order_by=suma%20desc&limit=10`
        } else if (nivelAsistencialCentro == "Nivel asistencial" && motivoGeneralCentro == "Motivo general" && mesCentro != "Mes") {
            urlCompuesta = `${apiUrl}select=sum(total_reclamaciones_con_motivo)%20as%20suma&where=mes_recepcion%20like%20%22${mesCentro}%22&group_by=centro&order_by=suma%20desc&limit=10`
        } else if (nivelAsistencialCentro != "Nivel asistencial" && motivoGeneralCentro != "Motivo general" && mesCentro == "Mes") {
            urlCompuesta = `${apiUrl}select=sum(total_reclamaciones_con_motivo)%20as%20suma&where=nivel_asistencial%20like%20%22${nivelAsistencialCentro}%22%20and%20motivo_general%20like%20%22${motivoGeneralCentro}%22&group_by=centro&order_by=suma%20desc&limit=10`
        } else if (nivelAsistencialCentro == "Nivel asistencial" && motivoGeneralCentro != "Motivo general" && mesCentro != "Mes") {
            urlCompuesta = `${apiUrl}select=sum(total_reclamaciones_con_motivo)%20as%20suma&where=motivo_general%20like%20%22${motivoGeneralCentro}%22%20and%20mes_recepcion%20like%20%22${mesCentro}%22&group_by=centro&order_by=suma%20desc&limit=10`
        } else if (nivelAsistencialCentro != "Nivel asistencial" && motivoGeneralCentro == "Motivo general" && mesCentro != "Mes") {
            urlCompuesta = `${apiUrl}select=sum(total_reclamaciones_con_motivo)%20as%20suma&where=nivel_asistencial%20like%20%22${nivelAsistencialCentro}%22%20and%20mes_recepcion%20like%20%22${mesCentro}%22&group_by=centro&order_by=suma%20desc&limit=10`
        } else if (nivelAsistencialCentro != "Nivel asistencial" && motivoGeneralCentro != "Motivo general" && mesCentro != "Mes") {
            urlCompuesta = `${apiUrl}select=sum(total_reclamaciones_con_motivo)%20as%20suma&where=nivel_asistencial%20like%20%22${nivelAsistencialCentro}%22%20and%20mes_recepcion%20like%20%22${mesCentro}%22%20and%20motivo_general%20like%20%22${motivoGeneralCentro}%22&group_by=centro&order_by=suma%20desc&limit=10`
        }

        console.log(urlCompuesta)
        axios.get(urlCompuesta)
            .then(function (response) {
                console.log(response.data)
                datosCentros=response.data.results


                drawBarChart(response.data.results,500,400);
            })
            .catch(function (error) {

                console.error('Error al obtener datos de la API:', error);
            });
    }














    //funcion para obtener datos de la api sobre las provincias
    function consultarAPIProvincias(nivelAsistencialProvincia, motivoGeneralProvincia, mesProvincia) {
        var apiUrl = 'https://analisis.datosabiertos.jcyl.es/api/explore/v2.1/catalog/datasets/reclamaciones-ambito-sanitario/records?';
        var urlCompuesta = ""

        if (nivelAsistencialProvincia == "Nivel asistencial" && motivoGeneralProvincia == "Motivo general" && mesProvincia == "Mes") {
            urlCompuesta = `${apiUrl}select=sum(total_reclamaciones_con_motivo)%20as%20suma&group_by=provincia&order_by=suma%20desc&limit=10`
        } else if (nivelAsistencialProvincia != "Nivel asistencial" && motivoGeneralProvincia == "Motivo general" && mesProvincia == "Mes") {
            urlCompuesta = `${apiUrl}select=sum(total_reclamaciones_con_motivo)%20as%20suma&where=nivel_asistencial%20like%20%22${nivelAsistencialProvincia}%22&group_by=provincia&order_by=suma%20desc&limit=10`
        } else if (nivelAsistencialProvincia == "Nivel asistencial" && motivoGeneralProvincia != "Motivo general" && mesProvincia == "Mes") {
            urlCompuesta = `${apiUrl}select=sum(total_reclamaciones_con_motivo)%20as%20suma&where=motivo_general%20like%20%22${motivoGeneralProvincia}%22&group_by=provincia&order_by=suma%20desc&limit=10`
        } else if (nivelAsistencialProvincia == "Nivel asistencial" && motivoGeneralProvincia == "Motivo general" && mesProvincia != "Mes") {
            urlCompuesta = `${apiUrl}select=sum(total_reclamaciones_con_motivo)%20as%20suma&where=mes_recepcion%20like%20%22${mesProvincia}%22&group_by=provincia&order_by=suma%20desc&limit=10`
        } else if (nivelAsistencialProvincia != "Nivel asistencial" && motivoGeneralProvincia != "Motivo general" && mesProvincia == "Mes") {
            urlCompuesta = `${apiUrl}select=sum(total_reclamaciones_con_motivo)%20as%20suma&where=nivel_asistencial%20like%20%22${nivelAsistencialProvincia}%22%20and%20motivo_general%20like%20%22${motivoGeneralProvincia}%22&group_by=provincia&order_by=suma%20desc&limit=10`
        } else if (nivelAsistencialProvincia == "Nivel asistencial" && motivoGeneralProvincia != "Motivo general" && mesProvincia != "Mes") {
            urlCompuesta = `${apiUrl}select=sum(total_reclamaciones_con_motivo)%20as%20suma&where=motivo_general%20like%20%22${motivoGeneralProvincia}%22%20and%20mes_recepcion%20like%20%22${mesProvincia}%22&group_by=provincia&order_by=suma%20desc&limit=10`
        } else if (nivelAsistencialProvincia != "Nivel asistencial" && motivoGeneralProvincia == "Motivo general" && mesProvincia != "Mes") {
            urlCompuesta = `${apiUrl}select=sum(total_reclamaciones_con_motivo)%20as%20suma&where=nivel_asistencial%20like%20%22${nivelAsistencialProvincia}%22%20and%20mes_recepcion%20like%20%22${mesProvincia}%22&group_by=provincia&order_by=suma%20desc&limit=10`
        } else if (nivelAsistencialProvincia != "Nivel asistencial" && motivoGeneralProvincia != "Motivo general" && mesProvincia != "Mes") {
            urlCompuesta = `${apiUrl}select=sum(total_reclamaciones_con_motivo)%20as%20suma&where=nivel_asistencial%20like%20%22${nivelAsistencialProvincia}%22%20and%20mes_recepcion%20like%20%22${mesProvincia}%22%20and%20motivo_general%20like%20%22${motivoGeneralProvincia}%22&group_by=provincia&order_by=suma%20desc&limit=10`
        }

        console.log(urlCompuesta)
        axios.get(urlCompuesta)
            .then(function (response) {
                console.log(response.data)


                draw3DGraph(response.data.results);
            })
            .catch(function (error) {

                console.error('Error al obtener datos de la API:', error);
            });
    }






















    // funcion para dibujar el grafico de barras
    function drawBarChart(data,width,height) {
        const margin = { top: 100, right: 40, bottom: 320, left: 300 };


        let svg = d3.select('#barChart svg');
        if (!svg.empty()) {
            svg.remove();
        }

        svg = d3.select('#barChart')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        const xScale = d3.scaleBand()
            .domain(data.map(d => d.centro))
            .range([0, width])
            .padding(0.1);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.suma)])
            .range([height, 0]);

        svg.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('x', d => xScale(d.centro))
            .attr('y', d => yScale(d.suma))
            .attr('width', xScale.bandwidth())
            .attr('height', d => height - yScale(d.suma))
            .attr('fill', '#fcb42d');


        svg.selectAll("text")
            .data(data)
            .enter().append("text")
            .text(function (d) { return d.suma; }) 
            .attr("x", function (d, i) { return i * (width / data.length) + (width / data.length - 2) / 2; }) 
            .attr("y", function (d) { return yScale(d.suma) - 5; }) 
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("fill", "black");


        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        svg.append('g')
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(xScale))
            .selectAll('text')
            .attr('transform', 'rotate(-45)')
            .style('text-anchor', 'end');

        svg.append('g')
            .call(yAxis);

        svg.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 0 - margin.left + 205)
            .attr('x', 0 - height / 2)
            .attr('dy', '1em')
            .style('text-anchor', 'middle')
            .text('Cantidad de reclamaciones');
    }
























    // funcion para dibujar el grafico 3d
    function draw3DGraph(data) {

        if (!data) {
            return
        }



        map = new THREE.Object3D();
        scene.add(map);

        
        const mapPlaneGeometry = new THREE.PlaneGeometry(93, 74);
        const loader = new THREE.TextureLoader();
        var mapPlaneMaterial;

        mapPlaneMaterial = new THREE.MeshBasicMaterial({ map: loader.load('cylMapaV1.jpg') });

        const mapPlaneMesh = new THREE.Mesh(mapPlaneGeometry, mapPlaneMaterial);
        mapPlaneMesh.rotation.x = -1.5708;
        map.add(mapPlaneMesh);


        var radius = 3.5;
        console.log("datos")
        let lengthLeida = 0;

        if (data) {
            lengthLeida = Object.keys(data).length;

            for (let i = 0; i < lengthLeida; i++) {
                let ciudad = data[i].provincia


                var valor = data[i].suma / 25;

                const geometria = new THREE.CylinderGeometry(radius, radius, valor / 4, 50);
                const material = new THREE.MeshLambertMaterial({ color: 0xf44611 });
                const mesh = new THREE.Mesh(geometria, material);
                mesh.position.y = valor / 8;

                var coordX;
                var coordZ;

                if (ciudad == 'VALLADOLID') {
                    coordX = -3;
                    coordZ = 1;
                } else if (ciudad == 'ZAMORA') {
                    coordX = -20;
                    coordZ = 0;
                } else if (ciudad == 'SALAMANCA') {
                    coordX = -23;
                    coordZ = 18;
                } else if (ciudad == 'AVILA') {
                    coordX = -4;
                    coordZ = 23;
                } else if (ciudad == 'SEGOVIA') {
                    coordX = 8;
                    coordZ = 11;
                } else if (ciudad == 'SORIA') {
                    coordX = 32;
                    coordZ = 1;
                } else if (ciudad == 'BURGOS') {
                    coordX = 17;
                    coordZ = -14;
                } else if (ciudad == 'PALENCIA') {
                    coordX = -1;
                    coordZ = -13;
                } else if (ciudad == 'LEON') {
                    coordX = -20;
                    coordZ = -19;
                }


                mesh.position.x = coordX;
                mesh.position.z = coordZ;
                map.add(mesh);
            }

        }

    }







    




    function ajustarTamanoGrafico() {
        console.log("detectado")
        const barChartContainer = document.getElementById('barChart');

        
        let chartWidth = 500; 
        let chartHeight = 400; 
        
        const windowWidth = window.innerWidth;

        
        if (windowWidth < 768) {
            
            chartWidth = 250;
            chartHeight=200
        } else {
            
            chartWidth = 500;
            chartHeight=400
        }


        console.log(chartWidth)
        console.log(chartHeight)
        
        barChartContainer.style.width = `${chartWidth}px`;
        barChartContainer.style.height = `${chartHeight}px`;
        drawBarChart(datosCentros,chartWidth,chartHeight);

    }

    window.addEventListener('resize', ajustarTamanoGrafico);


});

