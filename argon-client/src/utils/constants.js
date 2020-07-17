export const accountTypesDefaultValues = {
  income: {type:'income', longType: 'Income', nativeDebitCredit: false,sort:1},
  expense: {type:'expense', longType: 'Expense', nativeDebitCredit: true ,sort:5},
  cash: {type:'cash', longType: 'Cash', nativeDebitCredit: true, liquidityScore: 999 ,effectiveDate:true,sort:10},
  foreign: {type:'foreign', longType: 'Foreign Currency', nativeDebitCredit: true, liquidityScore: 800 ,effectiveDate:true,sort:15},
  saving: {type:'saving', longType: 'Term Saving', nativeDebitCredit: true, liquidityScore: 950 ,effectiveDate:true,simpleAnnualInterest:true,term:true,sort:20},
  stock: {type:'stock', longType: 'Stock', nativeDebitCredit: true,liquidityScore: 800 ,effectiveDate:true,sort:25},
  bond: {type:'bond', longType: 'Bond', nativeDebitCredit: true, liquidityScore: 500 ,effectiveDate:true,simpleAnnualInterest:true,term:true,sort:30},
  gold: {type:'gold', longType: 'Gold', nativeDebitCredit: true,liquidityScore: 750 ,effectiveDate:true,sort:35},
  insurance: {type:'insurance', longType: 'Insurance', nativeDebitCredit: true,liquidityScore: 1 ,effectiveDate:true,sort:40},  
  realEstates: {type:'realEstates', longType: 'Real Estates', nativeDebitCredit: true,liquidityScore: 100 ,effectiveDate:true,income:true,sort:45},
  risky: {type:'risky', longType: 'High-Risk Assets', nativeDebitCredit: true,liquidityScore: 200 ,effectiveDate:true,sort:50},
  toy: {type:'toy', longType: 'Toy', nativeDebitCredit: true,liquidityScore: 400 ,effectiveDate:true, usefulLife:true,sort:55},
  lending: {type:'lending', longType: 'Lending', nativeDebitCredit: true,liquidityScore: 200 ,effectiveDate:true,sort:60},
  otherAsset: {type:'otherAsset', longType: 'Other Assets', nativeDebitCredit: true,liquidityScore: 300 ,effectiveDate:true,sort:65},
  creditCard: {type:'creditCard', longType: 'Credit Card', nativeDebitCredit: false ,effectiveDate:true,sort:70},
  borrowing: {type:'borrowing', longType: 'Borrowing', nativeDebitCredit: false ,effectiveDate:true,sort:75},
  otherLiability: {type:'otherLiability', longType: 'Other Liabilities', nativeDebitCredit: false,effectiveDate:true ,sort:80}
};

export const partnerCredentials = {
  vietcapital: {id: 'vietcapital', password: 'saving123', name:'',website:'',logo:''},
  vietcombank:{id: 'vietcombank', password: 'transactions123', name:'',website:'',logo:''},
  vib:{id: 'vib', password: 'okk123', name:'',website:'',logo:''},
  vinacapital:{id: 'vinacapital', password: 'goodlookingscam123', name:'',website:'',logo:''},
  fecredit:{id: 'fecredit', password: 'shark123', name:'',website:'',logo:''},
  aia:{id: 'aia', password: 'insurgent123', name:'',website:'',logo:''},
  
}