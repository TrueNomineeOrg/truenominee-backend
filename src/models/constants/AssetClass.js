const AssetClassType = require('./AssetClassType')

const AssetClass = {
    BANKS: { name: 'Bank Accounts & Deposits', type: AssetClassType.FIXED },
    MUTUAL_FUNDS: { name: 'Mutual Funds', type: AssetClassType.FIXED },
    EQUITY_MARKETS: { name: 'National and International Stock Markets', type: AssetClassType.FIXED },
    INSURANCE: { name: 'Insurance Policies', type: AssetClassType.FIXED },
    RETIREMENT_ACCOUNTS: { name: 'Retirement Accounts', type: AssetClassType.FIXED },
    ESOPS: { name: 'Employer Stock Options', type: AssetClassType.VARIABLE },
    REAL_ESTATE: { name: 'Real Estate Investments', type: AssetClassType.VARIABLE },
    COMMODITIES: { name: 'Commodities', type: AssetClassType.VARIABLE },
    CRYPTOCURRENCY: { name: 'Crypto Currency', type: AssetClassType.VARIABLE },
    CUSTOM: { name: 'Custom Asset Class', type: AssetClassType.VARIABLE }
}

  module.exports = AssetClass;