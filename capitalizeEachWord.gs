/**
MIT License

Copyright (c) 2023 Imamuzzaki Abu Salam

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
/**
 * Function to capitalize the first letter of each word in a given string.
 *
 * @param {string} input - The string that will have its words capitalized.
 * @returns {string} - A new string with the first letter of each word capitalized,
 *                     or an error message if the input is not a string.
 * @example
 * // In Google Spreadsheet
 * =capitalizeEachWord("hello world") // Or any other string or cell reference
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
