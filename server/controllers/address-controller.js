const https = require('https')

validate = (req, res) => {
  const endPoint = 'https://api.addressy.com/Cleansing/International/Batch/v1.00/json4.ws'
  const loqate_key = process.env.LOQATE_KEY
  const body = req.body

  if(!body) {
    return res.status(400).json({
      success: false,
      error: 'Invalid Request'
    })
  }

  const data = JSON.stringify({
    "Key": loqate_key,
    "Geocode": true,
    "Addresses": [
      {
        "Address": body.address
      }
    ]
  })

  const options = {
    hostname: 'api.addressy.com',
    port: 443,
    path: '/Cleansing/International/Batch/v1.00/json4.ws',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  }

  const request = https.request(options, response => {
    console.log(`Status Code: ${response.statusCode}`)

    let lbuffers = []
    response.on('data', chunk => lbuffers.push(chunk))

    response.on('end', () => {
      
      let lbuffer = Buffer.concat(lbuffers)
      let json = {}
      try {
        json = JSON.parse(lbuffer.toString())
        return res.status(200).json({
          success: true,
          data: json
        })
      } catch(e) {
        return res.status(400).json({
          success: false,
          error: e
        })
      }
    })
  })

  request.on('error', error => {
    return res.status(400).json({
      success: false,
      error: error
    })
  })

  request.write(data)
  request.end()

}

module.exports = { validate }