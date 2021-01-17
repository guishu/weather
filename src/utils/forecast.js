const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
	const url = 'http://api.weatherstack.com/current?access_key=e284a16cd969c9ab14f95a05523c3ece&query='
		+ encodeURIComponent(latitude) + ',' +  encodeURIComponent(longitude) + '&units=m'

	request({ url, json: true }, (error, {body} = {}) => {
		if(error) {
			callback('Unable to connect to weather service!', undefined)
		} else if(body.success === false) {
			callback('Query error: ' + body.error.info, undefined)
		} else {
			callback(undefined, {temperature: body.current.temperature, feelsLike: body.current.feelslike})
		}
	})
}

module.exports = forecast