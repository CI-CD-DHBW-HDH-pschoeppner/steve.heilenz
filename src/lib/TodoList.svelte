<script lang="ts">
  import { generateColor, todoList, type TodoItem } from "../logic/todo";

  export let todos: TodoItem[];
  let filteredTodos: TodoItem[];

  $: filteredTodos = todos.filter((todo) => {
    // TODO: es sollen nur die Items zurückgegeben werden, die den searchString (case insensitive) enthalten
    // Hier muss ein boolean zurückgegeben werden, der bestimmt, ob das Item (todo) angezeigt wird, oder nicht
  });

  let searchString = "";

  function deleteHandler(id: string) {
    todoList.update((value) => {
      return value.filter((todo) => {
        return todo.id !== id;
      });
    });
  }

  function doneHandler(id: string) {
    todoList.update((value) => {
      for (let todo of value) {
        if (todo.id === id) todo.done = true;
      }
      return value;
    });
  }
</script>

<input type="text" bind:value={searchString} placeholder="🔍" />
<div class="list">
  {#each filteredTodos as todo}
    <div style="background-color: {generateColor()};" class="item">
      <button type="button" on:click={() => doneHandler(todo.id)}>✔️</button>
      <span style="text-decoration: {todo.done ? 'line-through' : ''};"
        >{todo.value}</span
      >
      <button type="button" on:click={() => deleteHandler(todo.id)}>🗑️</button>
    </div>
  {/each}
</div>

<style>
  .list {
    display: flex;
    place-items: center;
    flex-direction: column;
    width: 60%;
    height: 60%;
    border: 2px solid gray;
    padding: 5px;
    font-size: 1.5rem;
    overflow-y: scroll;
  }
  input {
    font-size: inherit;
    width: 60%;
    margin-bottom: 10px;
  }
  .item {
    display: flex;
    box-sizing: border-box;
    width: 99%;
    margin: 2px;
    display: border-box;
    word-wrap: break-word;
    justify-content: space-between;
    flex-wrap: nowrap;
  }
  .item > span {
    word-wrap: break-word;
    min-width: 50%;
    justify-self: center;
    text-align: center;
  }
  .item > button {
    text-shadow: 0 0 10px black;
    background-color: #565050;
    outline: none;
    border: none;
    cursor: pointer;
  }
</style>
