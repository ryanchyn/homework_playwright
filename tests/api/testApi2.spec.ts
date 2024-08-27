import { test, expect } from "@playwright/test";
import { error, log } from "console";
import { request } from "http";

function getUniqueEmail() {
  let uniqueEmail = `test.email.${Date.now()}@gmail.com`;

  return uniqueEmail;
}

// Register user
test("register user", async ({ request }) => {
  const postResponse = await request.post(
    `https://thinking-tester-contact-list.herokuapp.com/users`,
    {
      data: {
        firstName: "morpheus",
        lastName: "black",
        email: `${getUniqueEmail()}`,
        password: "myPassword",
      },
    }
  );

  const responseJson = await postResponse.json();
  const accessToken = responseJson["token"];

  expect(postResponse.status()).toBe(201);
  expect(responseJson["user"]["_id"]).toBeDefined();
  expect(responseJson["token"]).toBeDefined();

  //console.log(accessToken);
});

test("register and get user", async ({ request }) => {
  const postResponse = await request.post(
    `https://thinking-tester-contact-list.herokuapp.com/users`,
    {
      data: {
        firstName: "morpheus",
        lastName: "black",
        email: `${getUniqueEmail()}`,
        password: "myPassword",
      },
    }
  );

  const postResponseJson = await postResponse.json();
  const accessToken = await postResponseJson["token"];
  const getIdPostReq = postResponseJson["user"]["_id"];

  const getResponse = await request.get(
    `https://thinking-tester-contact-list.herokuapp.com/users/me`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Use Bearer token
      },
    }
  );

  const getResponseJson = await getResponse.json();
  const getIdGetReq = getResponseJson["_id"];

  expect(getIdGetReq).toBe(getIdPostReq);
});
