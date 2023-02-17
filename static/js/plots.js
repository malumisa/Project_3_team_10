console.log(cities);

const options = {
    method: 'GET',
    url:'http://api.weatherapi.com/v1/current.json?key=29ad3cbdd70c4198ac704843231502 &q=bulk.json'
    // url: 'https://adsbexchange-com1.p.rapidapi.com/v2/registration/N8737L/',
    // headers: {
    //   // 'X-RapidAPI-Key': api_key,
    //   // 'X-RapidAPI-Host': 'adsbexchange-com1.p.rapidapi.com'
    // }
  };
  
  const dataPromise = d3.json(options);
  console.log("Data Promise: ", dataPromise);

// Fetch the JSON data and console log it
  d3.json(options).then(function(data) {
  console.log(data);
});



  