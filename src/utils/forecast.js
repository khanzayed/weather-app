const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/099a255e252363f56f248ec55a9596b5/' + latitude + ',' + longitude
    request({url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find the location!', undefined)
        } else {
            callback(undefined, body.daily.data[0])
        }
    })
}

module.exports = forecast