const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Function to read and parse the configuration
function getConfig() {
    try {
        const configPath = path.join(__dirname, 'response.json');
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        return config;
    } catch (error) {
        console.error('Error reading configuration:', error);
        return {
            contentType: 'application/json',
            responseFile: 'response.txt'
        };
    }
}

// Function to read the response file
function getResponse() {
    try {
        const config = getConfig();
        const responsePath = path.join(__dirname, config.responseFile);
        let response = fs.readFileSync(responsePath, 'utf8');
        
        // Replace any template variables
        response = response.replace('{{timestamp}}', new Date().toISOString());
        
        return response;
    } catch (error) {
        console.error('Error reading response file:', error);
        return JSON.stringify({ error: 'Internal server error' });
    }
}

// Catch-all route that handles all URLs
app.all('*', (req, res) => {
    const config = getConfig();
    const response = getResponse();
    
    res.setHeader('Content-Type', config.contentType);
    res.send(response);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Configuration loaded from response.json`);
    console.log(`Response will be read from: ${getConfig().responseFile}`);
}); 