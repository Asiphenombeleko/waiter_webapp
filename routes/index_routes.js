export default function routes(waiterModule, waiterData) {

   async function home(req, res) {

      res.render('index', {

      })
   }
   async function enterUsername(req, res) {

      const username = req.body.username;
      console.log(username);
      if (username) {
         await waiterData.insertUsername(username)
      }
      res.redirect("/waiters/" + username)

   }

   async function selectDays(req, res) {
      let errorMessage = req.flash("error")[0]
      let successMessage = req.flash("success")[0]
     
      res.render('waiter', {
         username: req.params.username,
         errorMessage,
         successMessage,
         
      })
   }
   async function getSelectedDays(req, res) {
      const selectedDays = req.body.weekday;
      const username = req.params.username;

      if (!selectedDays || selectedDays.length < 3 || selectedDays.length > 5) {
         req.flash("error", "Please select between 3 and 5 days.");

         return res.redirect(`/waiters/${username}`);
      }
      const userId = await waiterData.getUserId(username);
      if (userId) {
         await waiterData.bookShift({ id: userId }, selectedDays);
        
         req.flash("success", "You have successfully booked your days.");

      }
      return res.redirect(`/waiters/${username}`);


   }
   async function showNameAndDays(req, res) {
      // Retrieve data using the joiningTables function from my waiterData module
      let result =  await waiterData.joiningTables();
      let weekday = await waiterData.showDays()
      // console.log(result);
      res.render('admin', {
        result,
        weekday
      });
    
    }
   return {
      home,
      enterUsername,
      selectDays,
      getSelectedDays,
      showNameAndDays
   }
}