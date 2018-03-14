/*
 * You'll eventually be given instructions how to use this file
 * If you want to use it before then, you'll have to figure it out yourself
 */

// You don't actually want to fill *this* value in on line 9, but you'll see
// other places in this file where you'll replace the FILL_ME_IN with a
// different value.
var FILL_ME_IN = 'Fill this value in';

var cardNetworkObject = {
  'Diner\'s Club': {
    prefixes: ['38','39'],
    lengths: [14]
  },
  'American Express': {
    prefixes: ['34','37'],
    lengths: [15]
  },
  'Visa': {
    prefixes: ['4'],
    lengths: [13, 16, 19]
  },
  'Discover': {
    prefixes: ['6011','65'].concat(range(644, 649)),
    lengths: [16, 19]
  },
  'MasterCard': {
    prefixes: range(51, 56),
    lengths: [16]
  },
  'Maestro': {
    prefixes: ['5018','5020','5038','6304'],
    lengths: [12, 13, 14, 15, 16, 17, 18, 19]
  },
  'China UnionPay': {
    prefixes: range(624, 626).concat(range(6282, 6288)).concat(range(622126, 622925)),
    lengths: [16, 17, 18, 19]
  },
  'Switch': {
    prefixes: ['4903','4905','4911','4936','564182','633110','6333','6759'],
    lengths: [16, 18, 19] 
  }
};

//I: low and high of prefix range
//O: return array of prefixes
function range(low, high) {
  return Array(high - low + 1).fill()
                              .map((_, i) => low + i)
                              .map(a => a.toString());
}

//I: prefix length and name
//O: string credit card number with prefix and length
function generateCreditCard(prefix, length, name) {
  var cardNumber = prefix;
  for (var i = 0; i < length - prefix.length; i++) {
    cardNumber += Math.floor(Math.random() * 10);
  }

  //deal with visa switch cross over
  if (name === 'Visa' && (cardNumber.substring(0,4) === '4903' 
                          || cardNumber.substring(0,4) === '4905' 
                          || cardNumber.substring(0,4) === '4911' 
                          || cardNumber.substring(0,4) === '4936')) {
    //call again if visa and generated a switch number
    return generateCreditCard(prefix, length, name);
  } else {
    return cardNumber;
  }
}

//I: prefix, length and name
//O: undefined (it runs the test)
function generateTest(prefix, length, name) {
  var should = chai.should();

  it('has a prefix ' + prefix + ' and a length of ' + length, function () {
    detectNetwork(generateCreditCard(prefix, length, name)).should.equal(name);
  });
}

//I: Name of a Card Network
//O: run all of the tests for that Card Network
function createAllCardNetworkTests(name) {
  var prefixes = cardNetworkObject[name].prefixes;
  var lengths = cardNetworkObject[name].lengths;

  for (var i = 0; i < prefixes.length; i++) {
    for (var j = 0; j < lengths.length; j++) {
      generateTest(prefixes[i], lengths[j], name);
    }
  }
}

//Run all the tests using Mocha

describe('Diner\'s Club', function() {
  createAllCardNetworkTests('Diner\'s Club');
});

describe('American Express', function() {
  createAllCardNetworkTests('American Express');
});

describe('Visa', function() {
  createAllCardNetworkTests('Visa')
});

describe('MasterCard', function() {
  createAllCardNetworkTests('MasterCard'); 
});

describe('Discover', function() {
  createAllCardNetworkTests('Discover');
});

describe('Maestro', function() {
  createAllCardNetworkTests('Maestro');
});

describe('China UnionPay', function() {
  createAllCardNetworkTests('China UnionPay');
});

describe('Switch', function() {
  createAllCardNetworkTests('Switch');
});
