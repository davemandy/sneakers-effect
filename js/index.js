(function(){
	"use strict";

	var screenEle = document.getElementById("screen");
	var plainText = screenEle.innerHTML;
	var screenArray = []; // An array containing the HTML to display
	var encryptedElements = []; // An array of positions we still need to reveal
	var initialShuffleIterations = 24;
	var revealEachFrame = 6; // How many characters to reveal in plain text in each frame
	var shuffleEachFrame = 36; // How many characters to shuffle in each frame
	var ms = 41; // How long between each frame
	var chars = "○◘◙•♂♀☼▲►▼◄↨↕↔¶¡‼§▬↑↓←→!\"#$%&'()*+,-./0123456789:;=?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~⌂ÇâäàåáèéêëíîïÄÅÉæÆòóôöùúûüÿÖÜ¢£¥₧ƒñÑªº¿⌐¬¡»«¼½─│┌┐└┘├┤┬┴┼═║╒╓╔╕╖╗╘╙╚╛╜╝╞╟╠╡╢╣╤╥╦╧╨╩╪╫╬▀▄█▌▐■⌠⌡ΓΘΣΦΩαδεπστφ∙√∞∟∩≈≡≤≥";
	var stage = 0;
	var nextStep;

	function mainLoop() {

		// Stage 0 = initial scrambling sequence
		if (stage === 0) {
			if (--initialShuffleIterations < 1) {
				stage = 1;
				nextStep = revealAndShuffle;
			}
		}
		// Stage 1 = revealing the plain text
		else {
			if (encryptedElements.length === 0){
				return;
			}
		}

		setTimeout(nextStep, 0);
		setTimeout(render, 0);

		setTimeout(mainLoop, ms);
	}

	// Get a list of elements in the character array we need to 'decrypt'
	function initEncryptedElements() {
		for (var i = 0; i < plainText.length; i++) {
			if (!isWhiteSpace(plainText[i])) {
				encryptedElements.push(i);
			}
		}
	}

	// Shuffle all characters
	function shuffle() {
		for (var i = 0; i < plainText.length; i++) {
			if (isWhiteSpace(plainText[i]))
				screenArray[i] = plainText[i];
			else
				screenArray[i] = getRandomChar();
		}
	}

	// Reveal a few characters
	function revealAndShuffle() {
		var pos, i;
		
		// Reveal some
		for (i = 0; i < revealEachFrame; i++) {
			pos = getRandomInt(0, encryptedElements.length);
			screenArray[encryptedElements[pos]] = "<span style=\"color:#2a68d6\">" + plainText[encryptedElements[pos]] + "</span>";
			encryptedElements.splice(pos, 1);
		}

		// Shuffle some
		for (i = 0; i < shuffleEachFrame; i++) {
			pos = getRandomInt(0, encryptedElements.length);
			screenArray[encryptedElements[pos]] = getRandomChar();
		}
	}

	// Dump the character array into the HTML
	function render() {
		screenEle.innerHTML = screenArray.join('');
	}


	// Helper functions:

	function isWhiteSpace(s) {
		return /^\s+$/.test(s);
	}

	// Get a character from the array
	function getRandomChar() {	
		return chars[getRandomInt(0, chars.length - 1)];
	}

	// Get a random int from range
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
	initEncryptedElements();
	shuffle(); // Shuffle the text immediately
	nextStep = shuffle;

	window.onload = mainLoop;

})();