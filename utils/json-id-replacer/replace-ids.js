const fs = require('fs');
const path = require('path');

// Define file paths
const jsonFilePath = path.join(__dirname, 'data.json');
const idsFilePath = path.join(__dirname, 'ids.txt');
const outputFilePath = path.join(__dirname, 'updated_data.json');

// Read and parse the JSON file
fs.readFile(jsonFilePath, 'utf8', (err, jsonData) => {
    if (err) {
        console.error('Error reading JSON file:', err);
        return;
    }

    const jsonObject = JSON.parse(jsonData);

    // Read the IDs file
    fs.readFile(idsFilePath, 'utf8', (err, idsData) => {
        if (err) {
            console.error('Error reading IDs file:', err);
            return;
        }

        const newIds = idsData.trim().split('\n');

        const updated_data = newIds.map(item => {
            const newObject = {...jsonObject};
            newObject.id = item;
            return newObject;
        });

        // Write updated JSON to a new file
        fs.writeFile(outputFilePath, JSON.stringify(updated_data, null, 4), 'utf8', (err) => {
            if (err) {
                console.error('Error writing updated JSON file:', err);
                return;
            }
            console.log('IDs replaced successfully. Updated data saved to', outputFilePath);
        });
    });
});