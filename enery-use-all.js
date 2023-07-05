function EnergyUseall() {

  // Name for the visualisation to appear in the menu bar.
  this.name = 'UK Energy Use Summary 2001 to 2021';

  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = 'energy-all-2001-2021';

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
    currentVis = this;
    textSize(12); // Item Text 
    textAlign(LEFT, CENTER);
    noStroke();
  };

  this.destroy = function() {};

  this.draw = function() {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }
    background(230);

    // Draw title
    textSize(20); 
    fill(0);
    text(this.name, width / 2 - textWidth(this.name) / 2, this.pad / 2);
    textSize(12); 

    var barHeight = (height - 2 * this.pad) / this.data.getRowCount();
    var maxEnergy = 2000;

    for (var i = 0; i < this.data.getRowCount(); i++) {
      var row = this.data.getRow(i);
      var energyType = row.getString('Energy Type');

    // Draw energy type label
    fill(0);
    text(energyType, this.pad + textWidth('Bioenergy & waste') - textWidth(energyType) - 5, i * barHeight + this.pad + barHeight * 0.4);


      var x = this.pad + textWidth('Bioenergy & waste') + 20;
      var totalEnergy = 0; // Initialize variable to store total energy for each resource
      for (var j = 1; j < row.arr.length - 1; j++) {
        var energyValue = row.getNum(j);
        totalEnergy += energyValue;
        var barWidth = map(energyValue, 0, maxEnergy, 0, width - x - this.pad) * 20;
        // Calculate transparency based on the year (0% to 30%)
        var alpha = map(j, 1, row.arr.length - 2, 0, 30);

        // Set bar color based on energy type
        switch (energyType) {
          case 'Coal':
            fill(0, 0, 255, alpha);
            break;
          case 'Oil':
            fill(255, 0, 0, alpha);
            break;
          case 'Gas':
            fill(0, 255, 0, alpha);
            break;
          case 'Primary electricity':
            fill(255, 0, 255, alpha);
            break;
          case 'Bioenergy & waste':
            fill(0, 255, 255, alpha);
            break;
          default:
            fill(100, 100, 100, alpha);
        }
        var y = i * barHeight + this.pad;
        rect(x, y, barWidth, barHeight * 0.4);
          }
    }
        // Display the total summary for each energy type
        for (var i = 0; i < this.data.getRowCount(); i++) {
          var row = this.data.getRow(i);
          var totalEnergy = 0;
          for (var j = 1; j < row.arr.length - 1; j++) {
            totalEnergy += row.getNum(j);
          }
          fill(0);
          text(totalEnergy.toFixed(0), width - this.pad - textWidth(totalEnergy.toFixed(0)) + 30, i * barHeight + this.pad + barHeight * 0.4 / 2);
        }
        // Draw x-axis
        stroke(1);
        line(this.pad + textWidth('Bioenergy & waste') + 20, height - this.pad, width - this.pad, height - this.pad);
        for (var i = 0; i <= maxEnergy; i += 200) {
          var x = map(i, 0, maxEnergy, 0, width - 2 * this.pad - textWidth('Bioenergy & waste') - 20);
          line(x + this.pad + textWidth('Bioenergy & waste') + 20, height - this.pad, x + this.pad + textWidth('Bioenergy & waste') + 20, height - this.pad + 5);
          fill(0);
          text(i, x + this.pad + textWidth('Bioenergy & waste') + 15, height - this.pad + 20);
        }

        // Draw y-axis
        stroke(1);
        line(this.pad + textWidth('Bioenergy & waste') + 20, height - this.pad, this.pad + textWidth('Bioenergy & waste') + 20, this.pad);
    }
}