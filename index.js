const server = require('./src/app.js');

const PORT = process.env.PORT || 5000;



server.listen(PORT, async () => console.log(`Server running on ${PORT}`));