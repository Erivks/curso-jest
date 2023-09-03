test("Devo conhecer as principais assertivas do Jest", () => {
    let number = null;
    expect(number).toBeNull();
    number = 10;
    expect(number).not.toBeNull();
    expect(number).toBe(10);
    expect(number).toEqual(10);
    expect(number).toBeGreaterThan(9);
    expect(number).toBeLessThan(11);
});

test("Devo saber trabalhar com objetos", () => {
    const obj = { name: "Erick", email: "erick.santos@planium.io" };
    expect(obj).toHaveProperty("name");
    expect(obj).toHaveProperty("name", "Erick");
    expect(obj.name).toBe("Erick");

    const obj2 = { name: "Erick", email: "erick.santos@planium.io" };
    expect(obj).toEqual(obj2);
    expect(obj).toBe(obj);
});