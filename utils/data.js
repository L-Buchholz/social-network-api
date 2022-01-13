// Random usernames

const usernames = [
  "90s_sarah",
  "George_G",
  "mimaya",
  "ledzachariah",
  "lilz01",
  "JK_justin",
  "BG_30",
];

// Random thoughts

const thoughts = [
  "How's it going?",
  "Hanging in there!",
  "Newbie at posting",
  "Just saying hi",
  "Whoa",
  "This app is great!",
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random username
const getRandomUsername = () => getRandomArrItem(usernames);

// Gets a random thought
const getRandomThought = () => getRandomArrItem(thoughts);

// Export the functions for use in seed.js
module.exports = { getRandomUsername, getRandomThought };
