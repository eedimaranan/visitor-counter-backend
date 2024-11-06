document.addEventListener("DOMContentLoaded", () => {
    const visitorCountElement = document.getElementById("visitor-count");

    function displayCachedVisitorCount() {
        const cachedCount = localStorage.getItem("visitorCount");
        if (cachedCount !== null) {
            visitorCountElement.textContent = `Visitor Count: ${cachedCount}`;
        }
    }

    function hasVisitedToday() {
        const lastVisitDate = localStorage.getItem("lastVisitDate");
        const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
        return lastVisitDate === today;
    }

    function markVisitToday() {
        const today = new Date().toISOString().split("T")[0];
        localStorage.setItem("lastVisitDate", today);
    }

    async function fetchVisitorCount() {
        try {
            let response;
            // If the visitor has already been counted today, use GET to fetch the count without incrementing
            if (hasVisitedToday()) {
                console.log("Visitor has already been counted today. Fetching latest count without incrementing.");
                response = await fetch("https://ud23v6jy6d.execute-api.ap-southeast-2.amazonaws.com/visitor", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            } else {
                // If they haven't been counted, increment the count with a POST request
                response = await fetch("https://ud23v6jy6d.execute-api.ap-southeast-2.amazonaws.com/visitor-count", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                markVisitToday(); // Mark visit only after a successful POST request
            }

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            const visitorCount = data.count; // Adjust this based on your API's response structure

            // Update the page with the latest visitor count
            visitorCountElement.textContent = `Visitor Count: ${visitorCount}`;

            // Cache the latest visitor count
            localStorage.setItem("visitorCount", visitorCount);

        } catch (error) {
            console.error("Error updating visitor count:", error);
        }
    }

    // Display cached count first
    displayCachedVisitorCount();

    // Fetch the latest count in the background
    fetchVisitorCount();
});
