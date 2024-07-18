const puppeteer = require("puppeteer");
const codeObj = require("./codes");
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
// defining a question solver fn.
const questionSolver = (page, question, answer) => {
  return new Promise((resolve, reject) => {
    let questionisClicked = question.click();
    questionisClicked
      .then(() => {
        let editorinFocus = waitAndClick(
          ".monaco-editor.no-user-select.vs",
          page
        );
        return editorinFocus;
      })
      .then(() => {
        waitAndClick(".checkbox-input", page);
      })
      .then(() => {
        return page.waitForSelector("textarea.custominput", page);
      })
      .then(() => {
        return page.type("textarea.custominput", answer, { delay: 10 });
      })
      .then(() => {
        return page.keyboard.down("Control");
      })
      .then(() => {
        return page.keyboard.press("A", { delay: 100 });
      })
      .then(() => {
        page.keyboard.press("X", { delay: 100 });
      })
      .then(() => {
        return page.keyboard.up("Control");
      })
      .then(() => {
        const editorInfocus = waitAndClick(
          ".monaco-editor.no-user-select.vs",
          page
        );
        return editorInfocus;
      })
      .then(() => {
        return page.keyboard.down("Control");
      })
      .then(() => {
        return page.keyboard.press("A", { delay: 100 });
      })
      .then(() => {
        page.keyboard.press("V", { delay: 100 });
      })
      .then(() => {
        return page.keyboard.up("Control");
      })
      .then(() => {
        return page.click("button.hr-monaco-submit", { delay: 3000 });
      })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject();
      });
  });
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
  })
  .then(() => {
    const questionsArray = page.$$(
      ".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled"
    );
    return questionsArray;
  })
  .then((quesArr) => {
    console.log("No of Questons is : ", quesArr.length);
    const questionWillBeSolved = questionSolver(
      page,
      quesArr[1],
      codeObj.answers[1]
    );
    return questionWillBeSolved;
  });
