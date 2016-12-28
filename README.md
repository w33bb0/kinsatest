# Project
## Kinsa Health nodejs test

# Requirements
nodejs version 

# Installation
Just clone the repository, run a `npm install` to bring in all mode modules and execute `$ node server.js` to spin up the server.

# API structure

The API follows REST rules for working with the data:

`GET` - to retrieve data
`POST` - to create data
`PUT` - to update data
`DELETE` - to remove data

So, in order to test the API one should make the following cURL requests:

##### To get stored data for an item
`curl -X GET "localhost:3000/10"`

##### To update stored data for an item
`curl -X GET "localhost:3000/10"`
`curl -X PUT -d "name=My Coffee Shop Name" "localhost:3000/10"`
`curl -X GET "localhost:3000/10"`
The above works with any property of an item or with any combination of properties, less the id.

##### To delete a stored item
`curl -X GET "localhost:3000/10"`
`curl -X DELETE "localhost:3000/10"`
`curl -X GET "localhost:3000/10"`

##### To create a new stored item
`curl -X POST -d "name=My New Coffee Shop" -d "lat=[numerical]" -d "long=[numerical]" -d "address=123 Street Address, City, ST" "localhost:3000"`
`curl -X GET "localhost:3000/[newItemId]"`
The [newItemId] is returned as a result of the POST call and should be used to retrieve data for verification purposes.

##### To get the nearest coffee shop for a given address
`curl -X GET "localhost:3000/nearest/[address]"`
The address should be a valid address, otherwise an error will be generated, saying the address could not be converted to coordinates.

