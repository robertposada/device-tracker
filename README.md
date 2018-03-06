# Web Application to Track a RaspberryPi
By: Robert Posada
### Introduction
A web application that allows people to track their Raspberry Pi (when connected to a gps device)
The project uses node.js and mongodb. This project was developed at UCLA for the csm117 course.

### Usage

1. Make sure npm, node, express, and mongo is installed
2. Install other dependencies by running the following in the device-server directory:
    ```bash
        $ npm install
    ```
3. Run the script 'db.sh' in order to load initial data into the database. 
    **In order to use the app, you must add your raspi's uuid to the Users collection in the database.**
    To do this, modify the db.sh script and add your own User data (there are examples there. Once you've added the query to add yourself in the Users collection, create the database by running the script.
    To run the script: 
    ```bash
        $ mongo < db.sh'
    ```
    * Notes on the databse:
    	* Databse is called *DeviceServer*
    	* Contains two collections: *Users* and *Locations*
    	
4.  Now that the database has been set up, run the server by running 'npm start' within the device-server directory
    The webapp will be running at 'localhost:3000' (Port - 3000)
    ```bash
        $ npm start 
    ```

#### API for your Raspberry Pi
Post requests should be sent from your Raspberry Pi in order to store locations into the mongoDB database.
Post Requests should be configured as follows:
* Sent to -> 'localhost:3000/api/[UUID]
* Format request bodies in the following example JSON form :
```javascript
{
  "uuid": [UUID_of_RASPI],
  "date_time": 1518669344600 // Milliseconds - represents time from Unix epoch (Thursday, 1 January 1970)
  "latitude": 34.0689, // Degrees
   "longitude": 118.4452, // Degrees
   "altitude": 10.0, // meters
   "speed": 0.0 // kilometers/hour
   "direction": 0.0 // Degrees
}
```
* The api has been tested with the following curl command (for your reference):
```bash
$ curl -H "Content-Type: application/json" -X POST -d '{"uuid": "1", "date_time": 1518669344600, "latitude": 37.6941, "longitude": -122.0864, "altitude": 42, "speed": 30, "direction": 40}' http://localhost:3000/api/[UUID]
```
Be sure to change the [UUID] to your own person uuid on your Raspberry Pi if you want to use the command above.
* The node.js server will respond with one of 3 options:
	1. Response status code of 201 - Request was fulfilled
	2. Response status code of 400 - Bad Request (requests must follow above format, and UUID must exist in DB)
	3. Response status code of 500 - Something went wrong internally in the server

### Web App Details (what to expect)
1. The web app will require you to "login," or simply input your Raspberry Pi's uuid. 
2. It will "authenticate" by making sure your UUID is found in the 'Users' collection. **Don't forget to add your    raspi UUID to the database using the db.sh script!**
3. Once logged in, the user can access two URLS:
	* "/listing" - Shows a listing of user's locations
	* "/map" - Allows user to see a map of where their raspi has been
4. Sessions last 2 hours, after that you may be prompted to login again
5. Map page uses the google api to retrieve location results for the map

