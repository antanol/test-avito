var path = require('path');

module.exports = {
  entry: './src/scripts/main.js',
  output: {
    path: path.resolve(__dirname, 'src/dist'),
    filename: 'bundle.js'
  }
};