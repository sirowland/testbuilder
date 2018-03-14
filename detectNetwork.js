// How can you tell one card network from another? Easy! 
// There are two indicators:
//   1. The first few numbers (called the prefix)
//   2. The number of digits in the number (called the length)

var detectNetwork = function(cardNumber) {
  var length = cardNumber.length;
  var idDigits1 = cardNumber.substring(0,1);
  var idDigits2 = cardNumber.substring(0,2);
  var idDigits3 = cardNumber.substring(0,3);
  var idDigits4 = cardNumber.substring(0,4);
  var idDigits6 = cardNumber.substring(0,6);

  var ids = [idDigits1 ,idDigits2, idDigits3, idDigits4, idDigits6];

  //Possible numbers with some subtractions (china unionpay 800 different possible)
  var diners = ['38','39'];
  var amEx = ['34','37'];
  var visa = ['4'];
  var discover = ['6011','644','645','646','647','648','649','65'];
  var masterCard = ['51','52','53','54','55','56'];
  var maestro = ['5018','5020','5038','6304'];
  var chinaUnionPay = ['624','625','626','6282','6283','6284','6285','6286','6287','6288'];
  var switchCard = ['4903','4905','4911','4936','564182','633110','6333','6759']; 


  //Conditional cases for different card providers
  if (length === 14 && checkDigits(ids, diners)) {
  	return 'Diner\'s Club';

	} else if (length === 15 && checkDigits(ids, amEx)) {
  	return 'American Express';

  //SWITCH MOVED IN FRONT OF VISA SO IT FIRST CHECKS THE LONGER PREFIXES
  } else if ((length === 16 || length === 18 || length === 19) && checkDigits(ids, switchCard)) {
		return 'Switch';	

  } else if ((length === 13 || length === 16 || length === 19) && checkDigits(ids, visa)) {
  	return 'Visa';
 
  } else if ((length === 16 || length === 19) && checkDigits(ids, discover)) {
		return 'Discover';	

  } else if (length === 16 && checkDigits(ids, masterCard)) {
		return 'MasterCard';	

  } else if (length >= 12 && length <= 19 && checkDigits(ids, maestro)) {
		return 'Maestro';	

  } else if (length >= 16 && length <= 19 && checkDigits(ids, chinaUnionPay)) {
		return 'China UnionPay';	
  } else if (length >= 16 && length <= 19 && idDigits6 / 1000 >= 622.126 && idDigits6 / 1000 <= 622.925 ) {
		return 'China UnionPay';	
		
  } else {
  	return 'Card Type Unsupported.';
  }
}

//HELPER FUNCTIONS

//I: string of digits, array of truthful values for card provider
//O: whether its a valid id
//N^2 complexity
function checkDigits(inputDigitArr, checkArr) {
	for (var i = 0; i < checkArr.length; i++) {
		for (var j = 0; j < inputDigitArr.length; j++) {
			if (checkArr[i] === inputDigitArr[j]) {
				return true;
			}
		}
	}
	return false;
}


