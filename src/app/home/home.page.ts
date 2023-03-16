import { Component } from '@angular/core';
import { CapacitorHealthkit, OtherData, SampleNames } from '@perfood/capacitor-healthkit';
import { endOfDay, startOfDay } from 'date-fns';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  weight = 0;
  calories = 0;
  constructor() {}

  async getPermissions() {
    const readPermissions = ['calories', 'steps', 'weight', 'activity'];

    await CapacitorHealthkit.requestAuthorization({
      all: [],
      read: readPermissions,
      write: [],
    });
  }

  async loadEnergyBurned() {
    const current = new Date();
    const startDate = startOfDay(current).toISOString();
    const endDate = endOfDay(current).toISOString();

    const queryOptions = {
      sampleName: 'activeEnergyBurned',
      startDate,
      endDate,
      limit: 0,
    };

    const data = await CapacitorHealthkit.queryHKitSampleType<OtherData>(
      queryOptions
    );

    const value = data.resultData.reduce(
      (value, item) => (value += item.value),
      0
    );

    this.calories = +value.toFixed();
  }

  async loadWeight() {
    const current = new Date();
    const startDate = startOfDay(current).toISOString();
    const endDate = endOfDay(current).toISOString();

    const queryOptions = {
      sampleName: SampleNames.WEIGHT,
      startDate,
      endDate,
      limit: 0,
    };

    const data = await CapacitorHealthkit.queryHKitSampleType<OtherData>(
      queryOptions
    );

    const value = data.resultData.reduce(
      (value, item) => (value += item.value),
      0
    );

    this.weight = +value.toFixed();
  }
}
