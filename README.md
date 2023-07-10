## Data visualisation by Javascript

### Assignment of Data Visulisation (UoL Intro of Programming)

This is a Data Visualization assignment developed by Javascript P5 (Bracket), the Data Set is downloaded from the UK Government. It aimed to develop a web dashboard by Javascript with an existing temple, the bottom four selection is created by myself.

#### Drink Consume Data in CSV Format
![DrinkConsumeCSV](https://user-images.githubusercontent.com/97387572/252401034-39b93ace-40a7-410b-8d5d-73ee7cc7ceb1.jpg)

The DataSet contained different kind of drink consumption from 2001 to 2019, I tried to represent it in two different format - Scatter and Line Graph.

#### Drink Scatter Visulaization

1. Look up the original code in [drink-scatter.js](https://github.com/plarchi/Data_Javascript/blob/main/drink-scatter.js).

2. The visual representation is under `this.draw` function. With background colour and fixed ellipse size in different colour, the graph shows the different kind of product consume from 2001 to 2019.


#### Pay gap 1997–2017 [2 marks]

![paygap1997-2017](https://www.doc.gold.ac.uk/~jfort010/ip/case-studies/data-vis/figures/pay-gap-1997-2017.png)

Complete the visualisation defined in `pay-gap-1997-2017.js` to create
a line graph representing the pay gap between female and male
employees over time.

1. Look at the raw data:
   `./data/pay-gap/all-employees-hourly-pay-by-gender-1997-2017.csv`.

2. In the `for` loop in the `draw()` method extract the relevant data
   from each table row and store it in the `current` object.

3. Complete the `mapPayGapToHeight()` method. Look at how `mapYearToWidth()`
   works.
   - Check that the y-axis tick labels are drawn correctly.

4. Complete the `line()` function in the `draw()` method to plot the
   pay gap over time. You will need to use both `mapYearToWidth()` and
   `mapPayGapToHeight()` methods.

#### Climate change [2 marks]

![climateChange](https://www.doc.gold.ac.uk/~jfort010/ip/case-studies/data-vis/figures/climate-change.png)

Complete the visualisation defined in `climate-change.js` to create a
line graph with gradient fill background representing the change in
the Earth’s surface temperature.

1. Using the `mapTemperatureToColour()` method set the `fill()` in the
   `draw()` method. You need to pass the current temperature to this
   method to get the correct colour.

2. Complete the `rect()` function below the `fill()` to create a
   gradient effect background (rectangles spaced evenly across the
   x-axis – one rectangle per year). All of the values you need are
   already accessible within this visualisation object – you need to
   find them!
   - Hint: Look at the `mapYearToWidth()` method, the `layout` object,
     and the `segmentWidth` variable.

#### Tech diversity: Race [2 marks]

![tech-diversity-race](https://www.doc.gold.ac.uk/~jfort010/ip/case-studies/data-vis/figures/tech-diversity-race.png)

Complete the visualisation defined in `tech-diversity-race.js` to
create a pie chart to represent the racial diversity of prominent tech
companies.

1. Look at the raw data: `./data/tech-diversity/race-2018.csv`.

2. Create a select DOM element using p5.dom.js (see
   [`createSelect`](https://p5js.org/reference/#/p5/createSelect)) and
   populate the options *programmatically* using the company names
   obtained from the columns of `this.data`.
   - Hint: you need to write a `for` loop.

3. Change the hard-coded company name to instead get the value from
   the select.

4. Test that when selecting a company name from the list the correct
   data is visualised on the canvas and the correct title is
   generated.

#### Pay gap by job 2017 [2 marks]

![paygapByJob2017](https://www.doc.gold.ac.uk/~jfort010/ip/case-studies/data-vis/figures/pay-gap-by-job.png)

Complete the visualisation defined in `pay-gap-by-job-2017.js` to
create a scatter plot representing the difference in pay for men and
women across different jobs.

In the `draw()` method complete the `for` loop that draws all of the
data points on the canvas as ellipses with the following properties.

    - x = proportion of female employees
    - y = pay gap
    - size = number of jobs

Hint: You will need to use `map()`.
