import { test, expect} from "@playwright/test"
import { log } from "console"
import * as allure from "allure-playwright"
import { Route, Request, Response } from 'playwright';

test("Mock a Network request", async({page})=>{


  // Intercept the network request
  await page.route('https://reqres.in/api/users/2', (route: Route, request: Request) => {
    // Mock a failed API response (e.g., 500 Internal Server Error)
    route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Internal Server Error' }),
    
    })

})
  

  // Visit the page
  await page.goto('https://reqres.in/api/users/2'); // Replace with your target page

  // Validate API response
  page.on('response', async (response: Response) => {
    if (response.url().includes('https://reqres.in/api/users/2')) {
      const responseBody = await response.json();
      if (response.status() !== 200) {
        console.log('API request failed. Status:', response.status());
        console.log('Error Message:', responseBody.error);
      }
    }
}
)

  // Example of chaining API data into UI action
  page.on('load', async () => {
    // Assume you perform an action based on the API failure (like showing an error message)
    const errorMessage = await page.$('.error-message'); // Replace with actual selector
    if (errorMessage) {
      console.log('Error displayed on UI:', await errorMessage.innerText());
    } else {
      console.log('No error message shown.');
    }
  });

  // Wait for a bit before closing the browser to see results


// Run the script
// run().catch((error) => {
//   console.error('Error during execution:', error);
// })

  })

