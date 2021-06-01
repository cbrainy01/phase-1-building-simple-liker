// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!

//set visibility to hidden for error message 
const errorBanner = document.querySelector("#modal");
//errorBanner.style.visibility = "hidden";
errorBanner.setAttribute("class", "hidden");
//hearts are all part of the 'like-glyph' class so they will be an array
const arrayOfHearts = document.querySelectorAll(".like-glyph");
//for each heart, add a click event to it
//console.log(arrayOfHearts);
arrayOfHearts.forEach(heart => {
  heart.addEventListener("click", handleResponse);
  function handleResponse() {
   
    //invoke server call
    mimicServerCall()
    
    //with a good server response, turn the text content of the heart to a full heart
      .then( (responseData) => {
       
        //const span = document.querySelector(".like-glyph");
       // console.log(heart.classList);
          if(heart.innerHTML === EMPTY_HEART) {
            /**make it full */
               heart.innerHTML = FULL_HEART;
               heart.className = "activated-heart";
           }
           else  {
                   /**make it empty */
           heart.textContent = FULL_HEART;
           heart.className = "";
               }

    }
      )
      //with a bad server response, display error banner
      .catch(
        (error) => { 
          console.log(error);
          //make error banner visible
           errorBanner.classList.remove("hidden")
          //use settimeout to hide visibility after three secs
           setTimeout(  () => {errorBanner.setAttribute("class", "hidden")}, 3000);
        })
       
        

  }

});

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
