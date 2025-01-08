// Modify the initParams accordingly
//CisTestSRCi="B4MZPQ9SMC1L5JETK1R4217VxU0TXkAShyIUd8iNt67DF_TsY",
//WallletDoc=STCE3GD42VC50HGLU4EH21rLRM3YB3MUl0looGSh4bI_MoxTs
let initParams = {
    "srciTransactionId": "s4mp1team-",
    // "srcInitiatorId": "B4MZPQ9SMC1L5JETK1R4217VxU0TXkAShyIUd8iNt67DF_TsY",//CisTestSRCi="B4MZPQ9SMC1L5JETK1R4217VxU0TXkAShyIUd8iNt67DF_TsY",
    //ukheshe : "VH9RVCVOHO9J80OF2HA721SirtjIsxb_bUiGX_kFz6RjWe-HA" ; testmerchant-ukheshe
    //VStore_3DS
    "srcInitiatorId": "VH9RVCVOHO9J80OF2HA721SirtjIsxb_bUiGX_kFz6RjWe-HA",
    "srciDpaId": "testmerchant-ukheshe",
    "dpaTransactionOptions": {
        "payloadTypeIndicator" : "FULL",
        "customInputData" : {
            "checkoutOrchestrator" : "merchant"
        },
        "paymentOptions": {
            "dynamicDataType": "TAVV",
            "dpaPanRequested": false
        },
        "transactionType": "BILL_PAYMENT",
    }
};


async function init(initParams, cb) {
    const promiseData = await vSrc.init(initParams)
    .then(function (response) {
        return response;
    })
    .catch(function (error) {
        return error;
    });
    cb(promiseData);
}

function callInit() {
    document.getElementById('init-section').style.display = 'block';
    srciTransactionId = initParams.srciTransactionId + new Date().getTime() + "-r" + Math.floor(Math.random()*100);
    initParams.srciTransactionId = srciTransactionId;
    initParams.srcCorrelationId = srciTransactionId
    init(initParams, function (result) {
        console.log(JSON.stringify(initParams))
        console.log("Init result\n" + JSON.stringify(result));
        if (!Object.keys(result).length) {
            console.log("init() successful");
            //Next -> call isRecognized()
            setTimeout(function() {
                console.log("Added 2 seconds delay")
                callIsRecognized();
                
              }, 2000);
            
        } else {
            console.error("init() failure");
            // Some error in init, validate input or retry
        }
    });
}