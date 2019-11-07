# Cordova Plugin for adding a Today Widget to an existing OutSystems Project dynamically

This plugin allows any OutSystems Mobile application to have a TodayExtension on iOS. It extends the existing xcode project by parsing and modifying the project.pbxproj file (and others) using [cordova-node-xcode](https://github.com/apache/cordova-node-xcode).
It uses a webview, inside the native extension, that uses the WEBVIEW_URL passed as an input parameter.
This plugin was based on the excelent work of Triggi. The original work can be found here https://github.com/Triggi/cordova-plugin-today-widget.git

## DEMO

![Demo](demo/demo.gif)

## Usage

### 1. Create the provisioning profiles
* You'll need access to an Apple Developer Account to create the needed provisioning profiles.
1. Create the Application provisioning profile: 
   * Using the bundle identifier from your application (that you can get from Service Studio), create the provisioning profile for the Application
   * Enable the `App Groups` entitlement and name your group: `group.<Bundle-ID of your host app>` 
   * One for the Application and the other for the Extension and they need to be in the same group.
  
2. Enable the `App Groups` entitlement and name your group: `group.<Bundle-ID of your host app>` (you can use the group to share NSUserDefaults between the Widget and the main App). _Note that you have to add this to your provisioning profile_

### 2. Install the plugin in an OutSystems application

* Use OutSystems forge to download and install the component.
* Open the component module in OutSystems Studio and go to the Extensibility Configurations and configure the component variables

| Variable | Example | Description |
|-|-|-|
|WEBVIEW_URL| https://outsystems.com | URL to be opened in the extension webview. Refer to the TodayExtensionWebview on the forge |
|PRODUCT_BUNDLE_IDENTIFIER| com.company.app | Bundle ID of the main app |
|PROVISIONING_PROFILES| "{'com.outsystems.experts.todaysample.extension':'bce89fc6-7c62-4202-a305-2f9b59b219ef'}" | JSON dictionary of extension bundleId and provisioning profile UUID |
|DEVELOPMENT_TEAM| EVSDF8DD | The team ID present in the provisioning profiles |
|WIDGET_TITLE| Today Extension Sample | The title of the today extension |

### 3. Add resource file with the provisioning profile

* After having the provisioning profiles created and configured we need to add the extension provisioning profile as a resource of our application. To do that:

    1. Open the extension provisioning profile in a text edit and copy the uuid. 
    2. Rename the provisioning profile to <uuid>.mobileprovision
    3. Zip the file and rename the zip to provisioning-profiles.zip
    4. Add the zip file to the TodayExtensionPlugin as a resource file and change the Deploy Action to "Deploy to Target Directory"

### 4. Reference the TodayExtesionPlugin in your application
* This is the last step to have this component working on your application. Just reference the TodayExtensionPlugin in your app and call the CheckTodayExtensionPlugin action. 

## Troubleshooting
While using this component you might run into some issues. Please check the build log available in Service Center to have more details of the error. If you can't find the issue in the log, this troubleshoot might help:
* App groups configured?
  * Make sure that you have created an app group in itunes connect and that both provisioning profiles are in the same group
* Resource file has Deploy to target directory?
  * Make sure that the provisioning-profiles.zip has the Deploy Action set to "Deploy to Target Directory". 
  * Make sure that there are no typos and that the zip is in the main application and not the component application.
* Provisioning profile inside the provisioning-profile resource file has the same name as the uuid of the provisioning profile?
  * The file inside the zip should have the uuid of the provisioning profile as the name. 


## Infos
* This component will only work in iOS 11+ versions because it uses WKWebView.
* Working without any issues with MABS 5.0 and MABS 6.0 beta

## TODO 
* Extend this functionality to apple watches
* Simplify the setup process, by getting more information from the provisioning profiles, avoiding the need o send information like the DEVELOPMENT_TEAM