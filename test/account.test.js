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

test("Não deve inserir conta sem nome", async () => {
    const accObj = { user_id: user.id };

    const result = await request(app).post(MAIN_ROUTE)
        .send(accObj);
    
    expect(result.status).toBe(400);
    expect(result.body.error).toBe("Nome é um attr obrigatorio");
});

test("Deve listar todas as contas", async () => {
    const result = await request(app).get(MAIN_ROUTE);
    expect(result.body.length).toBeGreaterThanOrEqual(0);
});

test("Deve retornar uma conta por ID", async () => {
    const accounts = await app.db("accounts")
        .insert({ name: 'Acc By ID', user_id: user.id }, ["id", "name"]);
    
    const response = await request(app).get(`${MAIN_ROUTE}/${accounts[0].id}`);

    // ASSERTIVAS
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(accounts[0].name);
    expect(response.body.id).toBe(accounts[0].id);
});

test("Deve alterar uma conta", async () => {
    const account = await app.db("accounts")
        .insert({ name: "Acc To Update", user_id: user.id }, ["id"]);
    
    const response = await request(app).put(`${MAIN_ROUTE}/${account[0].id}`)
        .send({ name: "Acc Updated"});

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Acc Updated");
});

test("Deve deletar uma conta", async () => {
    const account = await app.db("accounts")
        .insert({ name: "Acc To Delete", user_id: user.id }, ["id"]);
    
    const response = await request(app).delete(`${MAIN_ROUTE}/${account[0].id}`);

    expect(response.status).toBe(204);
});