# Player Management API

If I were a beginner trainee on the great coach Ted Lasso's team, this is how I would develop our first registration and skill mapping of our players. (and like the rest of the team, I have a lot to learn)

![Alt text](https://static1.srcdn.com/wordpress/wp-content/uploads/2024/08/jason-sudeikis-as-ted-lasso-smiling-and-pointing-in-ted-lasso.jpg)
<p align="center" >And it is with this proud look that he would repay me! (and I hope you do too 🤣) 
</p>

## What did I do? 🗹
I carried out all the required requests and the bonuses ones, and for this I used the following technologies: Node.js, Express.js, MongoDB, Mongoose and finally Swagger for API Documentation. You should find important comments within the code, I like to keep them there and I see it as good practice, I hope you like it!

## You may need

Before running the project, you need to have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (usually already included with Node.js)
- A MongoDB database (local or a hosting service like MongoDB Atlas)

## How to use

1. Clone the repository:
```bash
git clone https://github.com/oridamasceno/crud-SPOT.git
```
2. Navigate into the project directory:
```bash
cd crud-SPOT
```

3. Install the dependencies:
```bash
npm install
```

4. Edit the .env file in the root directory and add your MongoDB connection string. For example:
```bash
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/databaseName?retryWrites=true&w=majority
```

5. Start the server:
```bash
npm run dev
```

## API Endpoints

- **GET - /api/players/**: Retrieve a list of all players;
- **GET - /api/players/**{id}{name}{nickname}: Retrieve a single player by ID or specific data with all atributes;
- **POST - /api/players/**: Create a new player;
- **PUT - /api/players/{id}**: Update an existing player.
- **DELETE - /api/players/{id}**: Delete a player.
- **POST - /api/players/divide-teams**: Divide players into teams based on their skill level.
- **GET - /api/players/rank**: Creates a player ranking based on their skills.

## Documentation 📎
API documentation is available using Swagger. You can access it by navigating to /api-docs after starting the server.

## License
[MIT](https://choosealicense.com/licenses/mit/)
