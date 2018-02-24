import { Component } from "@angular/core";

@Component({ selector: "chart-pie", templateUrl: "./pie.component.html" })
export class PieComponent {
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
}
