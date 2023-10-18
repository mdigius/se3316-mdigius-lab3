// Require express and filesystem modules
const express = require('express');
const fs = require('fs')

const app = express()


const superheroInfo = JSON.parse(fs.readFileSync('superhero_info.json'));
const superheroPowers = JSON.parse(fs.readFileSync('superhero_powers.json'));
app.use(express.json())
// Returns json objects of all superheroes
app.route('/api/superheroInfo')
    .get((req, res) => {
        res.json(superheroInfo)
    })
// Functionality for searching by superheroID
app.route('/api/superheroInfo/:id')
    .get((req, res) => {
        const superheroId = parseInt(req.params.id);
        const superhero = superheroInfo.find((hero) => hero.id == superheroId);
        if (superhero) {
            res.json(superhero);
        } else {
            res.status(404).json({ message: `No existing superhero with id: ${superheroId}` });
        }
    })
// Functionality for searching by name
app.route('/api/superheroInfo/name/:name')
    .get((req, res) => {
        const name = req.params.name;
        const superhero = superheroInfo.find((hero) => hero.name == name);
        if (superhero) {
            res.json(superhero);
        } else {
            res.status(404).json({ message: `No existing superhero with name: ${name}` });
        }
    })
// Functionality for searching powers by name
app.route('/api/powers/:name')
    .get((req, res) => {
        const name = req.params.name;
        const powers = superheroPowers.find((power) => power.hero_names == name);
        if (powers) {
            res.json(powers);
        } else {
            res.status(404).json({ message: `No existing powers for superhero with name: ${name}` });
        }
    })

    app.get('/api/publishers', (req, res) => {
        // Stores unique publishers in a set
        const publishers = new Set(); 
        superheroInfo.forEach((hero) => {
          publishers.add(hero.Publisher);
        });
      
        res.json(Array.from(publishers)); // Convert Set to an array and send it as a response
      });

app.listen(3000, () => console.log('Listening on port 3000'))