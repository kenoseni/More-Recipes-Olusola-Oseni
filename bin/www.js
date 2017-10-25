// This is the application entry 
import http from 'http'
import app from '../app' // The express app we just created

// Set the app entry port
const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
