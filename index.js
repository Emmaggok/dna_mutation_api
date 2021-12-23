const server = require('./src/app.js');

const PORT = 5000;



server.listen(PORT, async () => console.log(`Server running on ${PORT}`));