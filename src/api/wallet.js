import axios from 'axios'


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getBitcoinQuote: () => new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url:'https://www.mercadobitcoin.net/api/BTC/ticker'
        }).then(response => {
          if (response.status === 200) {
            resolve(response.data.ticker)
          }
          else {
            reject(new Error('CouldNotConnect'))
          }
        }).catch(err =>  {
          reject(err.response || err)
        })
      }),

      getBusdQuote: () => new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url:'https://economia.awesomeapi.com.br/all/USD-BRL',
        }).then(response => {
          if (response.status === 200) {
            resolve(response.data.USD)
          }
          else {
            reject(new Error('CouldNotConnect'))
          }
        }).catch(err =>  {
          reject(err.response || err)
        })
      })
}

