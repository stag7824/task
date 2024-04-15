/** JavaScript
* This method receives a string that contains
* free form text. If the string contains a number
* it should be returned as the price. Additionally,
* if the string contains any of the recognised
* currencies, it should be returned as the currency
* @param string input free form test
* @returns JSON object contains currency and price
*/
function commafy( num ) {
    var str = num.toString().split('.');
    if (str[0].length >= 3) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
}
function get_currency_and_price(input) {
    const currencies = ['AUD', 'NZD', 'USD', 'CAD',
    'EUR', 'GBP', 'PKR', 'JPY', 'CNY', 'WON', 'INR', 'IDR',
    'AU$', 'US$', 'CA$', 'GB£', 'Rp', '$', '€', '£', '₹', '¥', '₩']
   
    // Implement your logic here    
    let currency = "";
    let price = "";
    
    for(let i in currencies){
        if(input.includes(currencies[i])){
            // console.log("Currency here",currencies[i]);
            currency=currencies[i];
            break;
            
        }
    }

    input = input.split(" ").join('');

    let numbers = input.replace(/[^0-9.]/g, '');
    // price=input.match('/\d+/g');
    if(numbers[0]=='.'){
        numbers=numbers.substring(1);
    }
    numbers=commafy(numbers);
    price = numbers;
    // console.log("price here", price);
    
    return {currency, price}
 }
 
 
 function test_currency_price() {
    const testCases = [
        { input: "WIDE RING WITH INTERLOCKING GAU$ 490", currency: "AU$", price: "490"},
        { input: "$1,000.00", currency: "$", price: "1,000.00"},
        { input: "$ 1,000.00", currency: "$", price: "1,000.00"},
        { input: "USD 1,000.00", currency: "USD", price: "1,000.00"},
        { input: "USD1,000.00", currency: "USD", price: "1,000.00"},
        { input: "1,000.00 EUR", currency: "EUR", price: "1,000.00"},
        { input: "1,000.00EUR", currency: "EUR", price: "1,000.00"},
        { input: "AUD.1,000.00", currency: "AUD", price: "1,000.00"},
        { input: "AUD. 1,000.00", currency: "AUD", price: "1,000.00"},
        { input: "1,000.00", currency: "", price: "1,000.00"},
        { input: " 1,000.00", currency: "", price: "1,000.00"},
        { input: "1,000.00 ", currency: "", price: "1,000.00"},
        { input: " 1,000.00 ", currency: "", price: "1,000.00"},
    ]
    let errorMsg = 'Does not match'
    for (let t in testCases) {
        const { currency, price } = get_currency_and_price(testCases[t].input)
        console.assert(testCases[t].currency === currency, '%o', { currency, errorMsg });
        console.assert(testCases[t].price === price, '%o', { price, errorMsg });
    }
 }

 test_currency_price();
 