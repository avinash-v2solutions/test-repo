import { PlaywrightTestConfig } from '@playwright/test';

const config : PlaywrightTestConfig = {
  testMatch : ["DemoProject.test.ts"],

  retries:3,

  use : {
    //baseURL:"https://ecommerce-playground.lambdatest.io",
    headless : false,
    screenshot :"on",
    video:"on"

  },

  reporter :[["dot"],["line"],["allure-playwright",{
    outputFolder:"allure-reports"
  }],["json",{ 
    outputFile : "jsonreports/jsonreport.json"
}],
    ["html",{
      open: "always"
    }
    ]
    
  ],
};


export default config;
