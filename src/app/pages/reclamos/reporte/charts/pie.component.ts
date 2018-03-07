import { Component, Input } from "@angular/core";

@Component({ selector: "chart-pie", templateUrl: "./pie.component.html" })
export class PieComponent {
  @Input() data;
  // Pie
  public pieChartLabels: string[] = [
    "JavaScript",
    "Html",
    "Css",
    "Otros",
    "JavaScript",
    "Html",
    "Css",
    "Otros"
  ];
  public pieChartData: number[] = [
    Math.round(Math.random() * 100),
    Math.round(Math.random() * 100),
    Math.round(Math.random() * 100),
    Math.round(Math.random() * 100),
    Math.round(Math.random() * 100),
    Math.round(Math.random() * 100),
    Math.round(Math.random() * 100),
    Math.round(Math.random() * 100)
  ];
  public pieChartType: string = "pie";

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  ngOnInit() {}
  ngOnChanges() {
    if (this.data) {
      console.log(this.data);
    }
    delete this.pieChartLabels;
    delete this.pieChartData;
    this.pieChartLabels = [];
    this.pieChartData = [];
    if (this.data) {
      for (let value of this.data) {
        if (value.distrito != null) {
          this.pieChartLabels.push(value.distrito);
          this.pieChartData.push(parseInt(value.cont));
        }
      }
    }
  }
}
