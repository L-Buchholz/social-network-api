// Random usernames

const usernames = [
  "90s_sarah",
  "George_G",
  "momaya",
  "ledzachariah",
  "lilz01",
  "JK_justin",
  "B.G.30",
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

() => getRandomArrItem(thoughts);
() => getRandomArrItem(usernames);

// Gets a random username
const getRandomUsername = (numOfNames) => {
  const results = [];
  for (let i = 0; i < numOfNames; i++) {
    results.push({
      userNames: getRandomArrItem(usernames),
    });
  }
  return results;
};

// Function to generate random thoughts that can be added to usernames
const getRandomThought = (numOfThoughts) => {
  const results = [];
  for (let i = 0; i < numOfThoughts; i++) {
    results.push({
      getRandomUsernames: getRandomArrItem(thoughts),
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = { getRandomUsernames, getRandomThoughts };
