import {writable} from "svelte/store";
import {v4 as uuidv4} from "uuid"

export class TodoItem {
    id = "";
    value = "";
    done = false;
}

// this function must return a unique ID every time it is called
export function generateID(): string {
    return uuidv4();
}

// make sure, that
// the value isn't longer than 255 characters
// the value isn' empty
// the todo isn't contained in the todos array (case insensitive)
export function validateTodo(todo: TodoItem, todos: TodoItem[]): boolean {
    if (todo.value.length <= 0 || todo.value.length > 255) return false;
    if (todo.value.trim() === "") return false;

    const sameTodoInList = todos.find((todoInList) => {
        return todoInList.value.toLowerCase() === todo.value.toLowerCase();
    })
    return sameTodoInList === undefined;
}

// capitalize the first letter of the todo
// and todo does not start or end with whitespaces
export function formatTodo(todo: TodoItem): TodoItem {
    const trimmedValue = todo.value.trim()
    const todoValue = trimmedValue.charAt(0).toUpperCase() + trimmedValue.slice(1);

    return {
        id: todo.id,
        value: todoValue,
        done: todo.done
    }
}

// generate a random rgb color
// each value (r,g,b) should be between 50 and 150
export function generateColor(): string {
    const min = 50;
    const max = 150;

    const r = Math.floor(Math.random() * (max - min + 1)) + min;
    const g = Math.floor(Math.random() * (max - min + 1)) + min;
    const b = Math.floor(Math.random() * (max - min + 1)) + min;

    return `rgb(${r},${g},${b})`
}

export const todoList = writable<TodoItem[]>([]);
