use DeviceServer

db.Users.insert({"uuid": "1"})
db.Users.insert({"uuid": "2"})

db.Locations.createIndex( { date_time: -1 } )

db.Locations.insert({"uuid": "1", "date_time": 1518669344517, "latitude": 34.070, "longitude": -118.440, "altitude": 22, "speed": 10, "direction": 20})
db.Locations.insert({"uuid": "1", "date_time": 1518669344519, "latitude": 34.072, "longitude": -118.442, "altitude": 32, "speed": 20, "direction": 30})
db.Locations.insert({"uuid": "1", "date_time": 1518669344518, "latitude": 34.074, "longitude": -118.444, "altitude": 42, "speed": 30, "direction": 40})
db.Locations.insert({"uuid": "1", "date_time": 1518669344540, "latitude": 34.076, "longitude": -118.448, "altitude": 32, "speed": 20, "direction": 30})
db.Locations.insert({"uuid": "1", "date_time": 1518669344560, "latitude": 34.078, "longitude": -118.446, "altitude": 42, "speed": 30, "direction": 40})
db.Locations.insert({"uuid": "1", "date_time": 1518669344541, "latitude": 34.073, "longitude": -118.449, "altitude": 32, "speed": 20, "direction": 30})
db.Locations.insert({"uuid": "1", "date_time": 1518669344569, "latitude": 34.079, "longitude": -118.450, "altitude": 42, "speed": 30, "direction": 40})
db.Locations.insert({"uuid": "1", "date_time": 1518669344543, "latitude": 34.077, "longitude": -118.441, "altitude": 32, "speed": 20, "direction": 30})
db.Locations.insert({"uuid": "1", "date_time": 1518669344565, "latitude": 34.083, "longitude": -118.445, "altitude": 42, "speed": 30, "direction": 40})
db.Locations.insert({"uuid": "1", "date_time": 1518669344590, "latitude": 34.082, "longitude": -118.443, "altitude": 32, "speed": 20, "direction": 30})
db.Locations.insert({"uuid": "1", "date_time": 1518669344580, "latitude": 34.080, "longitude": -118.447, "altitude": 42, "speed": 30, "direction": 40})


db.Locations.insert({"uuid": "2", "date_time": 1518669344517, "latitude": 34.074, "longitude": -118.440, "altitude": 22, "speed": 10, "direction": 20})
