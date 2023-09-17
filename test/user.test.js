const request = require("supertest");
const app = require("../src/app");

test("Deve responder HTTP CODE 200", () => {
    return request(app).get("/users")
        .then((res) => {
            expect(res.status).toBe(200)
        });
});

test("Deve listar todos os usuários", () => {
    return request(app).get("/users")
        .then((res) => {
            expect(res.body.length).toBeGreaterThanOrEqual(0);
        })
});

test("Deve inserir usuário com sucesso", () => {
    const email = `${Date.now()}@mail.com`;
    
    return request(app).post("/users")
        .send({ name: "Walter Mitty", mail: email, passwd: "123456" })
        .then((res) => {
            expect(res.status).toBe(201);
            expect(res.body.name).toBe("Walter Mitty");
        })
});

test("Não deve inserir usuário sem nome", () => {
    return request(app).post("/users")
        .send({ mail: "walter@gmail.com", passwd: "123456" })
        .then((res) => {
            expect(res.status).toBe(400);
            expect(res.body.error).toBe("Nome é um attr obrigatorio")
        })
});

test("Não deve inserir usuário sem email", async () => {
    const result = await request(app).post("/users")
        .send({ name: "Walter Mitty", passwd: "123456" });

    expect(result.status).toBe(400);
    expect(result.body.error).toBe("Email é um attr obrigatorio");

});


test("Não deve inserir usuário sem senha", async () => {
    const email = `${Date.now()}@mail.com`;

    const result = await request(app).post("/users")
        .send({ name: "Walter Mitty", mail: email });

    expect(result.status).toBe(400);
    expect(result.body.error).toBe("Senha é um attr obrigatorio");

});