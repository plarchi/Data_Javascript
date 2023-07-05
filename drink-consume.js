function DrinkConsume() {

  // Name for the visualisation to appear in the menu bar.
  this.name = 'Drink Consume';

  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = 'drink-consume';

  // Title to display above the plot.
  this.title = 'UK Drink Consume from 2001 to 2019 in age 30 to 40';

    //Legend
    this.drawLegend = function() {
    // Get the list of food labels.
    var foodLabels = this.data.getColumn("Food");

  // Calculate the position of the legend.
  var legendX = this.layout.rightMargin - 200;
  var legendY = this.layout.topMargin - 50;

  // Loop over each food label and draw a colored circle and text.
  for (var i = 0; i < foodLabels.length; i++) {
    fill(this.colors[i]);
    noStroke();
    ellipse(legendX, legendY + i * 20, 10, 10);
    textAlign(LEFT, CENTER);
    fill(0);
    text(foodLabels[i], legendX + 20, legendY + i * 20);
  }
};
    // Names for each axis.
  this.xAxisLabel = 'YEAR';
  this.yAxisLabel = 'ml';
    
    this.colors = [];

  var marginSize = 40;
    
  // Layout object to store all common plot layout parameters and
  // methods.
  this.layout = {
    marginSize: marginSize,

    // Locations of margin positions. Left and bottom have double margin
    // size due to axis and tick labels.
    leftMargin: marginSize * 2,
    rightMargin: width - marginSize,
    topMargin: marginSize * 2,
    bottomMargin: height - marginSize * 2,
    pad: 4,

    plotWidth: function() {
      return this.rightMargin - this.leftMargin;
    },

    plotHeight: function() {
      return this.bottomMargin - this.topMargin;
    },

    // Boolean to enable/disable background grid.
    grid: true,

    // Number of axis tick labels to draw so that they are not drawn on
    // top of one another.
    numXTickLabels: 19,
    numYTickLabels: 10,
  };

  // Property to represent whether data has been loaded.
  this.loaded = false;

  // Preload the data. This function is called automatically by the
  // gallery when a visualisation is added.
  this.preload = function() {
    var self = this;
    this.data = loadTable(
      './data/drink/drink_consume_30to40.csv', 'csv', 'header',
      // Callback function to set the value
      // this.loaded to true.
        
      function(table) {
        self.loaded = true;
      });
  };

    this.setup = function() {
        // Font defaults.
        textSize(10);

        // Set min and max years: assumes data is sorted by date.
        this.startYear = 2001;
        this.endYear = 2019;

        // Define custom colors for each item
        this.colors = [
          color(255, 0, 0),      // Liquid wholemilk
          color(0, 255, 0),      // Skimmed milks
          color(0, 0, 255),      // Fully skimmed milk
          color(255, 255, 0),    // Soft drinks
          color(255, 0, 255)     // Soft drinks, low calorie
        ];

        // Find min and max pay gap for mapping to canvas height.
        this.minml = 0;
        this.maxml = 1000;
    };


  this.destroy = function() {
  };
    
    this.drawTitle = function() {
      fill(0);
      noStroke();
      textSize(20);
      textAlign(CENTER, CENTER);
      text(this.title,
           (this.layout.plotWidth() / 2) + this.layout.leftMargin,
           this.layout.topMargin - (this.layout.marginSize / 2));

      // Draw the legend.
      this.drawLegend();
    };

    this.draw = function() {
      if (!this.loaded) {
        console.log('Data not yet loaded');
        return;
      }
        background(230); //Light Grey Background
        
        //Draw Title
        this.drawTitle();
        
        //Draw Legend
        this.drawLegend();

      // Draw all y-axis labels.
      drawYAxisTickLabels(this.minml,
                          this.maxml,
                          this.layout,
                          this.mlToHeight.bind(this),
                          0);

      // Draw x and y axis.
      drawAxis(this.layout);

      // Draw x and y axis labels.
      drawAxisLabels(this.xAxisLabel,
                     this.yAxisLabel,
                     this.layout);

      // Plot all ml values between startYear and endYear using the width
      // of the canvas minus margins.
      var numYears = this.endYear - this.startYear + 1;

      // Loop over all rows and draw a line from the previous value to
      // the current.
      for (var i = 0; i < this.data.getRowCount(); i++) {
        var previous = null; // Initialize previous to null
        var row = this.data.getRow(i);
        var l = row.getString(0);

        for (var j = 1; j <= numYears; j++) {
          // Create an object to store data for the current year.
          var current = {
            // Convert strings to numbers.
            'year': this.startYear + j - 1,
            'ml': row.getNum(j)
          };

          if (previous != null) {
            // Draw line segment connecting previous year to current
            // year ml value.
            strokeWeight(2);
            stroke(this.colors[i]);
            line(this.mapYearToWidth(previous.year),
                 this.mlToHeight(previous.ml),
                 this.mapYearToWidth(current.year),
                 this.mlToHeight(current.ml));
          }

          // Draw circle markers at each data point.
          noStroke();
          fill(this.colors[i]);
          ellipse(this.mapYearToWidth(current.year),
                  this.mlToHeight(current.ml),
                  6, 6);

          // The number of x-axis labels to skip so that only
          // numXTickLabels are drawn.
          var xLabelSkip = ceil(numYears / this.layout.numXTickLabels);

          // Draw the tick label marking the start of the previous year.
          if (j % xLabelSkip == 0) {
            drawXAxisTickLabel(current.year, this.layout,
                               this.mapYearToWidth.bind(this));
          }

          // Assign current year to previous year so that it is available
          // during the next iteration of this loop to give us the start
          // position of the next line segment.
          previous = current;
        }
      }

      // Draw the legend.
      this.drawLegend();
    };


  this.mapYearToWidth = function(value) {
    return map(value,
               this.startYear,
               this.endYear,
               this.layout.leftMargin,   // Draw left-to-right from margin.
               this.layout.rightMargin);
  };

  this.mlToHeight = function(value) {
    return map(value,
               this.minml,
               this.maxml,
               this.layout.bottomMargin, // Smaller pay gap at bottom.
               this.layout.topMargin);   // Bigger pay gap at top.
  };
}
