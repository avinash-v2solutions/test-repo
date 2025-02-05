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

test(" GET Single User", async ({request})=>{

   const response =  await request.get("https://reqres.in/api/users/2")
   console.log(await response.json())
   expect(response.status()).toBe(200)

})

test(" GET Single User Not Found", async ({request})=>{

   const response =  await request.get("https://reqres.in/api/users/23")
   console.log(await response.json())
   expect(response.status()).toBe(404)

})

test(" GET List Resource", async ({request})=>{

   const response =  await request.get("https://reqres.in/api/unknown")
   console.log(await response.json())
   expect(response.status()).toBe(200)

})

test(" GET Single Resource", async ({request})=>{

   const response =  await request.get("https://reqres.in/api/unknown/2")
   console.log(await response.json())
   expect(response.status()).toBe(200)

})

test(" GET Sinle Resource Not Found", async ({request})=>{

   const response =  await request.get("https://reqres.in/api/unknown/23")
   console.log(await response.json())
   expect(response.status()).toBe(404)

})

test ("PATCH Update User", async({request})=>{

   const response = await request.put("https://reqres.in/api/users/2",{
        data:{
            
    "name": "morpheus",
    "job": "zion resident"
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

test("POST Register Successfull", async ({request})=>{

   const response = await request.post("https://reqres.in/api/register",{
                                                      data:{
                                                             "email": "eve.holt@reqres.in",
                                                              "password": "pistol"
                                                          },
                                                      headers:{
   
                                                              "Accept": "application/json"
                                                            }
   })
   
   console.log(await response.json())
   
   expect(response.status()).toBe(200)
   
   var res =await response.json()
   var userID = await res.id
   console.log('Created User Id is : '+userID)

   var token1 =await res.token
   console.log('Created User token is : '+ token1 )

})


test("POST Register unSuccessfull", async ({request})=>{

   const response = await request.post("https://reqres.in/api/register",{
                                                      data:{
                                                              "email": "sydney@fife"
                                                          },
                                                      headers:{
   
                                                              "Accept": "application/json"
                                                            }
   })
   
   console.log(await response.json())
   
   expect(response.status()).toBe(400)
   
   var res =await response.json()
   var error = await res.error
   console.log('Error Message is : '+error )

})

test("POST Login Successfull", async ({request})=>{

   const response = await request.post("https://reqres.in/api/login",{
                                                      data:{
                                                              "email": "eve.holt@reqres.in",
                                                              "password": "cityslicka"
                                                          },
                                                      headers:{
   
                                                              "Accept": "application/json"
                                                            }
   })
   
   console.log(await response.json())
   
   expect(response.status()).toBe(200)
   
   var res =await response.json()
   var token = await res.token
   console.log('Login Successfull : '+ token )

})

test("POST Login unSuccessfull", async ({request})=>{

   const response = await request.post("https://reqres.in/api/login",{
                                                      data:{
                                                         
                                                            "email": "peter@klaven"
                                                        
                                                          },
                                                      headers:{
   
                                                              "Accept": "application/json"
                                                            }
   })
   
   console.log(await response.json())
   
   expect(response.status()).toBe(400)
   
   var error =await response.json()
   console.log('Error message is : '+error )

})

test(" GET Delayed Response", async ({request})=>{

   const response =  await request.get("https://reqres.in/api/users?delay=3")
   console.log(await response.json())
   expect(response.status()).toBe(200)

})