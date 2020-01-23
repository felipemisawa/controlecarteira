import { Injectable } from '@angular/core';
import { differenceInCalendarDays } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  constructor() {}

  NPV(rate: number, cashflows: number[]): number {
    let npv = 0;
    let i = 1;
    for (const cf of cashflows) {
      npv += cf / Math.pow(1 + rate, i);
      i++;
    }
    return npv;
  }

  private derivativeNPV(rate: number, cashflows: number[]): number {
    let dnpv = 0;
    for (let index = 0; index < cashflows.length; index++) {
      dnpv += -cashflows[index] * index * Math.pow(1 + rate, -index - 1);
    }
    return dnpv;
  }

  IRR(cashflows: number[], guess?: number): number {
    if (!guess) {
      guess = 0.0001;
    }
    const tries = 100;
    let nextRate = 0;
    let previousRate = 0;
    let positive = 0;
    let negative = 0;
    cashflows.forEach(cf => {
      if (cf > 0) {
        positive += cf;
      } else {
        negative += cf;
      }
    });
    let rate = (positive + negative) / Math.abs(negative);
    if (rate > 1) {
      rate = 1;
    }
    let i = 0;
    let npv = 1;

    if (rate > 0) {
      while (Math.abs(npv) > guess && i < tries) {
        console.log(`${this.NPV(rate, cashflows)}, ${rate}`);
        nextRate = rate * (1 - this.NPV(rate, cashflows) / negative);
        previousRate = rate;
        rate = nextRate;
        npv = this.NPV(nextRate, cashflows);
        i++;
      }
    } else if (rate < 0) {
      while (Math.abs(npv) > guess && i < tries) {
        console.log(`${this.NPV(rate, cashflows)}, ${rate}`);
        nextRate = rate - (this.NPV(rate, cashflows) / this.derivativeNPV(rate, cashflows));
        previousRate = rate;
        rate = nextRate;
        npv = this.NPV(nextRate, cashflows);
        i++;
      }
    } else {
      return 0;
    }

    if (i === tries) {
      throw new Error('Could not calculate IRR');
    } else {
      return rate;
    }
  }

  dailyXIRR(cashflows: number[], date: Date[], guess?: number): number {
    let dif = 0;
    let pointer = 0;
    const cfs = [];
    cfs[0] = cashflows[0];
    for (let i = 1; i < cashflows.length; i++) {
      dif = differenceInCalendarDays(new Date(date[i]), new Date(date[i - 1]));
      for (let j = 1; j < dif; j++) {
        cfs[pointer + j] = 0;
      }
      cfs[pointer + dif] = cashflows[i];
      pointer = pointer + dif;
    }
    try {
      return this.IRR(cfs);
    } catch (error) {
      throw error;
    }
  }
}
