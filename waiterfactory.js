export default function schedules(waiterModule) {
    let selectedDays = [];

    async function getUsername(username) {
        if (username) {
           let result = await waiterModule.bookDay(day)
           return result
        }
    }


    // Function to add a day to the selectedDays array
    function bookDay(day) {
        if (!selectedDays.includes(day)) {
            selectedDays.push(day);
            console.log(`Booked: ${day}`);
        } else {
            console.log(`Already booked: ${day}`);
        }
    }

    // Function to show the selected days
    function showSelectedDays() {
        if (selectedDays.length === 0) {
            console.log("No days booked yet.");
        } else {
            console.log("Selected Days:");
            selectedDays.forEach((day, index) => {

            });
        }


    }
    function allErrors(username) {
        let errorMessage = ""
        if (!username || username.trim() === "") {
            errorMessage = "Username is empty or undefined. Please provide a valid username."
        } else {

            errorMessage = "Hello, ${username}! Welcome."
        }
    }
    return {
        getUsername,
        bookDay,
        showSelectedDays,
        allErrors



    }

}