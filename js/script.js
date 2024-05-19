// Define a variable to store the initial data
let allLaunches = [];

document.getElementById('get-stats').addEventListener('click', fetchData);
document.getElementById('search-button').addEventListener('click', performSearch);
document.getElementById('search-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
});

async function fetchData() {
    const statsContainer = document.getElementById('stats');
    const errorMessage = document.getElementById('error-message');
    
    try {
        // Clear previous results and errors
        statsContainer.innerHTML = '';
        errorMessage.innerHTML = '';
        
        const apiUrl = 'https://services.isrostats.in/api/launches';
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        allLaunches = await response.json(); // Store the fetched data
        
        // Sort launches in descending order based on launch date
        allLaunches.sort((a, b) => new Date(b.LaunchDate) - new Date(a.LaunchDate));

        displayData(allLaunches, statsContainer);
        
        // Hide the button after data is fetched
        document.getElementById('get-stats').style.display = 'none';
    } catch (error) {
        errorMessage.innerHTML = 'Failed to fetch data: ' + error.message;
        console.error('There has been a problem with your fetch operation:', error);
    }
}

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
