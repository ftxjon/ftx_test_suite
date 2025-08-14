// This is a standalone test 

const {remote} = require('webdriverio');
const find = require('appium-flutter-finder');

// const appPath = "./apk/app-x86_64-dev-release.apk";
// const appPath = "./apk/app-x86_64-dev-release.apk";
// let testApp = true;

let testApp = false;

let appPath = "C:\\DocCode\\Tests\\apk\\app-dev-debug.apk";
let appPackage = "com.goftx.ftxposlite";
let appActivity = "com.goftx.ftxposlite.MainActivity";


if(testApp) {
  appPath = "C:\\DocCode\\Tests\\apk\\app-debug.apk";
  appPackage = "com.goftx.flutter_appium_test";
  appActivity = "com.goftx.flutter_appium_test.MainActivity";
}


const capabilities = {
  "appium:app": appPath,  
  "appium:platformName": "Android",
  "appium:automationName": "Flutter",
  "appium:deviceName": "emulator-5554",
  "appium:noReset": false,
  "appium:fullReset": true,
  'appium:appPackage': appPackage,
  'appium:appActivity': appActivity
};
/*
const capabilities = {
  "appium:platformName": "Android",
  "appium:automationName": "Flutter",
  "appium:deviceName": "emulator-5554",
  "appium:noReset": true,
  "appium:fullReset": false,
  'appium:appPackage': 'com.goftx.ftxposlite',
  'appium:appActivity': 'com.goftx.ftxposlite.MainActivity'
};
*/


  
const wdOpts = {
  hostname: process.env.APPIUM_HOST || '127.0.0.1',
  port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
  logLevel: 'debug',
  capabilities,
};

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runTest() {

  console.log("Getting Driver... ");
  const driver = await remote(wdOpts);
  console.log("Got Driver");
  try {

    // const tree = await driver.execute('flutter:getRenderTree');
    const company_code_finder = find.byValueKey('licensing_register_company_code_field');
    const company_secret_finder = find.byValueKey('licensing_register_company_secret_field');
    const submit_finder = find.byValueKey('licensing_register_submit_button');

    console.log("checking health");
    await driver.execute('flutter:checkHealth');

    await driver.pause(2000);

    console.log("Waiting for company code field...");
    await driver.execute('flutter:waitFor', company_code_finder);
    
    await driver.execute('flutter:getWidgetDiagnostics', company_code_finder);
    await driver.pause(200);
    
    await driver.execute('flutter:waitFor', company_code_finder);
    await driver.execute('flutter:scrollIntoView', company_code_finder, { alignment: 0.1 });

    await driver.elementClick(company_code_finder);
    
    await driver.pause(200);

    await driver.execute('flutter:enterText', '63717');

    await driver.pause(200);

    await driver.elementClick(company_secret_finder);
    
    await driver.pause(200);

    await driver.execute('flutter:enterText', '498720');


    await driver.execute('flutter:waitFor', submit_finder);
    await driver.execute('flutter:scrollIntoView', submit_finder, { alignment: 0.1 });
    await driver.execute('flutter:getWidgetDiagnostics', submit_finder);
    driver.elementClick(submit_finder);

    console.log("Button clicked!");
    /*
    const diag = await driver.execute('flutter:getWidgetDiagnostics', company_code_finder);

    console.log(JSON.stringify(diag, null, 2));

    if (JSON.stringify(diag).includes('"hasFocus": true')) {
      console.log('✅ Field is focused');
    } else {
      console.log('❌ Field is NOT focused');
    }

    */

    // await driver.elementSendKeys(find.byValueKey('company_code_field'), '12345');
    // console.log("Wrote to company code field.");
    
  } catch (e) {
    console.error(e);
  }
  /*
  console.log("Waiting for app to load");
  await driver.pause(5000);
  console.log("App Hopefully Loaded");
  try {
    console.log(fields.length);
    console.log("Waiting for company code field...");
    // let cc_field = await driver.find_element(AppiumBy.ACCESSIBILITY_ID, "company_code_field");
    await driver.execute('flutter:waitFor', {
        finderType: 'ByValueKey',
        keyValueString: 'company_code_field',
    });

    console.log("Writing to company code field...");

    await driver.execute('flutter:enterText', {
        finderType: 'ByValueKey',
        keyValueString: 'company_code_field',
        text: 'testuser',
    });

    // console.log("cc_field: " + cc_field.isDisplayed());
    // console.log("cc_field_2" + cc_field_2.isDisplayed());
    cc_field.setValue("123456");
  } finally {
    await driver.pause(60000);
    await driver.deleteSession();
  }
    */
}

const byValueKey = (k) => ({
  finderType: 'ByValueKey',
  keyValueString: k,
  isSerialized: true
});

runTest().catch(console.error);