/**
 * https://www.npmjs.com/package/alexa-sdk READ THIS
 * This skill utilizes api darksky to get weather information. The skill is not interested in temperature, humidity
 * of the temperature but the only concern is any weather alerts such as Tornado Watch, Severe Thunderstorm, etc.
 **/

'use strict';

const Alexa = require('alexa-sdk');
const DarkSky = require('dark-sky');
var request = require('request');


//Dothan, AL
const dothanUrl     = 'https://api.darksky.net/forecast/0eabc2aa814c864e8fc41be25f29ac2a/31.223812,-85.393356';
//Enterprise, AL
const enterpriseurl = 'https://api.darksky.net/forecast/0eabc2aa814c864e8fc41be25f29ac2a/31.328476,-85.844323';
//Eufaula, AL
const eufaulaurl    = 'https://api.darksky.net/forecast/0eabc2aa814c864e8fc41be25f29ac2a/31.910041,-85.152556';
//Geneva, Alabama
const genevaurl    = 'https://api.darksky.net/forecast/0eabc2aa814c864e8fc41be25f29ac2a/31.044886,-85.876818';
//Ozark, Alabama
const ozarkurl    = 'https://api.darksky.net/forecast/0eabc2aa814c864e8fc41be25f29ac2a/31.451615,-85.645035';
//Troy, Alabama
const troyurl    = 'https://api.darksky.net/forecast/0eabc2aa814c864e8fc41be25f29ac2a/31.802066,-85.964912';
//Albany, Georgia
const albanyurl    = 'https://api.darksky.net/forecast/0eabc2aa814c864e8fc41be25f29ac2a/31.577669,-84.179453';
//Americus, Georgia
const americusurl   = 'https://api.darksky.net/forecast/0eabc2aa814c864e8fc41be25f29ac2a/32.074104,-84.223597';
//Cordele, Georgia
const cordeleurl    = 'https://api.darksky.net/forecast/0eabc2aa814c864e8fc41be25f29ac2a/31.95609,-83.770077';
//Fitzgerald, Georgia
const fitzgeraldurl    = 'https://api.darksky.net/forecast/0eabc2aa814c864e8fc41be25f29ac2a/31.714253,-83.252232';
//Thomasville, Georgia
const thomasvilleurl    = 'https://api.darksky.net/forecast/0eabc2aa814c864e8fc41be25f29ac2a/30.839422,-83.978781';
//Moultrie, Georgia
const moultrieurl    = 'https://api.darksky.net/forecast/0eabc2aa814c864e8fc41be25f29ac2a/31.17943,-83.790786';
//Tifton, Georgia
const tiftonurl    = 'https://api.darksky.net/forecast/0eabc2aa814c864e8fc41be25f29ac2a/31.4621,-83.520494';
//Valdosta, Georgia
const valdostaurl  = 'https://api.darksky.net/forecast/0eabc2aa814c864e8fc41be25f29ac2a/30.850126,-83.278833';
//Lake City, Florida
const lakecityurl  = 'https://api.darksky.net/forecast/0eabc2aa814c864e8fc41be25f29ac2a/30.188762,-82.647103';
//Live Oak, Florida
const liveoakurl    = 'https://api.darksky.net/forecast/0eabc2aa814c864e8fc41be25f29ac2a/30.295625,-82.984108';
//Marianna, Florida
const mariannaurl    = 'https://api.darksky.net/forecast/0eabc2aa814c864e8fc41be25f29ac2a/30.780419,-85.242661';
//Tallahassee, Florida
const tallahasseeurl    = 'https://api.darksky.net/forecast/0eabc2aa814c864e8fc41be25f29ac2a/30.455109,-84.253419';
//Panama City, Florida
const pcityurl    = 'https://api.darksky.net/forecast/0eabc2aa814c864e8fc41be25f29ac2a/30.167122,-85.672509';
//Luverne, Alabama
const luverneurl    = 'https://api.darksky.net/forecast/0eabc2aa814c864e8fc41be25f29ac2a/31.718941,-86.269082';
//Opp, Alabama
const oppurl    = 'https://api.darksky.net/forecast/0eabc2aa814c864e8fc41be25f29ac2a/31.284375,-86.257442';
//Abbeville, Alabama
const abbevilleurl    = 'https://api.darksky.net/forecast/0eabc2aa814c864e8fc41be25f29ac2a/31.564216,-85.259634';
//Donalsonville, Georgia
const donaldsonvilleurl    = 'https://api.darksky.net/forecast/0eabc2aa814c864e8fc41be25f29ac2a/31.039691,-84.878424';
//Bainbridge, Georgia
const bainbridgeurl    = 'https://api.darksky.net/forecast/0eabc2aa814c864e8fc41be25f29ac2a/30.904933,-84.573047';


const APP_ID = 'amzn1.ask.skill.{unique key goes here}';  // TODO replace with your app ID (OPTIONAL).
const SKILL_NAME = 'wiregrass alerts';
const STOP_MESSAGE = 'Goodbye!';

