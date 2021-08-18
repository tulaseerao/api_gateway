const https = require('https')
const PreciselyAPINodeJS = require('preciselyapis-client')

validate = (req, res) => {
  const body = req.body

  if(!body) {
    return res.status(400).json({
      success: false,
      error: 'Invalid Request'
    })
  }

  if (body.adapter == 'loqate'){
    return loqate(body.address, res)
  }
  else if(body.adapter == 'precisely') {
    var address = body.address;
    if (address.line1===undefined) {
      var add_array = address.split(',')
      address = {
        "line1": add_array[0],
        "line2": '',
        "city": add_array[1],
        "state": add_array[2],
        "zip": add_array[3]
      }
    }
    return precisely(address, res)
  }else {
    return res.status(400).json({
      success: false,
      error: "Invalid Parameter 'adapter' value, must be one of 'loqate' or 'precisely'"
    })
  }
}

precisely = (address, res) => {
  debugger
  try {
    const oAuth = new PreciselyAPINodeJS.OAuth();
    oAuth.oAuthApiKey=""
    oAuth.oAuthSecret=""

    oAuth.getOAuthCredentials().then((data) => {
      var request_body = {
        "options": {
          "OutputCasing": "M",
          "MaximumResults": "10",
          "KeepMultimatch": "N",
          "OutputScript": "InputScript",
          "OutputAddressBlocks": "Y",
          "OutputCountryFormat": "E",
          "OutputFieldLevelReturnCodes": "N",
          "OutputRecordType": "A"
        },
        "Input": {
          "Row": [
            {
              "AddressLine1": address.line1,
              "AddressLine2": address.line2,
              "AddressLine3": "",
              "AddressLine4": "",
              "AddressLine5": "",
              "City": address.city,
              "Country": "USA",
              "StateProvince": address.state,
              "PostalCode": address.zip
            }     
          ]
        }
      }
      
      var AddressValidationApi = new PreciselyAPINodeJS.AddressVerificationServiceApi(data.body)
    AddressValidationApi.validateMailingAddressPremium(request_body)
        .then((response) =>{
          console.log("Result:", response.body)
          var res_body = response.body
          let data = {
            "cleansed": '',
            "message": ''
          }
          var failed = false
          if(res_body && res_body["Output"] && res_body["Output"].length > 0) {
            output = res_body["Output"][0]
            failed = output["Status"] === "F"
            data.cleansed = output["BlockAddress"]
            data.message = failed ? output["Status.Code"] + ": " + output["Status.Description"] + ", CouldNotValidate " + output["CouldNotValidate"] : "Address Found"
          } else {
            data.cleansed = JSON.stringify(address)
            data.message = "Address Not Found"
          }

          return res.status(200).json({
            success: !failed,
            data: data
          })
        }).catch( error => {
          message = "Exception raised while validating address: " + error
          console.error(message)
          return res.status(400).json({
            success: false,
            data: {
              cleansed: JSON.stringify(address),
              message: message
            }
          })
        })
    }).catch( error => {
      message = "Exception raised while getOAuthCredentials: " + JSON.stringify(error)
      console.error(message)
      return res.status(400).json({
        success: false,
        data: {
          cleansed: JSON.stringify(address),
          message: message
        }
      })
    })
  } catch(e) {
    message = "Exception raised: " + e
    console.error(message)
    return res.status(400).json({
      success: false,
      data: {
        cleansed: JSON.stringify(address),
        message: message
      }
    })
  }
}

loqate = (address, res) => {

  const endPoint = 'https://api.addressy.com/Cleansing/International/Batch/v1.00/json4.ws'
  const loqate_key = process.env.LOQATE_KEY

  const data = JSON.stringify({
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
      'Content-Length': data.length
    }
  }
  console.log("Input Data", data)
  const request = https.request(options, response => {
    console.log(`Status Code: ${response.statusCode}`)

    let lbuffers = []
    response.on('data', chunk => lbuffers.push(chunk))

    response.on('end', () => {
      
      let lbuffer = Buffer.concat(lbuffers)
      let json = {}
      try {
        json = JSON.parse(lbuffer.toString())
        let first_record = json[0]
        let data = {
          "cleansed": '',
          "message": ''
        }
        let success = true
        if (first_record && first_record["Matches"] && first_record["Matches"].length > 0) {
          console.log("first Record: ", first_record)
          data.cleansed = first_record["Matches"][0]["Address"] + ', ' + first_record["Matches"][0]["Country"]          
          data.message = "Address Found"
        } else {
          success = false
          data.cleansed = ""
          data.message = "Address Not Found"
        }
        console.log(data)
        return res.status(200).json({success, data})
      } catch(e) {
        console.error(e)
        return res.status(400).json({
          success: false,
          error: e
        })
      }
    })
  })

  request.on('error', error => {
    console.error(error)
    return res.status(400).json({
      success: false,
      error: error
    })
  })

  request.write(data)
  request.end()
}

module.exports = { validate }