function fetchSuperheroByID(id = 0) {
    fetch(`http://localhost:3000/api/superheroInfo/${id}`)
        .then(response => response.json())
        .then(data => {
        console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function fetchSuperheroByName(name = "") {
    fetch(`http://localhost:3000/api/superheroInfo/name/${name}`)
        .then(response => response.json())
        .then(data => {
        console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function fetchSuperheroByPower(power = "") {
    fetch(`http://localhost:3000/api/powers/${power}`)
        .then(response => response.json())
        .then(data => {
        console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function fetchSuperheroByPublisher(publisher = "") {
    fetch(`http://localhost:3000/api/publishers/${publisher}`)
        .then(response => response.json())
        .then(data => {
        console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function fetchSuperheroByRace(race = "") {
    fetch(`http://localhost:3000/api/race/${race}`)
        .then(response => response.json())
        .then(data => {
        console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}



