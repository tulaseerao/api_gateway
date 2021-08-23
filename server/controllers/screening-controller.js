const https = require('https')

screening = (req, res) => {
  const queryString = req.query

  if(!queryString) {
    return res.status(400).json("Invalid Request, 'name' must be passed in a query string")
  }
  var name = ''
  try {
    // decoding first and then encode because the React calling this api with encoded data.
    // we should also encode the string if we want to test this api directly from postman or swagger
    name = encodeURIComponent(decodeURIComponent(queryString["name"])) 
  } catch(e) {
    return res.status(400).json("Exception while encoding/decoding the query parameter, Error:" + e)

  }
  const token = "Bearer " + process.env.SCREENING_TOKEN
  const options = {
    hostname: 'api.trade.gov',
    port: 443,
    path: `/gateway/v1/consolidated_screening_list/search?sources=DPL,EL,MEU,UVL,ISN,DTC,CAP,CMIC,FSE,MBS,PLC,SSI,SDN&name=${name}`,
    method: 'GET',
    headers: {
      'Authorization': token
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
        console.log(json)
        return res.status(200).json(json)
      } catch(error) {
        console.error(error)
        return res.status(400).json(error)
      }
    })
  }).on('error', error => {
    console.error(error)
    return res.status(400).json(error)
  })

  request.end()
}


module.exports = { screening }
