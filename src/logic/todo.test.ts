import {validate as uuidValidate, version as uuidVersion} from "uuid"
import {TodoItem, generateID, validateTodo, formatTodo, generateColor} from "./todo";

describe("generateID", () => {
    test("should return a valid uuidv4", () => {
        for (let i = 0; i < 1000; i++) {
            const id = generateID()

            expect(id.length).toBe(36);
            expect(uuidValidate(id) && uuidVersion(id) === 4).toBe(true);
        }
    });

    test("should return unique strings", () => {
        for (let i = 0; i < 1000; i++) {
            const id1 = generateID();
            const id2 = generateID();

            expect(id1).not.toBe(id2);
        }
    });
});

describe("validateTodo", () => {
    test("should return true for a valid todo", () => {
        const todo = new TodoItem();
        todo.value = "Svelte + TypeScript = ❤";

        const todos = [new TodoItem()];
        todos[0].value = "JavaScript = 💤";

        expect(validateTodo(todo, todos)).toBe(true);
    });

    test("should return false for a todo with an empty value", () => {
        const todo = new TodoItem();
        todo.value = "";

        const todos: TodoItem[] = [];

        expect(validateTodo(todo, todos)).toBe(false);
    });

    test("should return false for a todo with a value longer than 255 characters", () => {
        const todo = new TodoItem();
        todo.value = "a".repeat(256);

        const todos: TodoItem[] = [];

        expect(validateTodo(todo, todos)).toBe(false);
    });

    test("should return false for a todo with the same value as an existing todo (case insensitive)", () => {
        const todo = new TodoItem();
        todo.value = "buy milk";

        const todos = [new TodoItem()];
        todos[0].value = "BUY MILK";

        expect(validateTodo(todo, todos)).toBe(false);
    });
});

describe("formatTodo", () => {
    test("should capitalize the first letter of the todo", () => {
        const todo = new TodoItem();
        todo.value = "buy milk";

        const formattedTodo = formatTodo(todo);

        expect(formattedTodo.value).toBe("Buy milk");
    });

    test("should not change the ID or done status of the todo", () => {
        const todo = new TodoItem();
        todo.id = "123";
        todo.done = true;
        todo.value = "buy milk";

        const formattedTodo = formatTodo(todo);

        expect(formattedTodo.id).toBe(todo.id);
        expect(formattedTodo.done).toBe(todo.done);
    });
});

describe("generateColor", () => {
    test("should return an RGB color string", () => {
        const color = generateColor();
        expect(color).toMatch(/^rgb\(\d{1,3},\d{1,3},\d{1,3}\)$/);
    });

    test("should return values between 50 and 150", () => {
        const color = generateColor();
        const values = color.match(/\d+/g);

        expect(values).not.toBeNull();

        // @ts-ignore
        expect(Number(values[0])).toBeGreaterThanOrEqual(50);
        // @ts-ignore
        expect(Number(values[0])).toBeLessThanOrEqual(150);

        // @ts-ignore
        expect(Number(values[1])).toBeGreaterThanOrEqual(50);
        // @ts-ignore
        expect(Number(values[1])).toBeLessThanOrEqual(150);

        // @ts-ignore
        expect(Number(values[2])).toBeGreaterThanOrEqual(50);
        // @ts-ignore
        expect(Number(values[2])).toBeLessThanOrEqual(150);
    });
});
