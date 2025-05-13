// Function to fetch the data from the JSON file and populate the table
async function fetchDataAndPopulateTable() {
    try {
        const response = await fetch('../summary.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const statsData = await response.json(); // Parse the JSON response

        // Get the table body element
        const tableBody = document.getElementById("stats-table").getElementsByTagName('tbody')[0];

        // Categories to loop through
        const categories = ["count", "mean", "std", "min", "25%", "50%", "75%", "max"];

        // Loop through each category and create a table row for it
        categories.forEach(category => {
            const row = document.createElement("tr");

            // Create the header cell for the category
            const th = document.createElement("th");
            th.textContent = category.charAt(0).toUpperCase() + category.slice(1); // Capitalize the first letter
            row.appendChild(th);

            // Loop through each key (variable name) in the category
            Object.keys(statsData[category]).forEach(key => {
                const td = document.createElement("td");
                td.textContent = statsData[category][key]; // Fill the data in the table
                row.appendChild(td);
            });

            // Append the row to the table body
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}

// Fetch data and populate the table when the page has fully loaded
document.addEventListener('DOMContentLoaded', fetchDataAndPopulateTable);
