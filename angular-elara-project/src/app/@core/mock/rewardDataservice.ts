import { Injectable } from '@angular/core';
import { RewardData } from '../data/rewardData';

@Injectable()
export class RewardDataservice extends RewardData {

  data = [{
    redemption: 'Two ticktes to see the Who on the Lawn',
    dates: '09/01-12-31',
    category: 'Music',
    location: 'Madison, WI',
    points: '5000',
  }, {
    redemption: 'La Dolce Vita: Ultimate Rome Experience',
    dates: '09/01-12-31',
    category: 'Culture',
    location: 'Italy',
    points: '10000',
  }, {
    redemption: 'Unforgettable Dinner Experience in Athens',
    dates: '09/01-12-31',
    category: 'Food',
    location: 'Greece',
    points: '15000',
  }, {
    redemption: 'Iron Maden Concert Tickets',
    dates: '01/01-12-31',
    category: 'Music',
    location: 'Las Vegas,NV',
    points: '10000',
  }, {
    redemption: '10% off Hertz economy car rental',
    dates: '09/01-12-31',
    category: 'Car Rental',
    location: 'Americas',
    points: '15000',
  }];

  getData() {
    return this.data;
  }
}
