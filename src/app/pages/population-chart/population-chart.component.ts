import {Component, OnDestroy, OnInit} from '@angular/core';
import {SharedService} from '../../shared/shared.service';
import {Subscription} from 'rxjs';
import {PopulationDataType} from '../../shared/shared.types';
import {ChartMapper} from '../../shared/chart-mapper';

@Component({
  selector: 'app-population-chart',
  templateUrl: './population-chart.component.html',
  styleUrls: ['./population-chart.component.scss']
})
export class PopulationChartComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  single: Array<{name: string, value: number}> = [];
  isLoaded = false;

  // chart options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Age';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  constructor(
    private sharedService: SharedService
  ) {
  }

  ngOnInit() {
    this.sharedService.getPopulationData();
    this.subscription = this.sharedService.populationInfoSubject
      .subscribe((data: PopulationDataType) => {
       this.single.push(new ChartMapper(data).getDataSource);
       this.single = [...this.single];
      });
    this.isLoaded = true;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
