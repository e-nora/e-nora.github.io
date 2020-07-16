/*
[IMPORTANT] You are free to create any number of helper function.
We know the problem could be seached online, and we are aware of those solutions.
So please cite sources if you took help from any online resource.
*/

// ----------------------- Important global variables (nothing to do here) ---------------------------- //

// Ids for all of the table elements. You can grab any cell element by using document.getElementById("A1");
var table_ids = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]

/*
An integer array of length 9.
Usaged: This is to store the state to the tictactoe board. E.g., if player 1 (who is X) clicks on cell 'A1', the board_state[0] will be set to 1.
If player 2 (who is O) clicks on cell 'A3', the board_state[2] will be set to 0; Any move made by player 1 is stored as a '1' and any move made by player 2 is stored as a '0'.
So, after the above two moves, board_state will look as follows [1, -1, 0, -1, -1, -1, -1, -1, -1]
*/
var board_state = [-1,-1,-1,-1,-1,-1,-1,-1,-1]

// A boolean to keep track of the status of the game; false means the game has not started. The default value is set to false.
var started = false

/*
A variable to keep track of each players' turn. Since the game always starts with player 1, the default value is set to '1'.
1 means player_1
0 means player_0
*/
var turn = 1

// ---------------------- Helper Functions (TODO: Implement each helper function as specified) --------------------- //

/*
 @Return boolean
 @Param _str - A string variable
 This method returns true if the '_str' is null or it has a length of 0, otherwise, it returns false
*/
function isEmpty(_str) {
	return (!_str || 0 === _str.length)
}

/*
@Return int
@Param - No param
This method returns the 'turn' variable:
turn = 1 is for player_1 and
turn = 0 is for player_2
*/
function whose_move(){
	document.getElementById('turn_info').innerText = "Turn for: ";
	if (turn == 1){
		var x = "X"
		document.getElementById('turn_info').innerHTML = document.getElementById('turn_info').innerText + "  " + x.bold();
	}
	if (turn == 0){
		var o = "O"
		document.getElementById('turn_info').innerHTML = document.getElementById('turn_info').innerText + "  " + o.bold();
	}
	return turn;
}

/*
@Return void
@Param  - No param
This methods toggles the 'turn' variable:
if the turn is set to 1 it will make it 0
if the turn is set to 0 it will make it 1
*/
function toggle_move() {
	if (turn == 1){
		turn = 0
	}
	else if (turn == 0){
		turn = 1
	}
}

/*
@Return boolean
@Param - No param
This method returns the value of the 'started' boolean variable:
true means the game has started
false means the game has not started
*/
function game_started(){
	return started;
}

// ---------------------- Game Rules (TODO: Implement each game function as specified) --------------------- //


/*
Rule 1
This method is called when the 'Begin Play' button is clicked.
The method should do the following:
1. Verify if the player names are empty or not. Raise an alert if they are empty. If the fields are empty do not start the game. This just means the function will return and do nothing. The 'started' flag will not be modified.
2. If all verification is successful, disable the name fields and update the player moves. Set the 'started' flag to true.
3. If the game has started, disable the 'Begin Play' button and enable the 'Play' button. Hint: document.getElementById("id").disabled = true;
*/
function begin_play(){
	var play1 = document.getElementById('player1_id').value;
	var play2 = document.getElementById('player2_id').value;
	if (game_started()){
		alert("Already started. Please Reset Play to start again.");
		return;
	}
	if (play1 == "" || play2 == ""){
		alert("Both fields are mandatory.")
	}
	else {
		document.getElementById('player1_id').disabled = true;
		document.getElementById('player2_id').disabled = true;
		document.getElementById('player1_id').value = play1 + " (X)"
		document.getElementById('player2_id').value = play2 + " (O)"
		whose_move();
		started = true;
	}
}

/*
Rule 2
This method is called when the 'Reset Play' button is clicked.
The method should do the following:
1. The 'Reset Play' button should reset the whole game. Clear the three text boxes, set the 'turn' variable to the default message, and set the 'started' flag to false.
2. Enable the name fields and the 'Begin Play' button.
3. Set the Tic Tac Toe grid to its default entries and disable the 'Play' button.
4. Clicking 'Reset Play' again and again has the same effect (or no effect when clicked multiple times).
*/
function reset_play(){
	document.getElementById('player1_id').disabled = false;
	document.getElementById('player2_id').disabled = false;
	document.getElementById('player1_id').value = "";
	document.getElementById('player2_id').value = "";
	document.getElementById('turn_info').innerText = "Game has not begun."
	for (i = 0; i < 9; i++){
		board_state[i] = -1;
	}
	document.getElementById('A1').innerText = "A1";
	document.getElementById('A2').innerText = "A2";
	document.getElementById('A3').innerText = "A3";
	document.getElementById('B1').innerText = "B1";
	document.getElementById('B2').innerText = "B2";
	document.getElementById('B3').innerText = "B3";
	document.getElementById('C1').innerText = "C1";
	document.getElementById('C2').innerText = "C2";
	document.getElementById('C3').innerText = "C3";
}

