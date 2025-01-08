async function getSrcProfile(input, cb) {
    let promiseData = await vSrc.getSrcProfile(input)
    .then(function (data) {
        return data;
    })
    .catch(function (err) {
        return err;
    });
    cb(promiseData);
}

function callGetSrcProfile() {
    document.getElementById('msg').style.display = 'block';
    let idTokens = [...srcIdTokens];
    getSrcProfile(idTokens, function (result) {
        console.log("getSrcProfile result\n"+JSON.stringify(result));
        // Present the list of cards to user for selection
        // List of Cards -> result.profiles[] -> maskedCards
        // This sample project we are just taking profiles[0]
        if(!result.error){
            srcCorrelationId = result.srcCorrelationId;
            let cardSelectUIElem = document.getElementById('cardlist-select');
            cardSelectUIElem.innerHTML = "";
            let defOption = document.createElement('option');
            defOption.value = "";
            defOption.text = "select a card";
            cardSelectUIElem.add(defOption);
            if(result.profiles[0]){
                visaIdToken = result.profiles[0].idToken;
                document.getElementById('masked-consumer').innerHTML =  JSON.stringify(result.profiles[0].maskedConsumer.maskedEmailAddress)
                srcCardLists = [];
                for (maskedCard of result.profiles[0].maskedCards){
                    let option = document.createElement('option');
                    option.value = maskedCard.srcDigitalCardId;
                    option.text = maskedCard.panLastFour + " (" + maskedCard.digitalCardData.status + ")";
                    cardSelectUIElem.add(option);
                }
            }
            showSection('cardlist-section');
            
        }else{
            console.error("Error in getSrcProfile...");
        }
        document.getElementById('msg').style.display = 'none';
    });
}