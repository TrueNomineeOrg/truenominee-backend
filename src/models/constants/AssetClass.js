const AssetClassType = require('./AssetClassType')

const AssetClass = {
    BANKS: { name: 'Bank Accounts & Deposits', type: AssetClassType.FIXED },
    MUTUAL_FUNDS: { name: 'Mutual Funds', type: AssetClassType.FIXED },
    EQUITY_MARKETS: { name: 'National and International Stock Markets', type: AssetClassType.FIXED },
    INSURANCE: { name: 'Insurance Policies', type: AssetClassType.FIXED },
    RETIREMENT_ACCOUNTS: { name: 'Retirement Accounts', type: AssetClassType.FIXED },
    ESOPS: { name: 'Employer Stock Options', type: AssetClassType.CUSTOM },
    REAL_ESTATE: { name: 'Real Estate Investments', type: AssetClassType.CUSTOM },
    COMMODITIES: { name: 'Commodities', type: AssetClassType.CUSTOM },
    CRYPTOCURRENCY: { name: 'Crypto Currency', type: AssetClassType.CUSTOM },
    CUSTOM: { name: 'Custom Asset Class', type: AssetClassType.CUSTOM }
}

  module.exports = AssetClass;