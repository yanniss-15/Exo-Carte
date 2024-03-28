// Exercice Carte et Météo

const map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)
// Affiche la map 



let locateMe = document.querySelector("button")
// Selectionne le bouton "Me localiser"



function findLocation(pos) {

    latitude = pos.coords.latitude;
    longitude = pos.coords.longitude;
    console.log("Votre position actuelle est :");
    console.log(`Latitude : ${latitude}`);
    console.log(`Longitude : ${longitude}`);
    map.setView([latitude, longitude], 15)
    let marker = L.marker([latitude, longitude]).addTo(map);

}
// Fonction qui récupère les coordonées de la position de l'utilisateur (longitude, latitude) met le poinçont de la carte sur la position exact de l'utilisateur avec un zoom de 10.



function handleButton() {

    navigator.geolocation.getCurrentPosition(findLocation);

}
// Fonction qui cherche la position de l'utilisateur grâçe aux coordonnées contenues dans la fonction findLocation.



try {
        locateMe.addEventListener('click', handleButton)

    } catch(error) {

        console.log("Location not find")

}
// Rajoute un évènement au bouton "Me localiser" qui executera la fonction "handleButton" quand on clique dessus.


map.on('click', async function(e) {

    const lat = e.latlng.lat
    const lon = e.latlng.lng

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7e41afd8b702ff027c6268a87fec17c0`)
    const result = await response.json();

    const temperature = result.main
    const weather = result.weather

    const content = `
        <h1>Température : ${(result.main.temp-273.15).toFixed(2)}</h1>
        <h1>Météo: ${(result.weather[0].description)}</h1>
    `
    
    let popup = L.popup().setLatLng(e.latlng).setContent(content).openOn(map);

    function savePos() {
        localStorage.getItem(lat)
        localStorage.getItem(lon)
        
        const latLon = `
        Latitude : ${lat}
        Longitude : ${lon}
        `
        console.log(latLon)
    }

    const bttn = document.querySelector('#buttonsave')
    bttn.addEventListener('onclick', savePos())

    });

//Fonction qui récupère la position du lieu quand on clique dessus sur la map + affiche dans une fenêtre popup la température et la météo.