const handlers = {
    'LaunchRequest': function () {
    	// If the user either does not reply to the welcome message or says something that is not
    	// understood, they will be prompted again with this text.        
        var outputSpeech = 'Welcome to wiregrass alerts. Which city would you like alerts information for?';
    	var repromptSpeech = 'You can say which cities are supported.';

    	this.emit(':ask', outputSpeech, repromptSpeech);
    },
    'Unhandled': function () {        
        var outputSpeech = 'You can say which cities are supported or You can say exit...What can I help you with?';
        this.emit(':ask', outputSpeech, outputSpeech)
    } ,
    'CityIntent':function () {
        var url = '';
        var citySlot = this.event.request.intent.slots.City;
        var cityName;
        if (citySlot && citySlot.value) {
            cityName = citySlot.value.toLowerCase();
        }

        if (cityName == 'dothan')
            url = dothanUrl;
        if (cityName == 'enterprise')
            url = enterpriseurl;
        if (cityName == 'eufaula')
            url = eufaulaurl;     
        if (cityName == 'geneva')
            url = genevaurl;     
        if (cityName == 'ozark')
            url = ozarkurl;     
        if (cityName == 'troy')
            url = troyurl;     
        if (cityName == 'albany')
            url = albanyurl;     
        if (cityName == 'americus')
            url = americusurl;     
        if (cityName == 'cordele')
            url = cordeleurl;     
        if (cityName == 'fitzgerald')
            url = fitzgeraldurl;     
        if (cityName == 'thomasville')
            url = thomasvilleurl;     
        if (cityName == 'moultrie')
            url = moultrieurl;     
        if (cityName == 'tifton')
            url = tiftonurl;     
        if (cityName == 'valdosta')
            url = valdostaurl;     
        if (cityName == 'lake city')
            url = lakecityurl;     
        if (cityName == 'live oak')
            url = liveoakurl;     
        if (cityName == 'marianna')
            url = mariannaurl;     
        if (cityName == 'tallahassee')
            url = tallahasseeurl;     
        if (cityName == 'panama city')
            url = pcityurl;     
        if (cityName == 'luverne')
            url = luverneurl;                
        if (cityName == 'opp')
            url = oppurl;   
        if (cityName == 'abbeville')
            url = abbevilleurl;   
        if (cityName == 'donaldsonville')
            url = donaldsonvilleurl;   
        if (cityName == 'bainbridge')
            url = bainbridgeurl;               


        var speechOutput = '';
        var numberOfAlerts = 0;
        var titleOfAlerts = '';        
        var parentThis = this;

        var options = 
        {
            url: url,
            headers: {
            'Access-Control-Allow-Origin': '*'
        }};

        if (url == '')
        {
            var outputSpeechNotFound = 'The city you said is not recognized for the wiregreass area. Say another city or say exit.';
            var repromptSpeechNotFoundCity = 'Which city would you like alerts information for?';
            parentThis.emit(':ask', outputSpeechNotFound, repromptSpeechNotFoundCity);
        }
        else{
            request.get(options,function(error,response,body){
                const fbResponse = JSON.parse(body);

                if (fbResponse.hasOwnProperty("alerts"))
                {
                	for (var i = 0, len = fbResponse.alerts.length; i < len; i++) {
                		numberOfAlerts++;

                		if (titleOfAlerts == '') {
                			titleOfAlerts = fbResponse.alerts[i].title;
                		}
                		else {
                			titleOfAlerts = titleOfAlerts + " and " + fbResponse.alerts[i].title;
                		}
                	}
                }


                if (numberOfAlerts == 0)
                    speechOutput = 'The city of ' + cityName + ' has no alerts at this time.';
                else if (numberOfAlerts == 1)
                    speechOutput = 'The city of ' + cityName + ' has 1 alert, it is ' + titleOfAlerts;
                else
                    speechOutput = 'The city of ' + cityName + ' has ' + numberOfAlerts + ' alerts. They are ' + titleOfAlerts;

                parentThis.emit(':tell', speechOutput);

            });
        }

    },  
    'WhatIsIntent': function () {
        var definition = 'The wiregrass region is an area of the Southern United States encompassing parts of southern Georgia, southeastern Alabama, and the Florida Panhandle. ';
        definition = definition + 'The wiregrass alerts only works with 24 of the major cities in this region, they are as follows. ';
        definition = definition + 'For Alabama the cities are: Abbeville, Dothan, Enterprise, Eufaula, Geneva, Luverne, Opp, Ozark and Troy. ';
        definition = definition + 'For Georgia the cities are: Albany, Americus, Bainbridge, Cordele, Donalsonville, Fitzgerald, Moultrie, Thomasville, Tifton, Valdosta. ';
        definition = definition + 'For Florida the cities are: Lake City, Live Oak, Marianna, Panama City, Tallahassee.';
        this.emit(':tell', definition);
    },    
    'AMAZON.HelpIntent': function () {
        var outputSpeech = 'You can say which cities are supported or You can say exit...What can I help you with?';
        this.emit(':ask', outputSpeech);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
};



exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();    
};