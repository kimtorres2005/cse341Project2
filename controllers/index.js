const controller = {};

// Function to render the home page
controller.home = (req, res) => {
  // swagger.tags = ['Home'];
  res.send("Kimberly Torres: Project2, Recipe Management, for CSE 341");
};

module.exports = controller;