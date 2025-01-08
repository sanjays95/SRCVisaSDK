async function initiateIdentityValidation(cb) {
    let promiseData = await vSrc.initiateIdentityValidation()
    .then(function (data) {
        return data;
    })
    .catch(function (err) {
        return err;
    });
    cb(promiseData);
}

function callInitiateIdentityValidation() {
    document.getElementById('msg').style.display = 'block';
    initiateIdentityValidation(function (result) {
        console.log("initiateIdentityValidation result\n"+JSON.stringify(result));
        if(result.maskedValidationChannel){
            // Present UI and get the OTP from user
            //document.getElementById('otp-channel').innerHTML = JSON.stringify(result.maskedValidationChannel);
            //showSection('complete-validate-email-section');
        }
        document.getElementById('msg').style.display = 'none';
    });
}

async function completeIdentityValidation(input, cb) {
    let promiseData = await vSrc.completeIdentityValidation(input)
    .then(function (data) {
        return data;
    })
    .catch(function (err) {
        return err;
    });
    cb(promiseData);
}

function callCompleteIdValidation() {
    document.getElementById('msg').style.display = 'block';
    var otp = document.getElementById('input-otp').value;
    completeIdentityValidation(otp, function (result) {
        console.log("completeIdentityValidation result\n" + JSON.stringify(result));
        if(!result.error){
            // Store the token -> result.idToken
            // call getSrcProfile with tokens, get masked card details, present in UI
            srcIdTokens.push(result.idToken);
            //showSection('getsrcprofile-section');
            callGetSrcProfile();
        }else{
            // validation error
            console.error("Error in completeIdentityValidation");
        }
        document.getElementById('msg').style.display = 'none';
    });
}