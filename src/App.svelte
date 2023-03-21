<script lang="ts">
  import TodoList from "./lib/TodoList.svelte";
  import {
    formatTodo,
    generateID,
    TodoItem,
    todoList,
    validateTodo,
  } from "./logic/todo";

  let todos: TodoItem[];

  todoList.subscribe((value) => {
    todos = value;
  });

  function submitHandler(event: SubmitEvent) {
    const data = new FormData(event.target as HTMLFormElement);
    for (let field of data) {
      const [, value] = field;
      addTodo({
        id: generateID(),
        value: value.toString(),
        done: false,
      });
      ((event.target as HTMLFormElement)[0] as HTMLInputElement).value = "";
      return; // we are only interested in the first value.
      // there will probably never be a second value, by why risk it
    }
  }

  function addTodo(todo: TodoItem) {
    if (validateTodo(todo, todos)) {
      todos.push(formatTodo(todo));
      todos = todos;
    }
  }
</script>

<main>
  <h1>Todos:</h1>
  <TodoList {todos} />
  <progress
    max={todos.length}
    value={todos.filter((todo) => {
      return todo.done === true;
    }).length}
  />
  <form on:submit|preventDefault={submitHandler}>
    <input type="text" placeholder="Add new todo" name="todo" id="todo" />
  </form>
</main>

<style>
  main {
    display: flex;
    place-items: center;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
  }
  progress {
    margin: 5px;
    appearance: none;
    width: 60%;
    height: 1rem;
    display: block;
    box-sizing: border-box;
  }
  form {
    display: block;
    box-sizing: border-box;
    width: 60%;
  }
  form > input {
    width: 100%;
    font-size: 1.5rem;
  }
</style>
