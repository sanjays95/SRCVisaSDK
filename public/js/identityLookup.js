async function identityLookup(input, cb) {
    let promiseData = await vSrc.identityLookup(input)
    .then(function (data) {
        return data;
    })
    .catch(function (err) {
        return err;
    });
    cb(promiseData);
}

function callIdentityLookup() {
    document.getElementById('msg').style.display = 'block';
    email = document.getElementById('input-email').value;

    console.log(email)

    var consumerIdentity = {
        identityValue: email,
        type: 'EMAIL'
    }

    if(email == ""){
        //do phone look up
        identityLookup(consumerIdentityPhone, function (result) {
            console.log(consumerIdentityPhone)
            console.log("identityLookup result\n" + JSON.stringify(result));
            if (result.consumerPresent) {
                // Consumer present -> call initiateIdentityValidation
                console.log("Consumer present...Do initiateIdValidation");
                showSection('validate-email-section');
            } else {
                // Consumer not present -> do new user/card flow
                console.log("Consumer not present...Do new user flow");
                let card = {
                    "card": {
                        "primaryAccountNumber": "xxxx",
                        "panExpirationMonth": "10",
                        "panExpirationYear": "2023",
                        "cardSecurityCode": "123",
                        "cardholderFullName": "Test Test",
                        "billingAddress": {
                            "name": "Sanjay",
                            "line1": "Dubai",
                            "city": "Dubai",
                            "state": "AE",
                            "zip": "7579",
                            "countryCode": "AE"
                        }
                    }
                };
                card.card.primaryAccountNumber = card.card.primaryAccountNumber.replaceAll('x','4242'); // Using test card
                document.getElementById('input-newcard').value = JSON.stringify(card, null, 2);
                showSection('card-section');
            };
            document.getElementById('msg').style.display = 'none';
        });
    }else{
        identityLookup(consumerIdentity, function (result) {
            console.log("identityLookup result\n" + JSON.stringify(result));
            if (result.consumerPresent) {
                // Consumer present -> call initiateIdentityValidation
                console.log("Consumer present...Do initiateIdValidation");
                showSection('validate-email-section');
                callInitiateIdentityValidation();
            } else {
                // Consumer not present -> do new user/card flow
                console.log("Consumer not present...Do new user flow");
                let card = {
                    "card": {
                        "primaryAccountNumber": "xxxx",
                        "panExpirationMonth": "10",
                        "panExpirationYear": "2023",
                        "cardSecurityCode": "123",
                        "cardholderFullName": "Test Test",
                        "billingAddress": {
                            "countryCode": "AE"
                        }
                    },
                };
                card.card.primaryAccountNumber = card.card.primaryAccountNumber.replaceAll('x','4242'); // Using test card
                //document.getElementById('input-newcard').value = JSON.stringify(card, null, 2);
                showSection('card-section');
            };
            document.getElementById('msg').style.display = 'none';
        });
    }

    
}