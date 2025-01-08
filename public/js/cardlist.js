function cardlistChanged() {
    console.log("Card List changing..");
    let selectedElem = document.getElementById('cardlist-select').value;
    if (selectedElem !== "") {
        checkoutInput = {
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
                "acquirerMerchantId" : "12345678",
                "transactionAmount": {
                    "transactionAmount": "90.95",
                    "transactionCurrencyCode": "AED"
                },

            },
        };
        checkoutInput.srcDigitalCardId = selectedElem;
        checkoutInput.idToken = visaIdToken;
        checkoutInput.srcCorrelationId = srcCorrelationId;
        checkoutInput.srciTransactionId = srcCorrelationId;
        console.log("Checkout input after a card is selected\n" + JSON.stringify(checkoutInput));
        document.getElementById('cardlist-checkout-btn').style.display = 'block';
    } else {
        checkoutInput = {};
        document.getElementById('cardlist-checkout-btn').style.display = 'none';
    }
}

function cardSelectedFinal() {
    let checkoutInputSpecificCard = checkoutInput;
    callCheckout(checkoutInputSpecificCard);
}