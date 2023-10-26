export default function schedules(waiterModule) {
    let selectedDays = [];
    let username = "";
    let errorMesage;

    
    function bookDay(day) {
        if (!selectedDays.includes(day)) {
            selectedDays.push(day);
            errorMesage = `Booked: ${day}`
        } else {
            errorMesage = `Already booked: ${day}`
            console.log(errorMesage);
        }
    }

   
    function showSelectedDays() {
        if (selectedDays.length === 0) {
            errorMesage = "No days booked yet.";
        } else {
            console.log("Selected Days:");
            selectedDays.forEach((day, index) => {
               errorMesage = `${index + 1}. ${day}`;
            });
        }
    }

  
    function setUsername(newUsername) {
        if (!newUsername || newUsername.trim() === "") {
            errorMesage = "Error: Username is empty or undefined. Please provide a valid username.";
        } else {
            username = newUsername;
            errorMesage = `Hello, ${username}! Welcome.`;
        }
    }

  
    function getUsername() {
        return username;
    }

  
    async function bookDayWithWaiterModule(day) {
        if (!username || username.trim() === "") {
           errorMesage = "Error: Please set a username before booking a day.";
        } else {
            try {
                // Call waiterModule's bookDay function
                let result = await waiterModule.bookDay(username, day);
                errorMesage = result; 
            } catch (error) {
                errorMesage = ("Error while booking a day:", error);
            }
        }
    }

    return {
        setUsername,
        getUsername,
        bookDay,
        showSelectedDays,
        bookDayWithWaiterModule,
    };
}
