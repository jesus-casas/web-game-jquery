setTimeout(function () {
    // Intentionally block the thread for 500ms
    let start = performance.now();
    while (performance.now() - start < 500) {
      // Busy wait
    }
    console.log("Finished long timeout task");
  }, 1000);
  
  window.addEventListener("scroll", function () {
    // Simulate long processing
    let start = performance.now();
    while (performance.now() - start < 300) {}
    console.log("Scrolled with delay");
  });
  
  
  $(function() { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.
      
      // Called function to update the name, happiness, and weight of our pet in our HTML
      checkAndUpdatePetInfoInHtml();
    
      // When each button is clicked, it will "call" function for that button (functions are below)
      $('.treat-button').click(clickedTreatButton);
      $('.play-button').click(clickedPlayButton);
      $('.exercise-button').click(clickedExerciseButton);
  // USING FIRST METHOD HERE ".one()" is used here to trigger a one-time message the first time a treat is given to the pet
      $('.treat-button').one("click", function () {
        showComment("These treats will help me grow!!");
      });
    
  })
  
  
  // USING SECOND METHOD HERE ".is()" is used here to check if the pet image already has the "evolved" class before applying the evolution logic
  $('.evolve-button').click(function () {
    if (pet_info.weight >= 85 && currEvolveStage === 2 && !$(".pet-image").is(".evolved-charizard")) {
      $(".pet-image").attr("src", "https://cdn.glitch.global/01d4aaa4-4a93-45ed-b44e-30726867764b/3.jpg?v=1744317166364");
      $(".pet-image").addClass("evolved-charizard");
      showComment("Charmeleon evolved into Charizard!");
      currEvolveStage = 3;
  
    } else if (pet_info.weight >= 65 && currEvolveStage === 1 && !$(".pet-image").is(".evolved-charmeleon")) {
      $(".pet-image").attr("src", "https://cdn.glitch.global/01d4aaa4-4a93-45ed-b44e-30726867764b/2.jpg?v=1744317162565");
      $(".pet-image").addClass("evolved-charmeleon");
      showComment("Charmander evolved into Charmeleon!");
      currEvolveStage = 2;
  
    } else if (currEvolveStage === 3) {
      showComment("Fully evolved!");
  
    } else {
      showComment("Not enough weight to evolve yet.");
    }
  });
  
    
      // Add a variable "pet_info" equal to a object with the name (string), weight (number), and happiness (number) of your pet
      let pet_info = {name:"Charmander", weight: 45, happiness: 20};
  
      // 1 = Charmander, 2 = Charmeleon, 3 = Charizard
      let currEvolveStage = 1; 
    
      function clickedTreatButton() {
        // Increase pet happiness
        pet_info.happiness += 2;
        // Increase pet weight
        pet_info.weight += 2;
        // Comment
        showComment("Very tasty! :)");
        checkAndUpdatePetInfoInHtml();
        console.info("1 INFO: Treat button clicked.");
      }
      
      function clickedPlayButton() {
        // Increase pet happiness
        pet_info.happiness++;
        // Decrease pet weight
        pet_info.weight -= 0.25;
        // Comment
        showComment("Very fun!");
        checkAndUpdatePetInfoInHtml();
      }
      
      function clickedExerciseButton() {
        console.group("5 Exercise Action");
        console.log("Decreasing happiness and weight.");
        pet_info.happiness--;
        pet_info.weight -= 0.5;
        console.log("New stats:", pet_info.happiness, pet_info.weight);
        console.groupEnd();
  
        showComment("What a workout!");
        checkAndUpdatePetInfoInHtml();
      }
    
      function checkAndUpdatePetInfoInHtml() {
        checkWeightAndHappinessBeforeUpdating();  
  
        updatePetInfoInHtml();
        console.log("4 ")
        console.table(pet_info);
      }
      
      function checkWeightAndHappinessBeforeUpdating() {
        // Add conditional so if weight is lower than zero.
        if (pet_info.weight < 0) {
          pet_info.weight = 0;
        }
        if (pet_info.happiness < 0) {
          pet_info.happiness = 0;
        }
        if (pet_info.weight > 90) {
          console.warn("2 WARNING: Pet weight is unhealthy.");
        }
      }
      
      // Updates your HTML with the current values in your pet_info object
      function updatePetInfoInHtml() {
        $('.name').text(pet_info['name']);
        $('.weight').text(pet_info['weight']);
        $('.happiness').text(pet_info['happiness']);
        
          // Update evolve status message
        if (currEvolveStage === 1 && pet_info.weight >= 65) {
          $('.evolve').text("Ready to evolve into Charmeleon!");
          console.log("6 Custom Log: Evolving from Charmander to Charmeleon");
        } else if (currEvolveStage === 2 && pet_info.weight >= 85) {
          $('.evolve').text("Ready to evolve into Charizard!");
        } else if (currEvolveStage === 3) {
          $('.evolve').text("Fully evolved!");
        } else {
          $('.evolve').text("Not Ready. Increase weight");
          console.error("3 ERROR: Tried to evolve without meeting weight requirement.");
        }
        
      }
    
      // Show a short comment from the pet (instead of using console.log or alert)
      function showComment(message) {
      $("#comment")
        .stop(true, true)
        .text(message)
        .fadeIn()
        .delay(1500)
        .fadeOut();
      }