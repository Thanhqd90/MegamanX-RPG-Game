$(document).ready(function () { // document.ready start
	// Define characters as objects
	var characters = {

	  "Megaman X": {
		name: "Megaman X",
		health: 500,
		attack: 25,
		imageUrl: "assets/images/mmx.png",
		enemyAttackBack: 15
		},
		
	  "Zero": {
		name: "Zero",
		health: 400,
		attack: 35,
		imageUrl: "assets/images/zero.png",
		enemyAttackBack: 18
		},
		
	  "Axl": {
		name: "Axl",
		health: 450,
		attack: 25,
		imageUrl: "assets/images/axl.png",
		enemyAttackBack: 25
		},
		
	  "Sigma": {
		name: "Sigma",
		health: 900,
		attack: 45,
		imageUrl: "assets/images/sigma.png",
		enemyAttackBack: 50
		},
		
	  "Vile": {
		name: "Vile",
		health: 750,
		attack: 40,
		imageUrl: "assets/images/vile.png",
		enemyAttackBack: 40
		}
		
	};
  
	// Music + button click event listener
	var zerotheme = new Audio('./assets/sounds/zero.mp3');
	
		$("#song").on("click", function () {
	  	zerotheme.play();
		});
  
		$("#pause").on("click", function () {
	  	zerotheme.pause();
		});
  
  
  // Sound effects
	var newGameSound = new Audio('./assets/sounds/newgame.wav');
	var selectHover = new Audio('./assets/sounds/hover.wav');
	var selectSound = new Audio('./assets/sounds/select.wav');
	var attackSound = new Audio('./assets/sounds/attack.wav');
	var winSound = new Audio('./assets/sounds/win.mp3');
	var loseSound = new Audio('./assets/sounds/defeat.wav');
  
  // Character containers
	var selectedCharacter;
	var remainingCharacters = [];
	var opponent;

	// Game state
	var turnNumber = 1;
	var defeated = 0;

	//-----------------All Functions-----------------------
		
	// Restart game when button is clicked
		$("#restartGame").click(function (){
			window.location.reload(true);
		});

	// Initailize game and create characters
		function initalizeGame() { // Start initializeGame
			for (var i in characters) {
				createCharacter(characters[i], "#characterSection");
				}
			}; // End intializeGame
		
	// Run intializeGame when new name is clicked
		$("#newGame").on("click", function () { // Click event start
			newGameSound.play();
			initalizeGame();
			$( "#newGame" ).prop( "disabled",true);
			$(".character-image").mouseenter(function() {
			selectHover.play();
			$("#atkButton").hide()
			});

		}); // Click event end
		
	// Create characters and place them in approprite areas with data from objects
		function createCharacter(character, placeCharacter) { // createCharacter start
	  	var charDiv = $("<div class='character' data-name='" + character.name + "'>");
	  	var charName = $("<div class='character-name'>").text(character.name);
	  	var charImage = $("<img class='character-image'>").attr("src", character.imageUrl);
	  	var charHealth = $("<div class='character-health'>").text(character.health);
			
		// Write to HTML
			charDiv.append(charName).append(charImage).append(charHealth);
			$(placeCharacter).append(charDiv);
			$(".selectCharacter").text("Select Character");
			
	}; // createCharacter end

	// Display remaining opponents
   	function createOpponent(enemyArr) { // 
	  	for (var i = 0; i < enemyArr.length; i++) {
			createCharacter(enemyArr[i], "#remainingOpponents");
	  	}
		};
	
	// On click event for selecting our character
		$("#characterSection").on("click", ".character", function () { // Character selection start
			var name = $(this).attr("data-name");
			
	  		if (!selectedCharacter) {
				selectedCharacter = characters[name];

			// Loop through remaining characters array and push them into remainingCharacters array
				for (var i in characters) {
				if (i !== name) {
				remainingCharacters.push(characters[i]);
		  	}
			}
			
			selectSound.play();
			$("#characterSection").hide();
			updateSelection(selectedCharacter, "#selectedCharacter");
			$("#yourCharacter").text("Your Character");
			createOpponent(remainingCharacters);

	  	}
	}); // characterSelection End
  
	// On click event for remaining opponents + generate attack button
		$("#remainingOpponents").on("click", ".character", function () {
	  	var name = $(this).attr("data-name");
  
	  	if ($("#opponent").children().length === 0) {

			opponent = characters[name];
			updateSelection(opponent, "#opponent");

			$(this).remove();
			selectSound.play();
			$("#currentOpponent").text("Current Opponent");
			$("#atkButton").css("display","inline-block");
	  }
	});

	// Updates character selection when opponent is defeated
	function updateSelection(charObj, areaRender) {
		$(areaRender).empty();
		createCharacter(charObj, areaRender);
	};


		$("#atkButton").on("click", function () { // On click event for attack button start

				attackSound.play();

				var attackMessage = "You attacked " + opponent.name + " for " + (selectedCharacter.attack * turnNumber) + " damage.";
				var counterAttackMessage = opponent.name + " attacked you back for " + opponent.enemyAttackBack + " damage.";
			
	
	  	if ($("#opponent").children().length > 0) {

				clearMessage();
				opponent.health = opponent.health -= (selectedCharacter.attack * turnNumber)
  
			if (opponent.health > 0) {
				createMessage(attackMessage);
				createMessage(counterAttackMessage);
				selectedCharacter.health = selectedCharacter.health -= opponent.enemyAttackBack;

			turnNumber++;
		  	updateSelection(opponent, "#opponent");
		  	updateSelection(selectedCharacter, "#selectedCharacter");
  
		  if (selectedCharacter.health <= 0) {
				attackSound.pause();
				loseSound.play();
				clearMessage();
				$("#atkButton").hide();
				alert("You have been defeated");
		  	}
			}
			
			else { 
				$("#opponent").empty();
				defeated++;
  
		  if (defeated >= remainingCharacters.length) {
				zerotheme.pause();
				attackSound.pause();
				winSound.play()
				clearMessage();
				alert("You win!!")
				$("#atkButton").hide();
		  	}
  
				}

	  	}
	  	else {
		// Create alert to select opponent if opponent area is empty
		clearMessage();
		newGameSound.play();
		attackSound.pause();
		alert("You must select an opponent to battle!!");
		}
	}); // On click event for attack button end
		
	// Create battle message
		function createMessage(message) { // createMessage start
			var newMessage = $("<div>").text(message);
			var gameMessageSet = $("#battleMessage");
				gameMessageSet.append(newMessage);
		}; // createMessage end
		
		function clearMessage() { // clearMessage start
			$("#battleMessage").empty();
			console.log("message has been cleared")
		}; // clearMessage end
		
		

  }); // document.Ready end
  