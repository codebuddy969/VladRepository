import { Injectable } from '@angular/core';
import { TransactionData } from '../data/transaction-data';

@Injectable()
export class TransactionDataService extends TransactionData {

  data = [{
    transactionId: '3b0dae0d3bc799adc1c8d5897b641b1d03f97c29b5b56c67a0e6a7b4d28d16eb',
    timeStamp: 'Fri, 16 Aug 2019 13:14:57 GMT',
    memberId: '3456432',
    points: '5000',
  }, {
    transactionId: '3b0dae0d3bc799adc1c8d5897b641b1d03f97c29b5b56c67a0e6a7b4d28d16eb',
    timeStamp: 'Tue, 13 Aug 2019 12:30:37 GMT',
    memberId: '45678',
    points: '10000',
  }];

  getData() {
    return this.data;
  }
}
