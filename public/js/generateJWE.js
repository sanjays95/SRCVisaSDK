// Code to generate JWE using node-jose library
function generateJWE(kid, payload, cb) {
    const webkey = {
        "kty": "RSA",
        "e": "AQAB",
        "n": "sZPIusDf7yQnnhBkU9mu14VOO3Crui3b7rAf2KYeobURmXA17b1JX9jg0Cd-vgpmuyTrxBUSc-4b0-UPgSwGFqPWUpx08ExqrwPDOvFojBou2wlyq8bcy0Us-BfeCzSE5lMVdSXTXXXcNqu-qb22jCCCJALpxsArsboMOXsLedh3M4XNQ5XGAtRf7b--uTY5Dr9KLYyUvZKAnY04MKJPEO54YiIFM5DTAhNOms089jdMdx-URIKJjPU2-RpHG1u8LCG028RTIpPsNbRanuS5TAY_zlxDgb1hKJ36YbZENHLg9PXTBhdOMlU90DTLlfcbLTa-D7DgljAaWCuvzLPaGw",
        "kid": kid,
        "use": "enc",
        "alg": "RSA-OAEP-256",
        "ext_content": "payload"
    };

    jose.JWK.asKey(webkey)
        .then((key) => {
            let options = {
                format: 'compact',
                contentAlg: 'A256GCM',
                fields: {
                    kid: key.kid,
                    typ: 'JOSE',
                    iat: Date.now(),
                    alg: key.alg,
                    enc: 'A256GCM',

                }
            };
            jose.JWE.createEncrypt(options, key)
                .update(payload)
                .final()
                .then((serializedJWE) => {
                    cb(serializedJWE);
                }, (error) => {
                    console.log("Error during encryption", error.message)
                    cb(null);
                });

        }, (error) => {
            console.log("Error in key", error.message);
            cb(null);
        });
}