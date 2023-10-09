export default function routes(waiterModule, waiterData) {

   async function home(req, res) {
      let successMessage = req.flash("success")[0]
      res.render('index', {
         successMessage
      })
   }

   async function enterUsername(req, res) {

      const username = req.body.username;
      console.log(username);
      if (username) {
         await waiterData.insertUsername(username)
      }
      req.flash("success", "You have successfully booked your days")
      res.redirect("/waiters/" + username)

   }


   async function selectDays(req, res) {
      res.render('waiter', {
         username: req.params.username
      })

   }
   async function getSelectedDays(req, res) {
      const selectedDays = req.body.weekday
      console.log(selectedDays);
      const username = req.params.username

   }
   return {
      home,
      enterUsername,
      selectDays,
      getSelectedDays
   }
}