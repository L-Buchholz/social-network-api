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
  //
  //
  // Add thoughts to the collection?
  //                    //insert new Array w/ 30 slots, map out following:
  const thoughtObjects = Array.from({ length: 30 }).map(() => ({
    thoughtText: getRandomThought(),
    username: getRandomUsername(),
    // Reactions are not required for testing the GET function, and are therefore not included in the seed data
    reactions: [],
  }));
  await Thoughts.collection.insertMany(thoughtObjects);
  //
  //
  // Create array to hold usernames
  const users = [];

  // Loops 5x
  for (let i = 0; i < 5; i++) {
    const username = getRandomUsername();
    const email = `${username}@mymail.com`;
    users.push({
      username,
      email,
      thoughts: [],
      // Friends are not required for testing the GET function, and are therefore not included in the seed data
      friends: [],
    });
  }

  // Add users to the collection
  await User.collection.insertMany(users);

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info("DB seed complete!");
  process.exit(0);
});
