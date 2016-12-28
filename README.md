# Project
## Kinsa Health nodejs test

# Requirements
The nodejs version used to develop the code is v5.8.0, but it has also been tested to work with v6.9.2 LTS.

# Installation
Just clone the repository, run a `$ npm install` to bring in all mode modules and execute `$ node server.js` to spin up the server.

# API structure
The API follows REST rules for working with the data: `GET` to retrieve data, `POST` to create data, `PUT` to update data, `DELETE` to remove data

So, in order to test the API one should make the following cURL requests:

##### To get stored data for an item
```
curl -X GET "localhost:3000/[itemId]"
```
_[itemId] can be set to a valid ID from the list of items in `/resources/locations.csv`_

##### To update stored data for an item
```
curl -X GET "localhost:3000/[itemId]"
curl -X PUT -d "name=My%20Coffee%20Shop%20Name" "localhost:3000/[itemId]"
curl -X GET "localhost:3000/10"
```
The above works with any property of an item or with any combination of properties, less the id.
_[itemId] can be set to a valid ID from the list of items in `/resources/locations.csv`_

##### To delete a stored item
```
curl -X GET "localhost:3000/[itemId]"
curl -X DELETE "localhost:3000/[itemId]"
curl -X GET "localhost:3000/[itemId]"
```
_[itemId] can be set to a valid ID from the list of items in `/resources/locations.csv`_

##### To create a new stored item
```
curl -X POST -d "name=My%20New%20Coffee%20Shop" -d "lat=[numerical]" -d "long=[numerical]" -d "address=123%20Street%20Address,%20City,%20ST" "localhost:3000"
curl -X GET "localhost:3000/[newItemId]"
```
_[numerical] should be latitude/longitude value._
_The [newItemId] is returned as a result of the POST call and should be used to retrieve data for verification purposes._

##### To get the nearest coffee shop for a given address
`curl -X GET "localhost:3000/nearest/[address]"`
_The [address] should be a valid address, otherwise an error will be generated, saying the address could not be converted to coordinates._
_The value of [address] should also be URL encoded, as all other data values sent using the `-d` argument._

# Notes
Code is ES5, since my working experience with ES6/7 is limited and mostly theoretical.
hapi was used for illustrative purposes only, since it was discussed in the Skype session, however express or http could've been used just as easily to create the server.
