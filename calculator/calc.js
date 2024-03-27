const express = require('express');
const axios = require('axios');
const { isPrime, isFibonacci } = require('./helpers'); 

const app = express();
const PORT = process.env.PORT || 9876;
const WINDOW_SIZE = 10;
let numbers = [];


app.use(express.json());


app.get('/numbers/:numberId', async (req, res) => {
  const { numberId } = req.params;

  try {
    const response = await axios.get(`http://localhost:9876/numbers/e/${numberId}`); 

    
    const qualifiedNumbers = response.data.numbers.filter(number => {
      switch (numberId) {
        case 'p':
          return isPrime(number);
        case 'f':
          return isFibonacci(number);
        case 'e':
          return true; 
        default:
          return true; 
      }
    });

   
    const uniqueNumbers = [...new Set(qualifiedNumbers)];

  
    let avg = null;
    if (uniqueNumbers.length >= WINDOW_SIZE) {
      const windowNumbers = uniqueNumbers.slice(-WINDOW_SIZE);
      avg = windowNumbers.reduce((acc, curr) => acc + curr, 0) / WINDOW_SIZE;
    }

    
    numbers = uniqueNumbers;

   
    const responseObj = {
      windowPrevState: numbers.length > WINDOW_SIZE ? numbers.slice(-WINDOW_SIZE - 1, -1) : [],
      windowCurrState: numbers.slice(-WINDOW_SIZE),
      numbers: qualifiedNumbers,
      avg: avg !== null ? avg.toFixed(2) : null
    };


    res.json(responseObj);
  } catch (error) {
    console.error('Error fetching numbers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});