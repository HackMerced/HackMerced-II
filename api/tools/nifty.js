'use strict'

const crypto = require('crypto');
const request = require('request');
const OAuth = require('oauth');


function cryptobox(x, y, z){
  return crypto.randomBytes(x).toString('hex') + '_' + crypto.randomBytes(y).toString('hex') + '_' + crypto.randomBytes(z).toString('hex');
}

const tryParseJSON = function(data) {
  let result = false;

  try{
    result = JSON.parse(data);
  } catch(e){
    // who cares
  }
  return result;
};

module.exports = {
  tryParseJSON:function(data){
    return tryParseJSON(data);
  },
  cryptobox:function(x, y, z){
      return cryptobox(x, y, z);
  },
}
