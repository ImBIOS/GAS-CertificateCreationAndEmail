/**
 * Function to capitalize the first letter of each word in a given string.
 *
 * @param {string} input - The string that will have its words capitalized.
 * @returns {string} - A new string with the first letter of each word capitalized,
 *                     or an error message if the input is not a string.
 */
function capitalizeEachWord(input) {
  // Check if the input is of type string
  if (typeof input !== 'string') {
    return 'Invalid input. Expected a string.';
  }

  // Split the input string into an array of words
  const words = input.toLowerCase().split(' ');

  // Loop through the words and capitalize the first letter of each word
  for (let i = 0; i < words.length; i++) {
    if (words[i]) {
      // Check if the word is not an empty string
      words[i] =
        words[i].charAt(0).toUpperCase() + words[i].substring(1);
    }
  }

  // Join the words back into a single string and return it
  return words.join(' ');
}
