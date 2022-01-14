const connection = require("../config/connection");
const { User, Thoughts } = require("../models");
const { getRandomUsername, getRandomThought } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  // Drop existing usernames
  await User.deleteMany({});

  // Drop existing Thoughts
  await Thoughts.deleteMany({});

  // Create array to hold usernames
  const usernames = [];

  // Refers to ./data function
  const thoughts = getRandomThoughts(30);

  // Loops 30x
  for (let i = 0; i < 30; i++) {
    const username = getRandomUsername();
    const email = `${username}${Math.floor(
      Math.random() * (99 - 18 + 1) + 18
    )}`;
    usernames.push({
      username,
      email,
      thoughts,
    });
  }

  // Add usernames to the collection
  await User.collection.insertMany(usernames);

  // Add thoughts to the collection?
  await Thoughts.collection.insertOne({
    thoughtText: //What do I need here?,
    reactionBody: //What do I need here?
    username: [...usernames],
  });


  // Log out the seed data to indicate what should appear in the database
  console.table(usernames);
  console.table(thoughts);
  console.info("DB seed complete!");
  process.exit(0);
});
