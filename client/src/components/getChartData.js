import axios from 'axios';

const addDays = (date, days) => {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const monthDiff = (d1, d2) => {
  let months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth() + 1;
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
};

const projectAsset = (card, year) => {
  let result = [];
  let startMonth = 1;
  let diffMonths = 0;
  let indexMonth = 1;
  let meanFactor = 1;
  let bestFactor = 1;
  let worstFactor = 1;

  if ((card.type === 'saving') | (card.type === 'bond investment')) {
    startMonth = new Date(addDays(new Date(card.effectiveDate), 16).setDate(1));
    diffMonths = monthDiff(startMonth, new Date()) + 1;
    indexMonth = startMonth;
    meanFactor = n => {
      return (
        (1 - card.defaultProbability) * Math.pow(1 + card.meanGrowth / 12, n)
      );
    };
    bestFactor = n => {
      return Math.pow(1 + card.meanGrowth / 12, n);
    };
    // p is expected value
    // p(1-p) is variance, hence sqrt is standard deviation
    worstFactor = n => {
      return (
        (1 -
          card.defaultProbability -
          2 *
            Math.sqrt(
              (1 - card.defaultProbability) * card.defaultProbability
            )) *
        Math.pow(1 + card.meanGrowth / 12, n)
      );
    };
  } else if (card.type === 'cash') {
    startMonth = new Date();
    indexMonth = startMonth;
    diffMonths = 0;
    meanFactor = n => {
      return 1;
    };
    bestFactor = n => {
      return 1;
    };
    worstFactor = n => {
      return 1;
    };
  } else if (card.type === 'stock investment') {
    startMonth = new Date(addDays(new Date(card.effectiveDate), 16).setDate(1));
    diffMonths = monthDiff(startMonth, new Date()) + 1;
    indexMonth = startMonth;
    meanFactor = n => {
      return Math.pow(1 + 0.007686, n);
    };
    bestFactor = n => {
      return meanFactor(n) + Math.log1p(n * 0.095588);
    };
    worstFactor = n => {
      return meanFactor(n) - Math.log1p(n * 0.0423);
    };
  } else if (card.type === 'toy') {
    startMonth = new Date(addDays(new Date(card.effectiveDate), 16).setDate(1));
    diffMonths = monthDiff(startMonth, new Date()) + 1;
    indexMonth = startMonth;
    meanFactor = n => {
      return Math.pow(0.975, n);
    };
    bestFactor = n => {
      return Math.pow(0.98, n);
    };
    worstFactor = n => {
      return Math.pow(0.97, n);
    };
  }

  for (let i = 0; i < 12 * year; i++) {
    result[i] = {
      i,
      period: i + diffMonths,
      month: new Date(indexMonth.setMonth(indexMonth.getMonth() + 1)),
      meanFactor: meanFactor(i + diffMonths),
      bestFactor: bestFactor(i + diffMonths),
      worstFactor: worstFactor(i + diffMonths),
      mean: meanFactor(i + diffMonths) * card.balance,
      best: bestFactor(i + diffMonths) * card.balance,
      worst: worstFactor(i + diffMonths) * card.balance
    };
  }
  //console.log(card.type, card.name, result);
  return result;
};

const getChartData = async () => {
  const data = await axios.get('/api/v1/cards?card=asset');
  const cards = data.data.data.docs;
  const results = cards.map(card => projectAsset(card, 5));
  let chartData = [];

  for (let i = 0; i < results[0].length; i++) {
    //number of months
    let mean = 0;
    let best = 0;
    let worst = 0;
    for (let j = 0; j < results.length; j++) {
      //number of assets

      mean = mean + results[j][i].mean;
      best = best + results[j][i].best;
      worst = worst + results[j][i].worst;
    }
    chartData.push({
      period: results[0][i].period,
      month: results[0][i].month,
      mean,
      best,
      worst
    });
    //console.log(i, mean, best, worst);
  }
  //console.log(chartData);
  return chartData;
};

export default getChartData;
