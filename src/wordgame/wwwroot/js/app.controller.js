(function () {
    'use strict';

    angular.module('app').controller('WordController', WordController);

    function WordController($scope, $http) {

        $scope.MAX_NR_OF_GUESSES = 8;
        $scope.ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ'.split('');
        var lettersGuessed = '';

        $scope.initNewGame = function () {
            $http.get('/api/word')
              .success(function (word) {
                  $scope.word = word.split('');
                  $scope.guessedWord = Array(word.length).fill('_');
                  $scope.nrOfGuesses = 0;
                  $scope.feedback = '';
                  lettersGuessed = '';
              })
              .error(function (errorMessage) {
                  log.warn('Could not fetch word: ' + errorMessage);
              });
        }

        $scope.evaluateGuess = function (char) {
            if ($scope.letterAlreadyGuessed(char) || userGuessedWordCorrectly() || userExhaustedNrOfGuesses()) {
                return;
            }
            lettersGuessed += char;
            if (wordContainsLetter(char)) {
                $scope.guessedWord = updateGuessedWord(char);
                $scope.feedback = userGuessedWordCorrectly() ? 'Du klarte det.' : 'Bra.';
            } else {
                $scope.nrOfGuesses++;
                $scope.feedback = userExhaustedNrOfGuesses()
                    ? 'Beklager, du klarte ikke gjette ordet, som var: ' + $scope.word.join('')
                    : 'Beklager, ' + char + ' er ikke i ordet.';
            }
        }

        $scope.guessesUsedAsPercentage = function () {
            return $scope.nrOfGuesses / $scope.MAX_NR_OF_GUESSES * 100;
        };

        $scope.letterAlreadyGuessed = function (char) {
            return lettersGuessed.indexOf(char) > -1;
        }

        // Listen for user keypresses
        $(document).keypress(function (event) {
            var char = String.fromCharCode(event.which).toUpperCase();
            if (validLetter(char)) {
                $scope.evaluateGuess(char);
                $scope.$digest();
            }
        });

        function wordContainsLetter(letter) {
            return $scope.word.indexOf(letter) > -1;
        }

        function userGuessedWordCorrectly() {
            return $scope.guessedWord.join('') === $scope.word.join('');
        }

        function userExhaustedNrOfGuesses() {
            return $scope.nrOfGuesses >= $scope.MAX_NR_OF_GUESSES;
        }

        function validLetter(char) {
            return $scope.ALPHABET.indexOf(char) > -1;
        }

        function updateGuessedWord(guessedChar) {
            return $scope.word
              .map(function (char, index) {
                  if (guessedChar === char) {
                      return char;
                  } else {
                      return $scope.guessedWord[index];
                  }
              });
        }

        /* INIT */
        $scope.initNewGame();

    }

})();