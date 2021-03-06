# Social-Network-API

## Bootcamp homework

A start-up requires a social network API (using a NoSQL database) in order for their website to process large amounts of unstructured data. The following "Acceptance Criteria" for this feature were requested and have now been implemented:

- The Express.js, MongoDB, and Mongoose applications have been initialized
- The development database has been seeded with test data
- The server begins with a command and the Mongoose models are synced to the MongoDB database
- The formatted JSON data is displayed when GET routes are invoked for **Users** and **Thoughts**
- POST routes create Users and Thoughts _as well as_ reactions and new "Friends" (added to a User's list)
- PUT routes update Users and Thoughts
- DELETE routes delete Users and Thoughts _as well as_ reactions and existing "Friends" (removed from a User's list)
- Formatted timestamps are available on "Thoughts"

Additionally, video walk-throughs highlighting the program's functionality have been created and linked (below), and the Javascript includes comments.

## Social network API -- File screenshot

The following is a screenshot of the Insomnia interface, highlighting the back-end program's appearance and functionality:

![Insomnia app view of the social network API back-end. This image includes: A left-hand column where all of the pre-populated routes are called, a middle column where applicable json data can be added, and a right-hand column showing the results of the given command (here a general GET call for all users)](./images/social_network_screenshot.png)

## Link to video walk-throughs

As the social network back-end application cannot be deployed at a live URL, videos highlighting a walk-through of using this application are included here:

- Calling the database (in Insomnia) using the terminal and illustrating all GET, POST, and PUT routes: https://drive.google.com/file/d/1WWMiKLkM4SlrnX4MVkC9koYCcUus3R_b/view?usp=sharing
- Illustrating all DELETE routes _(please download this video if the link is blurry for better resolution)_: https://drive.google.com/file/d/1-XU-DiYfkpbpvoIl9SkkjDNw19dQi49E/view?usp=sharing
