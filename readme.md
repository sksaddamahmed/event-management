1) Create a Server Folder which contains the express code
2) cd on Server Folder
3) Run npm init --yes (to create the package.json file)
4) Add modules one by one
    express -> Web Server
    body-parser -> its the middleware to handle form data such as user registration or login
    So from server folder run -> npm install express body-parser --save
5) For Mongo-Db interaction we need Mongoose, its just a npm package that provides mongodb mapping objects
or in simpler words mongoose translates the data in the database to a javascript object to use in out application.

Alternative, mongojs or mongoclient

To Install(From server folder) - npm install mongoose --save

6) User Nodemon to automatically restart the node server if there is a change
7) As UI and Backend running on different port install cors filter
command - npm install --save cors
8) JSON Web Token for Authentication - npm install jsonwebtoken --save


Angular App Creation (FrontEnd)

1) Type ng new ngApp --routing
2) To add a component -> ng g c <component-name>
3) While adding routes remember each route is an object
4) We are creating an auth service for login and registration
 To create a service -> ng g s <service-name>
5) To generate Route Guards -> ng g guard <route-guard-name>

Improvements : 
1) Encrypt the password
2) Dont return password with user details
3) Improve Registration 
4) Add error Handling
5) Create a new event
6) Fetch Events from Database
7) Create Events for specific users


