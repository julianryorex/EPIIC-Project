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

    //not entering Start Date to get notification

    //entering End Date
    const eD = await driver.findElement(By.id('endDate'));
    eD.sendKeys('08/17/2018');

    //entering Top Left Corner marker
    const map = await driver.findElement(By.id('map'));
    map.click();

    //these next two lines create the second marker, although they don't make sense
    //changing anything but the numbers will make the second marker not appear
    //Having issues moving the marker to a different spot than the first
    const map2 = await driver.findElement(By.id('map'), 57, 23).click();
    map.click(88, 100);

    
    const submitButton = await driver.findElement(By.css('[type=submit]'));
    submitButton.click();

    let alert = (await driver).switchTo().alert(); 
    alert.accept(); 
    
    (await driver).sleep(10000).then(function(){
        driver.quit(); 
    });
}());