const suma = require("./index");

test("suma a + b should return a number ", () => {
	expect(suma(1, 2)).toBe(3);
});
