export default function schedules(){
    let selectedDays = [];

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
      console.log(`${index + 1}. ${day}`);
    });
  }
}
return{
    bookDay,
    showSelectedDays

}

}