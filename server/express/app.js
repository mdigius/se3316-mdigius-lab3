const express = require('express');

const app = express()

app.get('/api/courses', (req, res) => {

})

app.listen(3000, () => console.log('Listening on port 3000'))