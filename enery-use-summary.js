var currentVis;

function EnergyUseSummary() {

  // Name for the visualisation to appear in the menu bar.
  this.name = 'UK Energy Use Total Summary 2001 to 2021';

  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = 'energy-sum-2001-2021';

  // Property to represent whether data has been loaded.
  this.loaded = false;

  // Graph properties.
  this.pad = 100;
  this.dotSizeMin = 30;
  this.dotSizeMax = 100;

  // Preload the data. This function is called automatically by the
  // gallery when a visualisation is added.
  this.preload = function() {
    var self = this;
    this.data = loadTable(
      './data/energy/Inland-energy-comsumption-2001-to-2021.csv', 'csv', 'header',
      // Callback function to set the value
      // this.loaded to true.
      function(table) {
        self.loaded = true;
      });
  };
     
    this.setup = function() {
    currentVis = this;};

    // Add a property to store the colors of the ellipses
    this.ellipseColors = [];

    // Add a property to store the click state of the ellipses
    this.ellipseClicked = [];

    // Add a property to store the original colors of the ellipses
    this.originalColors = [];
    
  this.destroy = function() {};

    this.draw = function() {
      if (!this.loaded) {
        console.log('Data not yet loaded');
        return;
      }
        background(230); //Light Grey Background
      // Add the title on top of the graph
      textSize(20);
      textFont('Arial');
      fill(0);
      textAlign(CENTER, TOP);
      text(this.name, width / 2, 10);

      // Draw the axes.
      this.addAxes();

      // Get data from the table object.
      var totalResource = this.data.getColumn('Total');
      var energyType = this.data.getColumn('Energy Type');

      // Set ranges for axes.
      var totalMin = 0;
      var totalMax = 1800;

      // Check if data is not null or undefined before sorting rows.
      if (this.data) {
        this.data.rows.sort((a, b) => a.getNum('Total') - b.getNum('Total'));
      }

      // Initialize a counter for the hue of the fill color.
      var hue = 100;

      // Loop through the rows in the data and draw ellipses with different colors.
      this.data.rows.forEach(function(row, index) {
        // Store the original color if it doesn't exist
        if (!this.originalColors[index]) {
          this.originalColors[index] = color('hsb(' + hue + ', 70%, 70%)');
        }

        // Check if there is a stored color for this ellipse, otherwise use the original color
        var fillColor = this.ellipseColors[index] ? color(red(this.ellipseColors[index]), green(this.ellipseColors[index]), blue(this.ellipseColors[index]), 229) : this.originalColors[index];
        fill(fillColor);

        // Draw an ellipse for each point.
        var ellipseSize = map(row.getNum('Total'), totalMin, totalMax, this.dotSizeMin, this.dotSizeMax) * 1.8; // Increase the size of the ellipses
        var ellipseX = map(row.getNum('Total'), totalMin, totalMax, this.pad, width - this.pad);
        var ellipseY = map(index, 0, this.data.getRowCount() - 1, height - this.pad, this.pad);
        ellipse(ellipseX, ellipseY, ellipseSize, ellipseSize);

        // Add label for the ellipse.
        textAlign(CENTER, CENTER); // Center the text within the ellipse
        noStroke();
        fill(0);
        textSize(15);
        textFont('Arial');
        text(energyType[index], ellipseX, ellipseY);

        // Display the number of energy on the bottom right of the graph if the ellipse is clicked
        if (this.ellipseClicked[index]) {
          textAlign(RIGHT, BOTTOM);
          textSize(20);
          text(row.getNum('Total'), width - this.pad, height - this.pad);

          // Save the text and position to display after the mouse button is released
          this.displayedText = row.getNum('Total');
          this.displayedTextX = width - this.pad;
          this.displayedTextY = height - this.pad;
        }

        // Increment the hue counter.
        hue += 360 / this.data.getRowCount();
      }, this);

      // Display the number of energy on the bottom right of the graph if the ellipse is no longer clicked
      if (this.displayedText !== undefined && !this.ellipseClicked.includes(true)) {
        textAlign(RIGHT, BOTTOM);
        textSize(20);
        text(this.displayedText, this.displayedTextX, this.displayedTextY);
      }
    };
    
  this.addAxes = function () {
    stroke(200);

    // Add vertical line.
    line(width / 2,
         0 + this.pad,
         width / 2,
         height - this.pad);

    // Add horizontal line.
    line(0 + this.pad,
         height / 2,
         width - this.pad,
         height / 2);
  };
    
    this.mousePressed = function () {
      this.data.rows.forEach(function (row, index) {
        // Calculate the position and size of the ellipse
        var ellipseSize = map(row.getNum('Total'), 0, 1800, this.dotSizeMin, this.dotSizeMax);
        var ellipseX = map(row.getNum('Total'), 0, 1800, this.pad, width - this.pad);
        var ellipseY = map(index, 0, this.data.getRowCount() - 1, height - this.pad, this.pad);

        // Check if the mouse click is within the bounds of the ellipse
        if (dist(mouseX, mouseY, ellipseX, ellipseY) < ellipseSize / 2) {
          // Change the ellipse color
          this.ellipseColors[index] = color(random(0, 255), random(0, 255), random(0, 255));
          this.ellipseClicked[index] = true;
        }
      }, this);
    };

    // Add a mouseReleased function to revert the ellipse color
    this.mouseReleased = function () {
      this.data.rows.forEach(function (row, index) {
        if (this.ellipseClicked[index]) {
          // Revert the ellipse color to the original color
          this.ellipseColors[index] = this.originalColors[index];
          this.ellipseClicked[index] = false;
        }
      }, this);
    };
}

// Add a global mousePressed function
function mousePressed() {
  if (currentVis && currentVis.mousePressed) {
    currentVis.mousePressed();
  }
}

// Add a global mouseReleased function
function mouseReleased() {
  if (currentVis && currentVis.mouseReleased) {
    currentVis.mouseReleased();
  }
}