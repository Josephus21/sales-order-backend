// Fetch inventory data from backend API
function fetchInventory() {
    fetch('https://your-backend-url/api/inventory') // Replace with your actual backend URL
        .then(response => response.json())
        .then(inventory => {
            displayInventory(inventory);
        })
        .catch(error => console.error('Error fetching inventory:', error));
}

// Display inventory items on the page
function displayInventory(inventory) {
    const inventoryList = document.getElementById('inventory-list');
    inventoryList.innerHTML = ''; // Clear the list

    inventory.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${item.itemName}</span> - 
            <span>${item.itemStock} in stock</span> - 
            <span>$${item.itemPrice}</span> - 
            <span>${item.itemUnit}</span>
        `;
        inventoryList.appendChild(listItem);
    });
}

// Add a new item to the inventory
document.getElementById('add-item-button').addEventListener('click', function() {
    document.getElementById('add-item-modal').style.display = 'block';
});

// Close the modal
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('add-item-modal').style.display = 'none';
});

// Submit the form to add a new item
document.getElementById('add-item-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const itemName = document.getElementById('item-name').value;
    const itemStock = parseInt(document.getElementById('item-stock').value);
    const itemPrice = parseFloat(document.getElementById('item-price').value);
    const itemUnit = document.getElementById('item-unit').value;

    const newItem = {
        itemName,
        itemStock,
        itemPrice,
        itemUnit
    };

    // Send the new item to the backend
    fetch('https://your-backend-url/api/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Item added:', data);
        fetchInventory(); // Refresh the inventory list
    })
    .catch(error => console.error('Error adding item:', error));

    // Close the modal
    document.getElementById('add-item-modal').style.display = 'none';
});

// Fetch inventory when the page loads
window.onload = fetchInventory;
