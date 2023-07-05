function DrinkConsumeScatter() {
    
    //Name of the vis
    this.name = 'Drink Consume Scatter';
    
    //Unique ID
    this.id = 'scatterdrink-2001-2019';
    
    //Load Data preset to false
    this.loaded = false;
    
    // Title to display above the plot.
    this.title = 'UK Drink Consume from 2001 to 2019 in Scatter Format';

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
    // Setup function for initializing the visualisation.
  this.setup = function() {
    // You can put any necessary code to initialize the visualisation here.
  };

    // Draw function for rendering the visualisation.
    this.draw = function() {
      if (!this.loaded) {
        console.log('Data not yet loaded');
        return;
      }

      background(230);
      textSize(20);
    // Set the title color to black
      fill(0); 
      textAlign(CENTER); // Align the title to the center
      text(this.title, width / 2, 30);
      textAlign(LEFT); // Reset the text alignment

      let xPadding = 80;
      let yPadding = 60;

      let xMin = 0;
      let xMax = 1000;
      let yMin = 0;
      let yMax = 1000;
        
    // Add transparency 80% on Ellipse
      let colors = [
        color(255, 0, 0, 85),
        color(0, 255, 0, 85),
        color(0, 0, 255, 85),
        color(255, 255, 0, 85),
        color(255, 0, 255, 85),
      ];

      textSize(14);
      for (let i = xMin; i <= xMax; i += 100) {
        let x = map(i, xMin, xMax, xPadding, width - xPadding);
        text(i, x, height - yPadding / 2);
      }

      for (let i = yMin; i <= yMax; i += 100) {
        let y = map(i, yMin, yMax, height - yPadding, yPadding);
        text(i, xPadding / 2, y);
      }

      for (let row = 0; row < this.data.getRowCount(); row++) {
        for (let col = 1; col <= 10; col++) {
          let x = map(this.data.getNum(row, col), xMin, xMax, xPadding, width - xPadding);
          let y = map(this.data.getNum(row, col), yMin, yMax, height - yPadding, yPadding);

          fill(colors[row % colors.length]);
          ellipse(x, y, 18, 18);
        }
        // Legend with ellipse
        fill(colors[row % colors.length]);
        ellipse(width - xPadding - 850, yPadding + row * 20 - 5, 18, 18);
        fill(0);
        text(this.data.getString(row, 0), width - xPadding - 830, yPadding + row * 20);
      }

      textSize(14);
      text('ML', width / 2, height - yPadding / 4);
      push();
      translate(xPadding / 4, height / 2);
      rotate(-HALF_PI);
      text('ML', 0, 0);
      pop();
    };

      // Destroy function for cleaning up when the visualisation is deselected.
      this.destroy = function() {
        // You can put any necessary code to clean up the visualisation here.
      };
}