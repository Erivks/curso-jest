const request   = require("supertest");
const app       = require("../src/app");

const MAIN_ROUTE = "/accounts";
let user;

beforeAll(async () => {
    const result = await app.services.user.save({ name: "Erick Oliveira", mail: `${Date.now()}@mail.com`, passwd: "123456" });
    user = { ...result[0] };
});

test("Deve inserir conta com sucesso", async () => {
    const accObj = { name: "ACC #1", user_id: user.id };

    const result = await request(app).post(MAIN_ROUTE)
        .send(accObj);
    
    expect(result.status).toBe(201);
    expect(result.body.name).toBe(accObj.name);
});

test("Deve listar todas as contas", async () => {
    const result = await request(app).get(MAIN_ROUTE);
    expect(result.body.length).toBeGreaterThanOrEqual(0);
});