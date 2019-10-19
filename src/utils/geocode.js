const request = require('request')

const https = require('https')
const url = 'https://api.darksky.net/forecast/099a255e252363f56f248ec55a9596b5/40,-75'

const task = https.request(url, (response) => {
    let data = ''

    response.on('data', (chunk) => {
        data = data + chunk
    })

    response.on('end', () => {
        console.log(JSON.parse(data))
    })

})

task.on('error', (error) => {

})

task.end()

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZmhhYmliNCIsImEiOiJjazFzNWx4bG8wMmNnM2hxeWR0cDR4MW12In0.8ygc7cNA9HEyHjvv-KRGOQ'
    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the map service!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
          const list = body.features
           if (list.length != 0) {
                const latitude = list[0].center[0]
                const longitude = list[0].center[0]
                const name = list[0].place_name
               callback(undefined, {
                   latitude,
                   longitude,
                   name
               })
          } else {
            callback('Unable to find location!', undefined)
          }
        }
    })
}

module.exports = geocode