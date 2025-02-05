import { test , expect} from "@playwright/test"
import{ log } from "console"
import * as allure from "allure-js-commons"
import { request } from "https"
import { ClientRequest } from "http"


test(" GET Users", async ({request})=>{

   const response =  await request.get("https://reqres.in/api/users?page=2")
   console.log(await response.json())
   expect(response.status()).toBe(200)

})

test("POST Create User", async ({request})=>{

const response = await request.post("https://reqres.in/api/users",{
                                                   data:{
                                                           "name": "morpheus",
                                                            "job": "leader"
                                                       },
                                                   headers:{

                                                           "Accept": "application/json"
                                                         }
})

console.log(await response.json())

expect(response.status()).toBe(201)

var res =await response.json()
var userID = await res.id
console.log('Created User Id is : '+userID)

})


test ("PUT Update User", async({request})=>{

   const response = await request.put("https://reqres.in/api/users/2",{
        data:{
            "name": "morpheus Jhon",
             "job": "Engineer"
        },
    headers:{

            "Accept": "application/json"
          }

    })

    console.log(await response.json())

expect(response.status()).toBe(200)

var res =await response.json()
var update = await res.updatedAt
console.log('Updated the User : '+update)

})

test("DELETE User", async({request})=>{

   const  response = await request.delete("https://reqres.in/api/users/2")
   //console.log(await response.json())

   expect(response.status()).toBe(204)

   // Rest API Test 
   // Using TypeScript and Playwright 


})