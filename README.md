## Setting up local mongodb on your system
1. To setup mongodb on your local system choose the operating system you use and follow the instructions on this link        (https://docs.mongodb.com/manual/administration/install-community/)
2. To check if the mongodb is setup succesfully do as follows
   - Run command `sudo service mongod start`
   - To verify if mongodb has started got to (http://localhost:27017)
   - You should see a line saying `It looks like you are trying to access MongoDB over HTTP on the native driver port`
   - To stop the mongodb server run `sudo service mongod stop`

## Starting the mongodb server for this application
1. create a folder `mongodb` in the same directory where the client and server folders are residing.
2. cd to mongodb folder and create folder name `data`
3. now run command `mongod --dbpath=data`
4. **In the console you should see mongodb started at port 27017**

>Now we can start our application servers

## Starting the server side
1. cd to server folder
2. To install all the dependencies run `npm install`
3. To start the server run `npm start dev`
>The server will start at (http://localhost:4000/graphql)

## Starting the client side
1. cd to cleint folder
2. To install all the dependencies run `npm install`
3. To start the client side server run `npm run dev`
>The server will start at (http://localhost:8080)

>initially you will not see any item in the todo list app as the database is empty. You can add items by yourself to the todo list app.
