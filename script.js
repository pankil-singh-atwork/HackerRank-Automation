const puppeteer = require("puppeteer");
const loginLink = "https://www.hackerrank.com/auth/login";
const email = "xoseh66934@tiervio.com";
const password = "225@Hacker";

// defining a fn. to wait for the selector to appear on the page

const waitAndClick = (selector, cpage) => {
  return new Promise((resolve, reject) => {
    const waitForModelPromise = cpage.waitForSelector(selector);
    waitForModelPromise
      .then(() => {
        const clickModal = cpage.click(selector);
        return clickModal;
      })
      .then(() => resolve("Selector Elemet Found"))
      .catch((err) => reject("Selector Not Found"));
  });
};
// defining a set timeout fn.
const waitForTimeout = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

let browserOpen = puppeteer.launch({
  headless: false,
  args: ["--start-maximized"],
  defaultViewport: null,
});
let page;
browserOpen
  .then((browserObj) => {
    let browserOpenPromise = browserObj.newPage();
    return browserOpenPromise;
  })
  .then((newTab) => {
    page = newTab;
    const hackerRankOpenPromise = newTab.goto(loginLink);
    return hackerRankOpenPromise;
  })
  .then(() => {
    const emailIdEntered = page.type("input[type='text']", email, {
      delay: 50,
    });
    return emailIdEntered;
  })
  .then(() => {
    const passwordEntered = page.type("input[type='password']", password, {
      delay: 50,
    });
    return passwordEntered;
  })
  .then(() => {
    const userLoggedin = page.click("button[data-hr-focus-item='private']", {
      delay: 50,
    });
    return userLoggedin;
  })
  .then(() => {
    const algoSection = waitAndClick(".topic-name", page);
    return algoSection;
  })
  .then(() => {
    const waitfor3sec = waitForTimeout(3000);
    return waitfor3sec;
  })
  .then(() => {
    const gotoWarmUp = waitAndClick("input[value='warmup']", page);
    return gotoWarmUp;
  })
  .then(() => {
    const waitfor3sec = waitForTimeout(3000);
    return waitfor3sec;
  });
