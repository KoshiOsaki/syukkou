const puppeteer = require("puppeteer");

var addZero = function (value) {
  if (value < 10) {
    value = "0" + value;
  }else{
    value = String(value)
  }
  return value;
};

const today = new Date();
const todayHtml =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  await page.goto(
    "https://docs.google.com/forms/d/e/1FAIpQLSfRYv55AE2rHvq2weGuTTE9SbvLfkijDmxDYZh2h7QJiXm38A/viewform"
  );
  await page.waitForTimeout(3000);
  await page.click("#i53");
  await page.waitForTimeout(4000);
  await page.click("#i84");
  await page.waitForTimeout(4000);
  var xpath = `//span[text() = "次へ"]`;
  await page.waitForXPath(xpath);
  await (await page.$x(xpath))[0].click();
  await page.waitForTimeout(5000);
  await page.type("input[type='date']", todayHtml);

  var hours = today.getHours();
  await (hours = addZero(hours));
  var minutes = today.getMinutes();
  await (minutes = addZero(minutes));

  await page.type("input[type='number']:first-child", hours);
  await page.waitForTimeout(3000);
  await page.type("input[aria-label='分']", minutes);
  await page.waitForTimeout(4000);
  await page.click("#i14");
  await page.waitForTimeout(4000);
  var xpath = `//span[text() = "次へ"]`;
  await page.waitForXPath(xpath);
  await (await page.$x(xpath))[0].click();
  await page.waitForTimeout(5000);
  var xpath = `//span[text() = "送信"]`;
  await page.waitForXPath(xpath);
  await (await page.$x(xpath))[0].click();
  await page.waitForTimeout(4000);
  var item = await page.$(".vHW8K");
  var data = await (await item.getProperty("textContent")).jsonValue();
  if (data == "回答を記録しました。") {
    console.log("success!");
  } else {
    console.log("false...");
  }
  await browser.close();
})();
