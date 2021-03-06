import CoinbaseWallet from './model/CoinbaseWallet'
import PoloniexWallet from './model/PoloniexWallet'
import Portfolio from './model/Portfolio'
import Coinmarket from './model/Coinmarket'
import Coin from './model/Coin'

const settings = require('../settings.json')

async function refreshPortfolio() {
  return new Promise(async (resolve) => {
    try {
      await Coinmarket.init()

      if (settings.accounts.coinbase && settings.accounts.coinbase.length > 0) {
        let coinbaseCoins = await CoinbaseWallet.getBalance()
        await Portfolio.addCoins(coinbaseCoins)
      }

      if (settings.accounts.poloniex && settings.accounts.poloniex.length > 0) {
        let poloniexCoins = await PoloniexWallet.getBalance()
        await Portfolio.addCoins(poloniexCoins)
      }

      for (let index in settings.otherHoldings) {
        if (settings.otherHoldings.hasOwnProperty(index)) {
          let otherHolding = settings.otherHoldings[index]
          Portfolio.addCoin(new Coin(Object.keys(otherHolding)[0], Object.values(otherHolding)[0]))
        }
      }

      await Portfolio.addMissingCoins()

      Portfolio.removeCoin('USDT')

      console.log(Portfolio.getOutput())
    } catch (error) {
      console.log(error)
      console.log('Error getting data, retrying...')
      return setTimeout(refreshPortfolio, 5000)
    }
    return resolve()
  })
}

refreshPortfolio().then()
