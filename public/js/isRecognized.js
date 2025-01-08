async function isRecognized(cb) {
    
    const promiseData = await vSrc.isRecognized()
        .then(function (data) {
            return data;
        })
        .catch(function (err) {
            return err;
        });
    cb(promiseData);
}

function callIsRecognized() {
    
    isRecognized((result) => {
        // console.log("Delay added")
        // setTimeout(doSomething, 1000);
        console.log("isRecognized result\n" + JSON.stringify(result));
        if (result.recognized) {
            // Store the token
            // User is recognized
            srcIdTokens = [...result.idTokens];
            //showSection('getsrcprofile-section');
            callGetSrcProfile()
        } else {
            // User is not recognized
            showSection('email-section');
            //showSection('phone-section');
        }
    });
}

function doSomething() {
   //do whatever you want here
}