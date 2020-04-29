var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();


driver.manage().window().maximize();

(async function(){
    await driver.manage().setTimeouts( { implicit: 10000 } );
    await driver.get('http://localhost:3000/');

    //entering Start Date
    const sD = await driver.findElement(By.id('startDate'));
    sD.sendKeys('05/11/2015');

    //entering End Date
    const eD = await driver.findElement(By.id('endDate'));
    eD.sendKeys('08/17/2018');

    //entering Top Left Corner marker
    const map = await driver.findElement(By.id('map'));
    map.click();

    //Not entering Bottom Right Corner marker
    
    const submitButton = await driver.findElement(By.css('[type=submit]'));
    submitButton.click();

    let alert = (await driver).switchTo().alert(); 
    alert.accept(); 
    
    (await driver).sleep(10000).then(function(){
        driver.quit(); 
    });
}());