import { test, expect } from "@playwright/test";

//CREATE user
test("create a user", async ({ request }) => {
  let uniqueEmail = `test.email.${Date.now()}@gmail.com`;
  const postResponse = await request.post(`https://reqres.in/api/users`, {
    data: {
      name: "morpheus",
      job: "black",
      email: `${uniqueEmail}`,
    },
  });

  const postResponseJson = await postResponse.json();
  console.log("POST Response:", postResponseJson);

  expect(postResponse.status()).toBe(201);
  expect(postResponseJson["name"]).toBe("morpheus");
  expect(postResponseJson).toHaveProperty("job", "black");
  expect(postResponseJson["email"]).toBeDefined();
});

//register user
test("register a user", async ({ request }) => {
  const postResponse = await request.post(`https://reqres.in/api/register`, {
    data: {
      email: "eve.holt@reqres.in",
      password: "pistol",
    },
  });

  const postResponseJson = await postResponse.json();
  expect(postResponse.status()).toBe(200);
  //console.log("TOKEN:" + postResponseJson["token"]);
});

//register user - invalid
test("registration unsuccesfull", async ({ request }) => {
  const postResponse = await request.post(`https://reqres.in/api/register`, {
    data: {
      email: "eve.holt@reqres.in",
    },
  });

  const postResponseJson = await postResponse.json();
  expect(postResponse.status()).toBe(400);
});

//get users
test("get list of users", async ({ request }) => {
  const getResponse = await request.get(`https://reqres.in/api/users?page=2`);
  expect(getResponse.ok()).toBeTruthy();
  const responseJson = await getResponse.json();

  expect(responseJson["data"].length).toBe(6);
});

test("get single user", async ({ request }) => {
  const requestGet = await request.get(`https://reqres.in/api/users/2`);

  //console.log(await requestGet.json());
});

test("incorrect user", async ({ request }) => {
  const requestGet = await request.get(`https://reqres.in/api/users/342`);

  const postResponseJson = await requestGet.json();
  expect(requestGet.status()).toBe(404);
});