/*
Rule 3
This method is called every time a player makes a move (i.e., the 'Play' button is clicked).
The method should do the following:
1. The moves should be validated. There can only be ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]. If there is any other entry, raise an alert.
2. If the move is a valid move, the grid should be updated with the correct move. Player 1 is always 'X', and Player 2 is always 'O' (i.e., the capital letter 'O'). Update the 'turn' variable. Hint: use toggle_move()
3. If the move is on a cell that is already filled, raise an alert.
5. After any move, the state of the grid is validated. If there is a winner raise an alert (e.g., "Player 1 wins!!" or "X wins!")
6. When a player wins the game, the game is reset automatically.
7. If there are no more possible moves (and there is no winner), do nothing. The user must click the 'Reset Play' button.
*/
function play() {
	var input = document.getElementById('move_text_id');
	var output;
	if (turn == 1){
		output = "X";
	}
	if (turn == 0){
		output = "O";
	}
	if (!input.value.match(/[A-C][1-3]/)){
		alert("Invalid move!");
		return;
	}
	else{
		console.log(turn);
		if (input.value.match(/A1/)){
			console.log(board_state[0]);
			if (board_state[0] != -1){
				alert("Invalid move!")
				return;
			}
			document.getElementById('A1').innerText = output;
			if (turn == 1){
				board_state[0] = 1;
			}
			if (turn == 0){
				board_state[0] = 0;
			}
		}
		if (input.value.match(/A2/)){
			if (board_state[1] != -1){
				alert("Invalid move!")
				return;
			}
			document.getElementById('A2').innerText = output;
			if (turn == 1){
				board_state[1] = 1;
			}
			if (turn == 0){
				board_state[1] = 0;
			}
		}
		if (input.value.match(/A3/)){
			if (board_state[2] != -1){
				alert("Invalid move!")
				return;
			}
			document.getElementById('A3').innerText = output;
			if (turn == 1){
				board_state[2] = 1;
			}
			if (turn == 0){
				board_state[2] = 0;
			}
		}
		if (input.value.match(/B1/)){
			if (board_state[3] != -1){
				alert("Invalid move!")
				return;
			}
			document.getElementById('B1').innerText = output;
			if (turn == 1){
				board_state[3] = 1;
			}
			if (turn == 0){
				board_state[3] = 0;
			}
		}
		if (input.value.match(/B2/)){
			if (board_state[4] != -1){
				alert("Invalid move!")
				return;
			}
			document.getElementById('B2').innerText = output;
			if (turn == 1){
				board_state[4] = 1;
			}
			if (turn == 0){
				board_state[4] = 0;
			}
		}
		if (input.value.match(/B3/)){
			if (board_state[5] != -1){
				alert("Invalid move!")
				return;
			}
			document.getElementById('B3').innerText = output;
			if (turn == 1){
				board_state[5] = 1;
			}
			if (turn == 0){
				board_state[5] = 0;
			}
		}
		if (input.value.match(/C1/)){
			if (board_state[6] != -1){
				alert("Invalid move!")
				return;
			}
			document.getElementById('C1').innerText = output;
			if (turn == 1){
				board_state[6] = 1;
			}
			if (turn == 0){
				board_state[6] = 0;
			}
		}
		if (input.value.match(/C2/)){
			if (board_state[7] != -1){
				alert("Invalid move!")
				return;
			}
			document.getElementById('C2').innerText = output;
			if (turn == 1){
				board_state[7] = 1;
			}
			if (turn == 0){
				board_state[7] = 0;
			}
		}
		if (input.value.match(/C3/)){
			if (board_state[8] != -1){
				alert("Invalid move!")
				return;
			}
			document.getElementById('C3').innerText = output;
			if (turn == 1){
				board_state[8] = 1;
			}
			if (turn == 0){
				board_state[8] = 0;
			}
		}
		validateSolutions();
		input.value = ""
		toggle_move();
		whose_move();
		document.getElementById('move_text_id');

		return;
	}
}

function validateSolutions(){
	if (board_state[0] != -1 && board_state[0] == board_state[1] && board_state[1] == board_state[2]){
		if (turn == 1){
			alert("X wins!");
		}
		if (turn == 0){
			alert("O wins!");
		}
		reset_play();
		return;
	}
	if (board_state[3] != -1 && board_state[3] == board_state[4] && board_state[4] == board_state[5]){
		if (turn == 1){
			alert("X wins!");
		}
		if (turn == 0){
			alert("O wins!");
		}
		reset_play();
		return;
	}
	if (board_state[6] != -1 && board_state[6] == board_state[7] && board_state[7] == board_state[8]){
		if (turn == 1){
			alert("X wins!");
		}
		if (turn == 0){
			alert("O wins!");
		}
		reset_play();
		return;
	}
	if (board_state[0] != -1 && board_state[0] == board_state[3] && board_state[3] == board_state[6]){
		if (turn == 1){
			alert("X wins!");
		}
		if (turn == 0){
			alert("O wins!");
		}
		reset_play();
		return;
	}
	if (board_state[1] != -1 && board_state[1] == board_state[4] && board_state[4] == board_state[7]){
		if (turn == 1){
			alert("X wins!");
		}
		if (turn == 0){
			alert("O wins!");
		}
		reset_play();
		return;
	}
	if (board_state[2] != -1 && board_state[2] == board_state[5] && board_state[5] == board_state[8]){
		if (turn == 1){
			alert("X wins!");
		}
		if (turn == 0){
			alert("O wins!");
		}
		reset_play();
		return;
	}
	if (board_state[0] != -1 && board_state[0] == board_state[4] && board_state[4] == board_state[8]){
		if (turn == 1){
			alert("X wins!");
		}
		if (turn == 0){
			alert("O wins!");
		}
		reset_play();
		return;
	}
	if (board_state[2] != -1 && board_state[2] == board_state[4] && board_state[4] == board_state[6]){
		if (turn == 1){
			alert("X wins!");
		}
		if (turn == 0){
			alert("O wins!");
		}
		reset_play();
		return;
	}
}

// ---------------------------------------------------------------------------------------------------------- //

/*
DO NOT MODIFY THIS METHOD
*/
function moveEnter(event) {
	if(event.keyCode == 13) {
		event.preventDefault()
		play()
	}

}
