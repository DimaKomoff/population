import {Component, OnDestroy, OnInit} from '@angular/core';
import {SharedService} from '../../shared/shared.service';
import {PopulationDataType} from '../../shared/shared.types';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-population-table',
  templateUrl: './population-table.component.html',
  styleUrls: ['./population-table.component.scss']
})
export class PopulationTableComponent implements OnInit, OnDestroy {
  dataSource: Array<PopulationDataType> = [];
  subscription: Subscription;
  displayedColumns: string[] = ['age', 'males', 'year', 'country', 'females', 'total'];
  isLoaded = false;

  constructor(private sharedService: SharedService) {
  }

  ngOnInit() {
    this.sharedService.getPopulationData();
    this.subscription = this.sharedService.populationInfoSubject
      .subscribe(data => {
        this.dataSource.push(data);
      });
    this.dataSource.sort((a, b) => {
      return +a.age - +b.age;
    });
    this.isLoaded = true;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
