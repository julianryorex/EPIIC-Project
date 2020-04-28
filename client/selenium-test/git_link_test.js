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
    await driver.get('https://epiic-center.herokuapp.com/');

    const errorLink = await driver.findElement(By.linkText('About'));
    errorLink.click();
    await delay(5000); 

    const gitLink = await driver.findElement(By.linkText('Github Repository'));
    gitLink.click();
    
    (await driver).sleep(10000).then(function(){
        driver.quit(); 
    });
}());