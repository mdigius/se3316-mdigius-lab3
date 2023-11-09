const express = require('express');
const fs = require('fs');
const cors = require('cors');
const storage = require('node-persist');

const initializeStorage = async () => {
    await storage.init();
    
  };

initializeStorage();
const app = express();

app.use(cors());

const superheroInfo = JSON.parse(fs.readFileSync('superhero_info.json'));
const superheroPowers = JSON.parse(fs.readFileSync('superhero_powers.json'));
app.use(express.json());

// Returns all superhero list names (Keys in the storage)
app.route('/api/lists')
    .get(async (req, res) => {
        res.json(await storage.keys());

    })
    .post(async (req, res) => {
        const { listName } = req.body;
        console.log(listName);

        const currentListNames = await storage.keys();

        for (const existingListName of currentListNames) {
            console.log(existingListName);
            if (existingListName === listName) {
                return res.status(400).json({ error: 'List name already exists in the database' });
            }
        }

        if (!listName) {
            return res.status(400).json({ error: 'No list name in the request body' });
        }

        // Creates a new item in the storage with the listName and an empty array of hero ID's
        await storage.setItem(listName, []);

        // Sends a 201 successful message if the list is created successfully
        res.status(201).json({ message: 'Superhero list created successfully', listName });
    });
app.route('/api/lists/:name')
    .get(async (req, res) => {
        const listName = req.params.name
        const listIDs = await storage.valuesWithKeyMatch(listName)

        if(listIDs.length > 0){
            res.json(listIDs)
        } else {
            res.status(404).json({ message: `No existing superhero ids for listName: ${listName}` });
        }
    })
    .post(async (req, res) => {
        const listName = req.params.name;
        const idToAdd = req.body.heroID
        console.log(idToAdd)
        prevIDs = await storage.getItem(listName)
        console.log(prevIDs)
        if (!listName) {
            return res.status(400).json({ error: 'No list name in the request body' });
        }
        
            
        if (prevIDs.includes(idToAdd)) {
            return res.status(400).json({ error: `Superhero already in list: ${listName}`});
        }
        
        prevIDs.push(idToAdd)
        // Updates the value for the given list with the new IDs array with the added id
        await storage.updateItem(listName, prevIDs);

        // Sends a 201 successful message if the list is created successfully
        res.status(201).json({ message: `Superhero with id ${idToAdd} successfully added to: `, listName });

    })




// Returns JSON objects of all superheroes
app.route('/api/superheroInfo')
    .get((req, res) => {
        res.json(superheroInfo);
    });

// Functionality for searching by superheroID
app.route('/api/superheroInfo/:id')
    .get((req, res) => {
        const superheroId = parseInt(req.params.id);
        const superhero = superheroInfo.find((hero) => hero.id === superheroId);
        if (superhero) {
            res.json(superhero);
        } else {
            res.status(404).json({ message: `No existing superhero with id: ${superheroId}` });
        }
    });

// Functionality for searching by name
app.route('/api/superheroInfo/name/:name')
    .get((req, res) => {
        const name = req.params.name.toLowerCase();
        const superheroes = superheroInfo.filter((hero) => hero.name.toLowerCase().includes(name));
        if (superheroes.length > 0) {
            res.json(superheroes);
        } else {
            res.status(404).json({ message: `No existing superhero with name: ${name}` });
        }
    });

// Functionality for searching powers for a given superhero name
app.route('/api/powers/hero/:name')
    .get((req, res) => {
        const name = req.params.name.toLowerCase();
        const powers = superheroPowers.find((power) => power.hero_names.toLowerCase() === name);
        const truePowers = new Set()
        if (powers) {
            // Loops over all powers and only appends true powers to the set
            for(const power in powers){
                if(powers[power] == 'True'){
                    truePowers.add(power)
                }
            }
            res.json(Array.from(truePowers));
        } else {
            res.status(404).json({ message: `No existing powers for superhero with name: ${name}` });
        }
    });

// Search functionality to return all hero names with a given power
app.get('/api/powers/:power', (req, res) => {
    const requestedPower = req.params.power.toLowerCase();
    const heroes = new Set();

    superheroPowers.forEach((hero) => {
        // Convert each power name to lowercase for case-insensitive comparison
        for (const key in hero) {
            if (key.toLowerCase().includes(requestedPower)) {
                if (hero[key].toLowerCase() === 'true') {
                    // Checks to see if there is a hero found, and not just a null object
                    const foundHero = superheroInfo.find((heroObj) => heroObj.name.toLowerCase() === hero.hero_names.toLowerCase());
                    if (foundHero) {
                        heroes.add(foundHero);
                    }
                }
            }
        }
    });

    if (heroes.size > 0) {
        res.json(Array.from(heroes));
    } else {
        res.status(404).json({ message: `No existing heroes for power: ${req.params.power}` });
    }
});


// Returns list of all publishers
app.get('/api/publishers', (req, res) => {
    const publishers = new Set();
    superheroInfo.forEach((hero) => {
        publishers.add(hero.Publisher.toLowerCase());
    });
    res.json(Array.from(publishers));
});

// Returns a list of all heroes from a given publisher
app.get('/api/publishers/:id', (req, res) => {
    const pub = req.params.id.toLowerCase();
    const heroes = new Set();
    superheroInfo.forEach((hero) => {
        if (hero.Publisher.toLowerCase().includes(pub)) {
            heroes.add(hero);
        }
    });
    if (heroes.size > 0) {
        res.json(Array.from(heroes));
    } else {
        res.status(404).json({ message: `No existing heroes for publisher: ${pub}` });
    }
});

// Return list of all races
app.get('/api/race', (req, res) => {
    const races = new Set();
    superheroInfo.forEach((hero) => {
        races.add(hero.Race.toLowerCase());
    });
    res.json(Array.from(races));
});

// Returns a list of all hero names from a given race
app.get('/api/race/:id', (req, res) => {
    const race = req.params.id.toLowerCase();
    const heroes = new Set();
    superheroInfo.forEach((hero) => {
        if (hero.Race.toLowerCase().includes(race)) {
            heroes.add(hero);
        }
    });
    if (heroes.size > 0) {
        res.json(Array.from(heroes));
    } else {
        res.status(404).json({ message: `No existing heroes for race: ${race}` });
    }
});

app.listen(3000, () => console.log('Listening on port 3000'));
