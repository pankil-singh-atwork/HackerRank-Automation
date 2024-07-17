const puppeteer = require("puppeteer");
const loginLink = "https://www.hackerrank.com/auth/login";
const email = "xoseh66934@tiervio.com";
const password = "225@Hacker";
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
  });
