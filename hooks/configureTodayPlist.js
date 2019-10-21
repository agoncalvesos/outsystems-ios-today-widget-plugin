var fs = require('fs');
var path = require('path');
var plist = require('plist');
var Config = require("./config");
var { getCordovaParameter } = require('./utils')

  
module.exports = function (context) {

    var contents = fs.readFileSync(
        path.join(context.opts.projectRoot, 'config.xml'),
        'utf-8'
    );

    var iosFolder = context.opts.cordova.project
    ? context.opts.cordova.project.root
    : path.join(context.opts.projectRoot, 'platforms/ios/');

    var widgetName = Config.WIDGET_NAME;
    var todayPlistPath = path.join(iosFolder, widgetName, widgetName + '-Info.plist');

    var xml = fs.readFileSync(todayPlistPath, 'utf8');
    var obj = plist.parse(xml);

    obj.WebViewUrl =  getCordovaParameter("WEBVIEW_URL",contents);

    xml = plist.build(obj);
    fs.writeFileSync(todayPlistPath, xml, { encoding: 'utf8' });
}

