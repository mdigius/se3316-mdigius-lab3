var nCriteria = 8

function fetchAndRenderData(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const resultsElement = document.querySelector('.results');
            // Clear the existing content inside of the results div
            resultsElement.innerHTML = '';

            if (Array.isArray(data)) {
                for (let i = 0; i < nCriteria && i < data.length; i++) {
                    const resultBox = createResultBox(data[i]);
                    resultsElement.appendChild(resultBox);
                }
            } else {
                if (data && !data.message) {
                    const resultBox = createResultBox(data);
                    resultsElement.appendChild(resultBox);
                } else if (data && data.message) {
                    const errorBox = createErrorBox(data.message);
                    resultsElement.appendChild(errorBox);
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function createErrorBox(errorMessage) {
    const errorBox = document.createElement('div');
    errorBox.className = 'error-box';
    const errorMessageElement = document.createElement('p');
    errorMessageElement.textContent = errorMessage;
    errorBox.appendChild(errorMessageElement);
    return errorBox;
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
        const button = document.createElement('button')
        button.textContent = 'View Powers'
        button.addEventListener('click', () => {
            const heroName = result['name'];
            // Fetch powers for given hero name from API
            fetch(`http://localhost:3000/api/powers/hero/${heroName}`)
                .then(response => response.json())
                .then(powers => {
                    // Put each power on a new line
                    const powersText = powers.join('\n'); 
                    // Format the powers and place on a alert with the name of the hero user is viewing.
                    alert(`${heroName}'s Powers:\n${powersText}`);
                })
                .catch(error => {
                    console.error('Error fetching powers:', error);
                });
            
        })
        resultBox.appendChild(button)

        
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
