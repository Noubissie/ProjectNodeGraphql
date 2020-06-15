let securityHeaders = {
    1:"Content-Security-Policy",
    2:"Strict-Transport-Security",
    3:"Referrer-Policy",
    4:"Access-Control", // makes your site less secure but used for api request CORS()
    //performance hit
    5:["Accept-CH" // CH->client Hit: send you addition information
    // about the user and their devices e.g Divice-pixel-ration, Save-Data
    ,'Accept-CH-Lidetime:86400'],
    6:"link" // use in preload: telling the browser this other resource would be use so 
    //load the content before. new status code 103. send preload headers
    ,
    6:"Server-Timing"  // control with js performance.getEntries()[0].serverTiming
    ,
    7:"Feature-policy" //stop some web features so are to reduce attacks or unused 
    //attributes [autoplay:none,speaker:self,unsized-media(images only take size of their content when loaded from some3rdparty.com)]
    //document.featurePolicy.allowedFeatures().sort().join('\n')
    // "accelerometer
    // autoplay
    // camera
    // document-domain
    // encrypted-media
    // fullscreen
    // geolocation
    // gyroscope
    // magnetometer
    // microphone
    // midi
    // payment
    // picture-in-picture
    // sync-xhr
    // usb
    // xr-spatial-tracking"
    ,
    8:"Sec-Origin-Policy" //
    ,
}