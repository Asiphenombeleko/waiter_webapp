export default function schedules() {
    let selectedDays = [];
    let username = "";
    let errorMesage;

    
    function bookDay(day) {
        if (!selectedDays.includes(day)) {
            selectedDays.push(day);
            errorMesage = `Booked ${day}`
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

    function addColor(daysBooked) {
        if (daysBooked == 3) {
          return "success";
        } else if (daysBooked < 3 && daysBooked > 0) {
          return "warning";
        } else if (daysBooked > 3) {
          return "danger";
        }
      }

    return {
        setUsername,
        getUsername,
        bookDay,
        showSelectedDays,
        addColor
    };
}
