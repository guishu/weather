const request = require('postman-request')

const geocode = (address, callback) => {
	const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZ3Vpc2h1IiwiYSI6ImNranVpNm40NjFobHkyeXFoZGkzYzV6ZDYifQ.cxqSZNKf4p0wV0pYpif-1A&limit=1"

	request({ url, json: true }, (error, {body} = {}) => {
		if(error) {
			callback('Unable to connect to the location service!', undefined)
		} else if(body.features.length === 0) {
			callback('Query error: could not find any location matching the query', undefined)
		} else {
			callback(undefined, {
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0],
				location: body.features[0].text
			})
		}
	})
}

module.exports = geocode