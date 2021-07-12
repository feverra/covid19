/**
 * ---------------------------------------
 * This demo was created using amCharts 4.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v4/
 * ---------------------------------------
 */

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
var chart = am4core.create("chartdiv", am4charts.XYChart);

axios.get('datas.json').then(response => {
  chart.data = response.data.result.records
  chart.data.shift()
  console.log(chart.data)
  createChart()
})

function createChart() {
  // Create axes
  var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

  function createSeries(field, name, txt) {
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = field;
    series.dataFields.dateX = "Date";
    series.name = name;
    series.tooltipText = txt;
    // series.tooltipText = "{dateX}: [b]{valueY}[/]";
    series.strokeWidth = 2;

    var bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.stroke = am4core.color("#fff");
    bullet.circle.strokeWidth = 2;

    // Drop-shaped tooltips
    series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.strokeOpacity = 0;
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.label.minWidth = 40;
    series.tooltip.label.minHeight = 40;
    series.tooltip.label.textAlign = "middle";
    series.tooltip.label.textValign = "middle";
    return series;
  }

  var series = createSeries("Total", "Series #1", 'ตรวจ {valueY} คน');
  var series2 = createSeries("Pos", "Series #2", 'ติด {valueY} คน');

  // Make bullets grow on hover
  // var bullet = series.bullets.push(new am4charts.CircleBullet());
  // bullet.circle.strokeWidth = 2;
  // bullet.circle.radius = 4;
  // bullet.circle.fill = am4core.color("#fff");

  // var bullethover = bullet.states.create("hover");
  // bullethover.properties.scale = 1.3;

  // Make a panning cursor
  chart.cursor = new am4charts.XYCursor();
  chart.cursor.behavior = "panXY";
  chart.cursor.xAxis = dateAxis;
  // chart.cursor.snapToSeries = series;

  // Create vertical scrollbar and place it before the value axis
  chart.scrollbarY = new am4core.Scrollbar();
  chart.scrollbarY.parent = chart.leftAxesContainer;
  chart.scrollbarY.toBack();

  // Create a horizontal scrollbar with previe and place it underneath the date axis
  chart.scrollbarX = new am4charts.XYChartScrollbar();
  chart.scrollbarX.series.push(series);
  chart.scrollbarX.series.push(series2);
  chart.scrollbarX.parent = chart.bottomAxesContainer;

  // dateAxis.start = 0.79;
  // dateAxis.keepSelection = true;
}
