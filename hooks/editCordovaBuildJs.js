
var fs = require('fs');
var path = require('path');

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

module.exports = function(context) {
    
    var iosFolder = context.opts.cordova.project
    ? context.opts.cordova.project.root
    : path.join(context.opts.projectRoot, 'platforms/ios/');

    var buildJsPath = path.join(
        iosFolder,
        'cordova/lib',
        'build.js'
    )

    var toAppendString = "[ 'com.outsystems.experts.todaysample.extension' ]: String('da9e5a1c-8073-4c0a-8f84-fcd0c2bec726')";
    var toReplace = "[ bundleIdentifier ]: String(buildOpts.provisioningProfile)";
    var regexp = new RegExp(escapeRegExp(toReplace), 'g');
    var plistContents = fs.readFileSync(buildJsPath, 'utf8');
    plistContents = plistContents.replace(regexp, toReplace + "," + toAppendString);
    fs.writeFileSync(buildJsPath, plistContents);
}
