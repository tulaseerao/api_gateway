
const PreciselyAPINodeJS = require('preciselyapis-client')

const address = {
    "line1": "3745 Townley Lane",
    "line2": "",
    "city": "Cumming",
    "state": "GA",
    "zip": "30040"
}
try {
    const oAuth = new PreciselyAPINodeJS.OAuth();
    oAuth.oAuthApiKey="i0kYDKdRIMAAkq9m1poRoYizfF2sCUhU"
    oAuth.oAuthSecret="Q9rBksPuYMqFbYL1"
    
    oAuth.getOAuthCredentials().then((data) => {
      debugger
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
          debugger
        console.log("Result:", response.body)
        var res_body = response.body
        let data = {
          "cleansed": '',
          "message": ''
        }
        if(res_body && res_body["Output"] && res_body["Output"].length > 0) {
          output = res_body["Output"][0]
          data.cleansed = output["BlockAddress"]
          data.message = output["Status"] === "F" ? output["Status.Code"] + ": " + output["Status.Description"] + ", CouldNotValidate " + output["CouldNotValidate"] : "Address Found"
        } else {
          data.cleansed = JSON.stringify(address)
          data.message = "Address Not Found"
        }
        console.log(data)
      }).catch( error => {
          debugger
        message = "Exception raised while validating address: " + JSON.stringify(error.body)
        console.error(message)
       
      })
  }).catch( error => {
      debugger
    message = "Exception raised while getOAuthCredentials: " + JSON.stringify(error)
    console.error(message)
    
  })
} catch(e) {
  message = "Exception raised: " + e
  console.error(message)
  
}