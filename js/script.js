// Define a variable to store the initial data
let allLaunches = [];

// Function to fetch data from the API
async function fetchData() {
    try {
        const response = await fetch('https://services.isrostats.in/api/launches');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        allLaunches = await response.json(); // Store the fetched data
        return allLaunches;
    } catch (error) {
        throw new Error('Failed to fetch data: ' + error.message);
    }
}

// Function to display data tiles
function displayData(data, container) {
    let row = document.createElement('div');
    row.className = 'row';

    data.forEach((launch, index) => {
        const launchElement = document.createElement('div');
        launchElement.className = 'launch-tile';
        launchElement.innerHTML = `
            <h3>${launch.Name || 'N/A'}</h3>
            <p>Date: ${launch.LaunchDate || 'N/A'}</p>
            <p>Vehicle: ${launch.LaunchType || 'N/A'}</p>
            <p>Payload: ${launch.Payload || 'N/A'}</p>
            <p>Launch Site: ${launch.SerialNumber || 'N/A'}</p>
            <p>Outcome: ${launch.MissionStatus || 'N/A'}</p>
            <p><a href="${launch.Link}" target="_blank">More Info</a></p>
        `;
        row.appendChild(launchElement);

        // Create a new row after every 3 tiles
        if ((index + 1) % 3 === 0) {
            container.appendChild(row);
            row = document.createElement('div');
            row.className = 'row';
        }
    });

    // Append the last row if it contains less than 3 tiles
    if (data.length % 3 !== 0) {
        container.appendChild(row);
    }
}

// Function to perform search
function performSearch() {
    const searchQuery = document.getElementById('search-input').value.trim().toLowerCase();
    const filteredLaunches = allLaunches.filter(launch =>
        launch.Name.toLowerCase().includes(searchQuery) ||
        launch.LaunchDate.toLowerCase().includes(searchQuery) ||
        launch.LaunchType.toLowerCase().includes(searchQuery) ||
        launch.Payload.toLowerCase().includes(searchQuery) ||
        launch.SerialNumber.toLowerCase().includes(searchQuery) ||
        launch.MissionStatus.toLowerCase().includes(searchQuery)
    );

    const statsContainer = document.getElementById('stats');
    statsContainer.innerHTML = ''; // Clear previous results

    displayData(filteredLaunches, statsContainer);
}

// Event listeners for search button and input field
document.getElementById('search-button').addEventListener('click', performSearch);
document.getElementById('search-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
});

// Load data and display tiles on page load
window.addEventListener('DOMContentLoaded', async () => {
    const statsContainer = document.getElementById('stats');
    try {
        const data = await fetchData();
        displayData(data, statsContainer);
    } catch (error) {
        document.getElementById('error-message').innerText = 'Failed to fetch data: ' + error.message;
        console.error('There has been a problem with your fetch operation:', error);
    }
});


// Show loading spinner when page starts loading
window.addEventListener('DOMContentLoaded', () => {
    const spinner = document.getElementById('loading-spinner');
    spinner.style.display = 'block'; // Show the spinner
});

// Load data and display tiles on page load
window.addEventListener('DOMContentLoaded', async () => {
    const statsContainer = document.getElementById('stats');
    try {
        const data = await fetchData();
        displayData(data, statsContainer);
    } catch (error) {
        document.getElementById('error-message').innerText = 'Failed to fetch data: ' + error.message;
        console.error('There has been a problem with your fetch operation:', error);
    } finally {
        const spinner = document.getElementById('loading-spinner');
        spinner.style.display = 'none'; // Hide the spinner after data is loaded
    }
});


// Get the homepage button element
const homeButton = document.getElementById("home-button");

// Add an event listener to the homepage button
homeButton.addEventListener("click", function() {
    window.location.href = "index.html";
});

// Get the aboutMe button element
const aboutMeButton = document.getElementById("aboutMe-button");

// Add an event listener to the aboutMe button
aboutMeButton.addEventListener("click", function() {
    window.location.href = "https://iamvisshu.github.io/";
});

