function EnergyUseSource() {

  // Name for the visualisation to appear in the menu bar.
  this.name = 'UK Energy Use Source 2001 to 2021';

  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = 'energy-use-source';

  // Property to represent whether data has been loaded.
  this.loaded = false;

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
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    // Create a select DOM element.
    this.select = createSelect();
    this.select.position(350, 40);

    // Fill the options with all Energy Resource names.
    var resource = this.data.columns;
    // First entry is empty.
    for (let i = 1; i < resource.length; i++) {
      this.select.option(resource[i]);
    }
  };

  this.destroy = function() {
    this.select.remove();
  };

  // Create a new pie chart object.
  this.pie = new PieChart(width / 2, height / 2, width * 0.4);

  this.draw = function() {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    // Get the value of the company we're interested in from the
    // select item.
    var companyName = this.select.value();

    // Get the column of raw data for companyName.
    var col = this.data.getColumn(companyName);

    // Convert all data strings to numbers.
    col = stringsToNumbers(col);

    // Copy the row labels from the table (the first item of each row).
    var labels = this.data.getColumn(0);

    // Colour to use for each category.
    var colours = ['rgb(128,128,128)', 'rgb(32,32,32)', 'rgb(153,204,255)', 'rgb(255,102,102)', 'rgb(255,51,51)'];

    // Make a title.
    var title = 'UK Inland Energy Resource Use ' + companyName;

    // Draw the pie chart!
    this.pie.draw(col, labels, colours, title);
  };
}
