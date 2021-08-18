const https = require('https')


const address = "3745 Townley Lane, Cumming GA, 30040"
const endPoint = 'https://api.addressy.com/Cleansing/International/Batch/v1.00/json4.ws'
const loqate_key = "HX57-EF74-MH68-EZ83" // process.env.LOQATE_KEY

const request_body = JSON.stringify({
  "Key": loqate_key,
  "Geocode": true,
  "Addresses": [
    {
      "Address": address,
      "Country": "USA"
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
    'Content-Length': request_body.length
  }
}

const request = https.request(options, response => {
  console.log(`Status Code: ${response.statusCode}`)

  let lbuffers = []
  response.on('data', chunk => lbuffers.push(chunk))

  response.on('end', () => {
      debugger
    
    let lbuffer = Buffer.concat(lbuffers)
    let json = {}
    try {
      json = JSON.parse(lbuffer.toString())
      let first_record = json[0]
      let data = {
        "cleansed": '',
        "message": ''
      }
      if (first_record && first_record["Matches"] && first_record["Matches"].length > 0) {
        data.cleansed = first_record["Matches"][0]["Address"] + ', ' + first_record["Matches"][0]["Country"]          
        data.message = "Address Found"
      } else {
        data.cleansed = ""
        data.message = "Address Not Found"
      }
      console.log(data)
      
    } catch(e) {
     
        console.error(e)
    }
  })
})

request.on('error', error => {
  console.error(error)
})

request.write(request_body)
request.end()