import { Injectable } from '@angular/core';
import {OfferData} from '../data/offerdata';

@Injectable()
export class OfferStaticDataService extends OfferData {

  data = [{
    offer: 'Stay in particapiting hotels** and earn 5000 points',
    dates: '09/01-12-31',
    membershipleval: 'B,G,P*',
    points: '5000',
  }, {
    offer: 'Stay in particapiting hotels** and earn 10000 points',
    dates: '09/01-12-31',
    membershipleval: 'B,G,P*',
    points: '10000',
  }, {
    offer: 'Stay in particapiting hotels** and earn 15000 points',
    dates: '09/01-12-31',
    membershipleval: 'B,G,P*',
    points: '15000',
  }, {
    offer: 'Earn points on 10th stay',
    dates: '01/01-12-31',
    membershipleval: 'B,G,P*',
    points: '10000',
  }, {
    offer: 'Earn points on 15th stay',
    dates: '09/01-12-31',
    membershipleval: 'B,G,P*',
    points: '15000',
  }, {
    offer: 'Earn points on 15th stay',
    dates: '09/01-12-31',
    membershipleval: 'B,G,P*',
    points: '20000',
  }];

  getData() {
    return this.data;
  }
}
