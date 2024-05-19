async function fetchData() {
    try {
        const response = await fetch('https://services.isrostats.in/api/launches');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Failed to fetch data: ' + error.message);
    }
}
