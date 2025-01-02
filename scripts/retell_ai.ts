import Retell from 'retell-sdk';
const from  = `+16506683119`

const retell = new Retell({
  apiKey: 'key_30362b27a0a31fc1ecb3b35f735f',
});
const duvie = `+1 (347) 452-0162`

const registerCallResponse = await retell.call.createPhoneCall({
  from_number: from, // replace with the number you purchased
  to_number: duvie,  // replace with the number you want to call
});
console.log(registerCallResponse);