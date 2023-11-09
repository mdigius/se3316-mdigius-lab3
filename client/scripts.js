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
    return resultBox;
}
function displayListHeroes() {
    const listResults = document.querySelector('.list-results');
    // Iterate over the child elements of listResults
    for (let i = 0; i < listResults.children.length; i++) {
        const listItem = listResults.children[i];
        const listName = listItem.textContent
        fetch(`http://localhost:3000/api/lists/${listName}`)
            .then(response => response.json())
            .then(data => {
                if(Array.isArray(data)){
                    for(let i = 0; i < data.length; i++){
                        for(let j = 0; j < data[i].length; j++){
                            fetch(`http://localhost:3000/api/superheroInfo/${data[i][j]}`)
                                .then(response => response.json())
                                .then(data => {
                                    listItem.appendChild(createResultBox(data))
                                })
                            }
                        
                    }
                }
            })
    }
}
function fetchHeroLists(){
    const url = 'http://localhost:3000/api/lists'

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const listResults = document.querySelector('.list-results')
            const listSelector = document.getElementById('list-select')
            listResults.innerHTML = ''
            listSelector.innerHTML = ''

            if (Array.isArray(data)) {
                for (let i = 0; i < data.length && i < data.length; i++) {
                    console.log(data[i])
                    const heroList = createHeroList(data[i]);
                    listResults.appendChild(heroList);

                    const option = document.createElement('option');
                    option.value = data[i];
                    option.textContent = data[i];
                    listSelector.appendChild(option);
                    
                }
            }
            
            displayListHeroes()
            
            
        })
        
    
}

function createHeroList(result){
    // Creates new div element named result box
    const resultBox = document.createElement('div');
    resultBox.className = 'hero-result-box';
    // Adds each key of the result into the box as a p element
        // If its an object, add each attribute
        
    const attributeElement = document.createElement('p');
    attributeElement.textContent = result
    resultBox.appendChild(attributeElement);
            
        
    return resultBox;
}

function postSuperHeroList(listName) {
    // API url to superhero lists
    const url = 'http://localhost:3000/api/lists';
    const data = { listName };
    
    // Sends post request with listName in body
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    // Handles all possible responses from the API
    .then(response => {
      if (!response.ok) {
        alert(`Error! List with name ${listName} already exists!`)
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(responseData => {
      console.log('POST successful:', responseData);
    })
    .catch(error => {
      console.error('Error:', error);
    });
    
  }

  function postSuperHeroIDToList(listName, heroID) {
    // API url to superhero lists
    const url = `http://localhost:3000/api/lists/${listName}`;
    const data = { heroID };
    
    // Sends post request with listName in body
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    // Handles all possible responses from the API
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(responseData => {
      console.log('POST successful:', responseData);
    })
    .catch(error => {
      console.error('Error:', error);
    });
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
    if(document.getElementById('create-list-button')!=null){
        document.getElementById('create-list-button').addEventListener('click', function() {
            nameInput = document.getElementById('list-name-input').value
            if(nameInput!=''){
                postSuperHeroList(nameInput)
                document.getElementById('list-name-input').value = ''
                setTimeout(function() {
                    fetchHeroLists()
                }, 1000)
            } else {
                alert('Please enter a list name!')
            }
            
        })
        document.getElementById('add-button').addEventListener('click', function() {
            idInput = parseInt(document.getElementById('hero-id-input').value)
            selectedList = document.getElementById('list-select').value
            if(!isNaN(idInput)){
                postSuperHeroIDToList(selectedList, idInput)
            } else {
                alert('Please enter a valid hero ID!')
            }
            setTimeout(function() {
                fetchHeroLists()
            }, 1000)
        })
        fetchHeroLists()
    }
    if(document.getElementById('search-button')!=null){
        document.getElementById('search-button').addEventListener('click', function() {
            const searchInput = document.getElementById('search-input').value;
            const searchCriteria = document.getElementById('search-criteria').value;
            if(searchInput!=''){
                if (searchCriteria === 'name') {
                    fetchSuperheroByName(searchInput);
                } else if (searchCriteria === 'power') {
                    fetchSuperheroByPower(searchInput);
                } else if (searchCriteria === 'race') {
                    fetchSuperheroByRace(searchInput);
                } else if (searchCriteria === 'publisher') {
                    fetchSuperheroByPublisher(searchInput);
                }
            } else {
                alert(`Please Enter Search Criteria!`);
            }
        });
    }
    // Get the select element
    var selectElement = document.getElementById('return-n');
    

    // Add an event listener to the select element
    if(selectElement!=null){
        selectElement.addEventListener('change', function() {
            nCriteria = parseInt(selectElement.value);
        });
    }
    
});

