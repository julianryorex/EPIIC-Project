var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

var delay = require('delay');


driver.manage().window().maximize();

(async function(){
    await driver.manage().setTimeouts( { implicit: 10000 } );
    await driver.get('http://localhost:3000/');

    const errorLink = await driver.findElement(By.linkText('Error'));
    errorLink.click();
    await delay(5000); 

    const rtrnHome = await driver.findElement(By.linkText('Return Home'));
    rtrnHome.click();
    
    (await driver).sleep(10000).then(function(){
        driver.quit(); 
    });
}());