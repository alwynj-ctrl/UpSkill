// Simple test to verify our Paytm route handles both GET and POST
const testUrl = 'http://localhost:3001/api/paytm-response';

// Test GET request
fetch(testUrl + '?test=true&STATUS=TXN_FAIL&RESPMSG=Test+message')
  .then(response => {
    console.log('GET Request Status:', response.status);
    console.log('GET Request redirected to:', response.url);
  })
  .catch(err => console.log('GET Error:', err.message));

// Test POST request  
fetch(testUrl, {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: 'test=true&STATUS=TXN_FAIL&RESPMSG=Test+message'
})
  .then(response => {
    console.log('POST Request Status:', response.status);
    console.log('POST Request redirected to:', response.url);
  })
  .catch(err => console.log('POST Error:', err.message));