const axios = require('axios')                                              // Importing the libraries
const cheerio = require('cheerio')
const express = require('express')

const PORT = process.env.PORT || 5000                                        // Starting the port
const app = express()               
  
const URL =  'https://www.imdb.com/india/top-rated-indian-movies'             

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  readline.question(`Enter number of movies`, n => {                        // Taking input
    func(n)                                                                 // Calling the main function
    readline.close();
  });
  
function func(n)
{

axios(URL)                                                                  
    .then(res => {
        const htmlData = res.data
        const $ = cheerio.load(htmlData)                                                    // Loading data througn cheerio
        const array = []

        $('.titleColumn', htmlData).each((index, element) => {
            const title = $(element).find('.titleColumn > a').text()                        // Title of the movie
            const year = $(element).children('.secondaryInfo').text()                       // Year of release of the movie
            const rating = $(element).parent().find('.ratingColumn > strong').text()        // Rating of the movie
            const link = "https://www.imdb.com" + $(element).children().attr('href')        // Link of the movie
            
            array.push
            ({                                                                   // Adding all the variables to object array
                title,
                year,
                rating,
                link
            })
        })

        console.log('\n')

        for(let i=0; i<n; i++)
        {
            console.log(JSON.stringify(array[i]), '\n')                           // Printing out 'n' movies after converting them to JSON string
        }

    }).catch(err => console.error(err))
}
    
app.listen(PORT, () => console.log())