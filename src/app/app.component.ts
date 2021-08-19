import { Component } from '@angular/core';

import userJson from '../assets/users.json';
import subscriptionsJson from '../assets/subscriptions.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  searchText: string = '';
  isDesc: boolean = false;
  originalRecords: any = [];
  records: any = [];
  subscriptions: any = [];

  constructor() {

  }

  ngOnInit() {
    this.originalRecords = userJson;
    this.records = userJson;
    this.subscriptions = subscriptionsJson;
  }

  sort(property: string) {
    this.isDesc = !this.isDesc; //change the direction   
    let direction = this.isDesc ? 1 : -1;

    this.records.sort(function (a: any, b: any) {
      if (a[property] < b[property]) {
        return -1 * direction;
      }
      else if (a[property] > b[property]) {
        return 1 * direction;
      }
      else {
        return 0;
      }
    });
  }

  filter(searchText: any) {
    let filteredRecords = this.originalRecords;

    if (searchText !== "") {
      filteredRecords = this.originalRecords.filter((f: any) => f.first_name.toLowerCase().includes(searchText.toLowerCase()));
    }

    this.records = filteredRecords;
  }

  viewSubscription(userId: number) {
    let selectedPackage = 'No Subscription';

    const selectedSubscription = this.subscriptions.find((r: any) => parseInt(r.user_id) === userId);
    if (selectedSubscription && selectedSubscription.package) {
      selectedPackage = `Package Name: ${selectedSubscription.package}\nExpires On: ${selectedSubscription.expires_on}`;
    }
    alert(selectedPackage);
  }
}
