## Data visualisation by Javascript

### Assignment of Data Visulisation (UoL Intro of Programming II)

This is a Data Visualization assignment developed by Javascript P5 (Bracket), the Data Set is downloaded from the UK Government. It aimed to develop a web dashboard by Javascript with an existing temple, the bottom four selection is created by myself.

#### Drink Consume Data in CSV Format
![Drink_Consume_csv](https://user-images.githubusercontent.com/97387572/252401811-0d0f7c9f-291f-4bc5-a391-f85ae1f4d3f9.jpg)

The DataSet contained different kind of drink consumption from 2001 to 2019, I tried to represent it in two different format - Scatter and Line Graph.

#### Drink Scatter Visulaization

1. Look up the original code in [drink-scatter.js](https://github.com/plarchi/Data_Javascript/blob/main/drink-scatter.js).

2. The visual representation is under `this.draw` function. With background colour and fixed ellipse size in different colour, the graph shows the different kind of product consume from 2001 to 2019 with ML units.
![Drinkscatter](https://user-images.githubusercontent.com/97387572/252401602-5fac5ecf-6a52-450a-8f60-2d86e94cc5b5.JPG)

#### Drink Consume

By using the same dataset from the Drink Consume, another Line Graph Format is created. The original code can be found in [drink-consume.js](https://github.com/plarchi/Data_Javascript/blob/main/drink-consume.js)
`this.layout` draw the grid of the graph, `this.layout` defined the colour of the each item & `this.draw` function to draw the line with points to indicate the change of number in each year.
![Drinkconsume](https://user-images.githubusercontent.com/97387572/252401185-ec9ad84c-e79c-4139-b9e0-928c2d8a57ac.JPG)

#### Energy Use Summary 2001 to 2021

![Energyusesummary](https://user-images.githubusercontent.com/97387572/252401811-0d0f7c9f-291f-4bc5-a391-f85ae1f4d3f9.jpg)

Different Energy source has be recorded in the dataset in CSV format, I use Bar Char Graph and Bubble Graph to illustrate the total use of energy source from 2001 to 2021

#### UK Energy Use Summary in Bar Chart
Bar Chart has been defined with transparancy of each year with total number show on the right for each item. The code of the Bar Chart is here - [energy-use-all.js](https://github.com/plarchi/Data_Javascript/blob/main/enery-use-all.js)
![Energyusebarchart](https://user-images.githubusercontent.com/97387572/252401955-beb17d05-4b86-4dbd-8672-6126bd5da7c0.JPG)

#### UK Energy Use Summary in Bubble Graph
By using the same dataset of the Energy Use Summary 2001 to 2021, I have created another Bubble Graph to summarize the total number of each energy source by defining it in XY Axis.
The code of the Bubble Chart is here -  [energy-use-summary.js](https://github.com/plarchi/Data_Javascript/blob/main/enery-use-all.js)
![Energyusebubble](https://user-images.githubusercontent.com/97387572/252402043-f2392386-01ae-4915-9b37-54cf907f1327.JPG)

You can view and change the color of the ellipse by clicking the ellipse on the graph:
![Energyusebubbleclick](https://user-images.githubusercontent.com/97387572/252402229-068b6cf8-f073-443b-b02e-d701d413c620.JPG)
