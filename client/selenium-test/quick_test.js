var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();


driver.manage().window().maximize();

(async function(){
    await driver.manage().setTimeouts( { implicit: 10000 } );
    await driver.get('https://epiic-center.herokuapp.com/');

//entering Start Date
    const sD = await driver.findElement(By.id('startDate'));
    sD.sendKeys('05/11/2015');

//entering End Date
    const eD = await driver.findElement(By.id('endDate'));
    eD.sendKeys('08/17/2018');

//entering Top Left Corner
//driver.findElement(By.id('map')).click();
    const map = await driver.findElement(By.id('map'));
    map.click();
//map.sendKeys('plus'); 
//driver.moveToElement(map, 20, 25).perform(); 
//map.sendKeys(webdriver.Key.chord(webdriver.Key.CONTROL, webdriver.Key.ADD));

}());