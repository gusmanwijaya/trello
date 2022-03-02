import Header from "../../components/Header";
import Board from "../../components/Board";
import "./list.css";
import { useEffect, useState } from "react";
import AddList from "../../components/AddList";
import Card from "../../components/Card";
import { getTodos } from "../../api/todos";

export default function Home() {
  const [isToggleList, setIsToggleList] = useState(false);
  const [todos, setTodos] = useState([]);

  const getTodosAPI = async () => {
    try {
      const response = await getTodos();
      response.data.data.forEach((todo) => {
        todo.status = false;
        todo.Items.forEach((item) => {
          item.isEdit = false;
        });
      });
      setTodos(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodosAPI();
  }, []);

  return (
    <>
      <Header>MERN Stack To Do List - Gusman Wijaya</Header>
      <Board>
        <Card todos={todos} getTodosAPI={() => getTodosAPI()} />
        <div className="add-list">
          {isToggleList ? (
            <AddList
              handleCancel={() => setIsToggleList(false)}
              getTodosAPI={() => getTodosAPI()}
            />
          ) : (
            <div
              className="add-list-button"
              onClick={() => setIsToggleList(true)}
            >
              <ion-icon name="add-outline"></ion-icon> Add a list
            </div>
          )}
        </div>
      </Board>
    </>
  );
}
