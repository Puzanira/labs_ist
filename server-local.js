'use strict';

const app = require('./app.js');

app.listen(process.env.PORT || 3000, () => console.log('Local app listening on port 3000!'));
