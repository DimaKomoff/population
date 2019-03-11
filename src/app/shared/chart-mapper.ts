import {PopulationDataType} from './shared.types';

export class ChartMapper {
  public dataSource: {name: string; value: number};
  constructor(data: PopulationDataType) {
    this.dataSource = {
      name: 'Age ' + data.age,
      value: data.total
    };
  }

  get getDataSource() {
    return this.dataSource;
  }
}
