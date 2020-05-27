export interface FilterModel{
  name: string;
  value?: string | number;
  series?: [{
    value?: number,
    name?: Date
  }]
}
