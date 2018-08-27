import { Component, Input } from "@angular/core";

@Component({
  selector: "chart-bar",
  templateUrl: "./bar.component.html"
})
export class BarComponent {
  @Input() data;
  datos;
  id;
  public dataBar;
  public labelData;

  public barChartOptions: any = {
    scaleShowVerticalLines: true,
    responsive: true,
    legend: { position: 'right' }
  };

  public barChartLabels: string[];
  public barChartType: string = "bar";
  public barChartLegend: boolean = true;

  public barChartData: any[] = [{ data: [0], label: "" }];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public randomize(): void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.random() * 100,
      56,
      Math.random() * 100,
      40
    ];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }

  ngOnChanges() {
    this.labelData = [];
    this.dataBar = [];
    console.log(this.data.length);
    if (this.data.length > 0) {
      let dataBar = [{ data: [0], label: "" }];
      for (let value of this.data) {
        if (value.distrito != null) {
          this.barChartLabels = ["Distritos"];
          dataBar.push({
            data: [parseInt(value.cont)],
            label: value.distrito
          });
        } else {
          this.barChartLabels = ["Departamentos"];
          dataBar.push({
            data: [parseInt(value.cont)],
            label: value.departamento
          });
        }
      }

      this.barChartData = dataBar;
    }
  }
}
