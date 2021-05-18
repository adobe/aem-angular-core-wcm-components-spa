const fs = require('fs');
const path = require('path');

const generatedPackageJson = require('./dist/aem-angular-core-spa-wcm-components/package.json');

const sourcePackageJson = require('./projects/aem-angular-core-spa-wcm-components/package.json');

const destPath = path.join('projects', 'aem-angular-core-spa-wcm-components', 'package.json');

sourcePackageJson['version'] = generatedPackageJson['version'];

const data = JSON.stringify(sourcePackageJson,null, 4);
fs.writeFileSync(destPath,data,{encoding:'utf8',flag:'w'})