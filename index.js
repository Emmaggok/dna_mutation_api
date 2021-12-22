const express = require('express');
const server = require('./src/app.js');

const PORT = 5000;



server.listen(PORT, () => console.log(`Server running on ${PORT}`));