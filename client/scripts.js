var nCriteria = 5

function fetchAndRenderData(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const resultsElement = document.querySelector('.results');
            // Clear the existing content inside of the results div
            resultsElement.innerHTML = ''; 
            // Checks to see if it is one result or an array
            if (Array.isArray(data)) {
                // If array, creates multiple result boxes inside of results
                // data.forEach(result => {
                //     const resultBox = createResultBox(result);
                //     resultsElement.appendChild(resultBox);
                // });
                for(let i=0; i<nCriteria; i++){
                    const resultBox = createResultBox(data[i]);
                    resultsElement.appendChild(resultBox);

                }
            } 
            else {
                // If single element just creates one resultbox
                const resultBox = createResultBox(data);
                resultsElement.appendChild(resultBox);
            } 
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function createResultBox(result) {
    // Creates new div element named result box
    const resultBox = document.createElement('div');
    resultBox.className = 'result-box';
    // Adds each key of the result into the box as a p element
    if(typeof result == 'string'){
        // If result is a single string, add just the string
        const attributeElement = document.createElement('p')
        attributeElement.textContent = `${result}`
        resultBox.appendChild(attributeElement)

    } else {
        // If its an object, add each attribute
        for (const key in result) {
            
            if (result.hasOwnProperty(key)) {
                const attributeElement = document.createElement('p');
                attributeElement.textContent = `${key}: ${result[key]}`;
                resultBox.appendChild(attributeElement);
            }
        }
    }

    return resultBox;
}




function fetchSuperheroByID(id = 0) {
    const url = `http://localhost:3000/api/superheroInfo/${id}`;
    fetchAndRenderData(url);
}

function fetchSuperheroByName(name = "") {
    const url = `http://localhost:3000/api/superheroInfo/name/${name}`;
    fetchAndRenderData(url);
}

function fetchSuperheroByPower(power = "") {
    const url = `http://localhost:3000/api/powers/${power}`;
    fetchAndRenderData(url);
}

function fetchSuperheroByPublisher(publisher = "") {
    const url = `http://localhost:3000/api/publishers/${publisher}`;
    fetchAndRenderData(url);
}

function fetchSuperheroByRace(race = "") {
    const url = `http://localhost:3000/api/race/${race}`;
    fetchAndRenderData(url);
}

document.addEventListener('DOMContentLoaded', function() {
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
    // Get the select element
    var selectElement = document.getElementById('return-n');

    // Add an event listener to the select element
    selectElement.addEventListener('change', function() {
        nCriteria = parseInt(selectElement.value);
    });
});
