export const accountTypesDefaultValues = {
  income: {type:'income', longType: 'Income', nativeDebitCredit: false},
  expense: {type:'expense', longType: 'Expense', nativeDebitCredit: true },
  cash: {type:'cash', longType: 'Cash', nativeDebitCredit: true, liquidityScore: 999 ,effectiveDate:true},
  saving: {type:'saving', longType: 'Term Saving', nativeDebitCredit: true, liquidityScore: 950 ,effectiveDate:true,simpleAnnualReturn:true,term:true},
  stock: {type:'stock', longType: 'Stock', nativeDebitCredit: true,liquidityScore: 800 ,effectiveDate:true},
  bond: {type:'bond', longType: 'Bond', nativeDebitCredit: true, liquidityScore: 500 ,effectiveDate:true,simpleAnnualReturn:true,term:true},
  gold: {type:'gold', longType: 'Gold', nativeDebitCredit: true,liquidityScore: 750 ,effectiveDate:true},
  insurance: {type:'insurance', longType: 'Insurance', nativeDebitCredit: true,liquidityScore: 1 ,effectiveDate:true},  
  realEstates: {type:'realEstates', longType: 'Real Estates', nativeDebitCredit: true,liquidityScore: 100 ,effectiveDate:true,income:true},
  risky: {type:'risky', longType: 'High-Risk Assets', nativeDebitCredit: true,liquidityScore: 200 ,effectiveDate:true},
  toy: {type:'toy', longType: 'Toy', nativeDebitCredit: true,liquidityScore: 400 ,effectiveDate:true, usefulLife:true},
  lending: {type:'lending', longType: 'Lending', nativeDebitCredit: true,liquidityScore: 200 ,effectiveDate:true},
  otherAsset: {type:'otherAsset', longType: 'Other Assets', nativeDebitCredit: true,liquidityScore: 300 ,effectiveDate:true},
  creditCard: {type:'creditCard', longType: 'Credit Card', nativeDebitCredit: false ,effectiveDate:true},
  borrowing: {type:'borrowing', longType: 'Borrowing', nativeDebitCredit: false ,effectiveDate:true},
  otherLiability: {type:'otherLiability', longType: 'Other Liabilities', nativeDebitCredit: false,effectiveDate:true }
};

export const partnerCredentials = {
  vietcapital: {id: 'vietcapital', password: 'saving123', name:'',website:'',logo:''},
  vietcombank:{id: 'vietcombank', password: 'transactions123', name:'',website:'',logo:''},
  vib:{id: 'vib', password: 'okk123', name:'',website:'',logo:''},
  vinacapital:{id: 'vinacapital', password: 'goodlookingscam123', name:'',website:'',logo:''},
  fecredit:{id: 'fecredit', password: 'shark123', name:'',website:'',logo:''},
  aia:{id: 'aia', password: 'insurgent123', name:'',website:'',logo:''},
  
}