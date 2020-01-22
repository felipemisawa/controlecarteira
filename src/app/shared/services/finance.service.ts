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
    let i = 1;
    for (const cf of cashflows) {
      dnpv += (-(i - 1) * cf) / Math.pow(1 + rate, i - 1);
      i++;
    }
    return dnpv;
  }

  IRR(cashflows: number[], guess?: number): number {
    if (!guess) {
      guess = 0.0001;
    }
    let sum = 0;
    cashflows.forEach(cf => {
      sum += cf;
    });
    let rate = 1;
    let i = 0;
    let npv = this.NPV(rate, cashflows);

    while (Math.abs(npv) > guess && i < 10000) {
      rate -= this.NPV(rate, cashflows) / this.derivativeNPV(rate, cashflows);
      npv = this.NPV(rate, cashflows);
      i++;
    }

    if (Math.abs(npv) > guess) {
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
