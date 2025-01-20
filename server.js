const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Sample inventory data (replace with a database or CSV if needed)
let inventory = [
    { itemName: 'Item 1', itemStock: 10, itemPrice: 50, itemUnit: 'PC' },
    { itemName: 'Item 2', itemStock: 20, itemPrice: 30, itemUnit: 'PC' },
    { itemName: 'Item 3', itemStock: 5, itemPrice: 100, itemUnit: 'REAM' },
];

// API route to get inventory data
app.get('/api/inventory', (req, res) => {
    res.json(inventory);
});

// API route to add a new item to the inventory
app.post('/api/inventory', (req, res) => {
    const newItem = req.body;
    inventory.push(newItem);
    res.status(201).json(newItem); // Respond with the newly added item
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
