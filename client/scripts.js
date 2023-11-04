function fetchSuperheroByID(id = 0) {
    fetch(`http://localhost:3000/api/superheroInfo/${id}`)
        .then(response => response.json())
        .then(data => {
            const resultsElement = document.querySelector('.results');
            resultsElement.innerHTML = JSON.stringify(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function fetchSuperheroByName(name = "") {
    fetch(`http://localhost:3000/api/superheroInfo/name/${name}`)
        .then(response => response.json())
        .then(data => {
            const resultsElement = document.querySelector('.results');
            resultsElement.innerHTML = JSON.stringify(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function fetchSuperheroByPower(power = "") {
    fetch(`http://localhost:3000/api/powers/${power}`)
        .then(response => response.json())
        .then(data => {
            const resultsElement = document.querySelector('.results');
            resultsElement.innerHTML = JSON.stringify(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function fetchSuperheroByPublisher(publisher = "") {
    fetch(`http://localhost:3000/api/publishers/${publisher}`)
        .then(response => response.json())
        .then(data => {
            const resultsElement = document.querySelector('.results');
            resultsElement.innerHTML = JSON.stringify(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function fetchSuperheroByRace(race = "") {
    fetch(`http://localhost:3000/api/race/${race}`)
        .then(response => response.json())
        .then(data => {
            const resultsElement = document.querySelector('.results');
            resultsElement.innerHTML = JSON.stringify(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}



document.addEventListener('DOMContentLoaded', function() {
    // Your JavaScript code here
    document.getElementById('search-button').addEventListener('click', function() {
        const searchInput = document.getElementById('search-input').value;
        const searchCriteria = document.getElementById('search-criteria').value;
    
        if (searchCriteria === 'id') {
            fetchSuperheroByID(searchInput);
        } else if (searchCriteria === 'name') {
            fetchSuperheroByName(searchInput);
        } else if (searchCriteria === 'power') {
            fetchSuperheroByPower(searchInput);
        } else if (searchCriteria === 'race') {
            fetchSuperheroByRace(searchInput);
        } else if (searchCriteria === 'publisher') {
            fetchSuperheroByPublisher(searchInput);
        }
    });
});