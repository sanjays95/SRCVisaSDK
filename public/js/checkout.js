async function checkout(input,cb){
    let promiseData = await vSrc.checkout(input)
    .then(function (data) {
        return data;
    })
    .catch(function (err) {
        return err;
    });
    cb(promiseData);
}

function callCheckout(checkoutInput) {
    document.getElementById('msg').style.display = 'block';
    checkout(checkoutInput, function (result) {                  
        console.log("checkout result\n"+JSON.stringify(result));
        document.getElementById('checkout-response').value = JSON.stringify(result, null, 2);
        document.getElementById('msg').style.display = 'none';
        showSection('final-section');
    });
}

function newCardFinal(){
    document.getElementById('msg').style.display = 'block';
    // let cardInput = document.getElementById('input-newcard').value;
    var card = document.getElementById('input-pan').value;
    var mm = document.getElementById('input-expiry').value.slice(0,2);
    var year = document.getElementById('input-expiry').value.slice(-4);
    var cvv = document.getElementById('input-cvv').value;
    var phonecc = document.getElementById('input-country-code').value;
    var phonenumber = document.getElementById('input-phone-number').value;
    var fName = document.getElementById('input-first-name').value;
    var lName = document.getElementById('input-last-name').value;
    var country = document.getElementById('input-country').value;
    let cardInput = {
        "card": {
            "primaryAccountNumber": card,
            "panExpirationMonth": mm,
            "panExpirationYear": year,
            "cardSecurityCode": cvv,
            "cardholderFullName": fName + lName,
            "billingAddress": {
                "countryCode":  country
            }
        },
    }

    //cardInput = JSON.parse(cardInput);
    checkoutInput = {
        "dpaTransactionOptions": {
             "payloadTypeIndicator": "FULL",
        },
        "consumer" :{
            "countryCode" : country, //mandatory for merch orch - new user
            "firstName": fName, //mandatory for merch orch - new user
            "lastName": lName, //mandatory for merch orch - new user
            "languageCode" : "en", ////mandatory for merch orch new user only code and not country
            "mobileNumber" : {
                "countryCode" : phonecc,
                "phoneNumber" : phonenumber,
            },
            "consumerIdentity" : {
                "identityProvider" : "SRC",
                "identityValue" : email,
                "type" : "EMAIL_ADDRESS"
            }
        },
        "complianceSettings": {
            "complianceResources": [
                {
                    "complianceType": "TERMS_AND_CONDITIONS",
                    "uri": "usa.visa.com/legal/checkout/terms-of-service.html"
                },
                {
                    "complianceType": "PRIVACY_POLICY",
                    "uri": "usa.visa.com/legal/global-privacy-notice.html"
                },
                {
                    "complianceType": "REMEMBER_ME",
                    "uri": "visa.checkout.com/privacy"
                }
            ]
        },
        "dpaTransactionOptions": {
                "authenticationPreferences" : {
                    "authenticationMethodType" : "3DS",
                    "payloadRequested" : "AUTHENTICATED"
                },
                "acquirerBIN" : "455555",
                "merchantName" : "Sanjay's Cofeee",
                "acquirerMerchantId" : "123456789", //chnged
                "transactionAmount": {
                    "transactionAmount": "90.95",
                    "transactionCurrencyCode": "AED"
                }
            }
    };
    // Do PAN JWE for the card structure
    let kid = "WW7WS01IYBONU0YHHL0C13cPEqia6M9T1oWqZGSWmyQcWtSCk"; // Replace your encryption kid appropriately
    generateJWE(kid, JSON.stringify(cardInput), (result) => {
        if(result){
            console.log(cardInput)
            checkoutInput.encryptedCard = result;
            //checkoutInput.consumer.emailAddress = document.getElementById('input-email').value ; 
            document.getElementById('msg').style.display = 'none';
            console.log("Checkout input for the new card\n"+JSON.stringify(checkoutInput));
            callCheckout(checkoutInput);
        }else{
            console.error("Some error while encrypting!");
            document.getElementById('msg').style.display = 'none';
        }
    });
}

function newCardRecognizedUserFinal(){
    document.getElementById('msg').style.display = 'block';
    var card = document.getElementById('input-pan-recognized').value;
    var mm = document.getElementById('input-expiry-recognized').value.slice(0,2);
    var year = document.getElementById('input-expiry-recognized').value.slice(-4);
    var cvv = document.getElementById('input-cvv-recognized').value;
    var phonecc = document.getElementById('input-country-code-recognized').value;
    var phonenumber = document.getElementById('input-phone-number-recognized').value;
    var fName = document.getElementById('input-first-name-recognized').value;
    var lName = document.getElementById('input-last-name-recognized').value;
    var country = document.getElementById('input-country-recognized').value;
    var email_newuser = document.getElementById('input-email-recognized').value;
    let cardInput = {
        "card": {
            "primaryAccountNumber": card,
            "panExpirationMonth": mm,
            "panExpirationYear": year,
            "cardSecurityCode": cvv,
            "cardholderFullName": fName + " " + lName,
            "billingAddress": {
                "countryCode":  country
            }
        },
    }

    //cardInput = JSON.parse(cardInput);
    checkoutInput = {
        //"idToken" : visaIdToken,
        "dpaTransactionOptions": {
             "payloadTypeIndicator": "FULL",
        },
        "consumer" :{
            "countryCode" : country, //mandatory for merch orch - new user
            "firstName": fName, //mandatory for merch orch - new user
            "lastName": lName, //mandatory for merch orch - new user
            "languageCode" : "en", ////mandatory for merch orch new user only code and not country
            "mobileNumber" : {
                "countryCode" : phonecc,
                "phoneNumber" : phonenumber,
            },
            // "consumerIdentity" : {
            //     "identityProvider" : "SRC",
            //     "identityValue" : email_newuser,
            //     "type" : "EMAIL_ADDRESS"
            // }
        },
        "complianceSettings": {
            "complianceResources": [
                {
                    "complianceType": "TERMS_AND_CONDITIONS",
                    "uri": "usa.visa.com/legal/checkout/terms-of-service.html"
                },
                {
                    "complianceType": "PRIVACY_POLICY",
                    "uri": "usa.visa.com/legal/global-privacy-notice.html"
                },
                {
                    "complianceType": "REMEMBER_ME",
                    "uri": "visa.checkout.com/privacy"
                }
            ]
        },
        "dpaTransactionOptions": {
                "authenticationPreferences" : {
                    "authenticationMethodType" : "3DS",
                    "payloadRequested" : "AUTHENTICATED"
                },
                "acquirerBIN" : "455555",
                "merchantName" : "Sanjay's Cofeee",
                "acquirerMerchantId" : "123456789", //chnged
                "transactionAmount": {
                    "transactionAmount": "90.95",
                    "transactionCurrencyCode": "AED"
                }
            }
    };
    // Do PAN JWE for the card structure
    let kid = "WW7WS01IYBONU0YHHL0C13cPEqia6M9T1oWqZGSWmyQcWtSCk"; // Replace your encryption kid appropriately
    generateJWE(kid, JSON.stringify(cardInput), (result) => {
        if(result){
            console.log(JSON.stringify(cardInput))
            checkoutInput.encryptedCard = result;
            // checkoutInput.consumer.emailAddress = document.getElementById('input-email-recognized').value ; 
            document.getElementById('msg').style.display = 'none';
            console.log("Checkout input for the new card\n"+JSON.stringify(checkoutInput));
            callCheckout(checkoutInput);
        }else{
            console.error("Some error while encrypting!");
            document.getElementById('msg').style.display = 'none';
        }
    });
}

