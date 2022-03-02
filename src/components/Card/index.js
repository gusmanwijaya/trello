import "./card.css";
import Title from "../Title";
import React, { useState, useEffect } from "react";
import TextField from "../TextField";
import AddCard from "../AddCard";
import { destroyTodo, getOneTodo, updateTodo } from "../../api/todos";
import { moveItem } from "../../api/items";

export default function Card({ todos, getTodosAPI }) {
  const [editList, setEditList] = useState({
    status: false,
    id: "",
    name: "",
  });
  const [card, setCard] = useState([]);

  const [todoID, setTodoID] = useState(null);
  const [itemID, setItemID] = useState(null);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    setCard(todos);
  }, [todos]);

  const toggleEditList = async (id, status) => {
    try {
      const response = await getOneTodo(id);
      if (response.data.status === "success") {
        setEditList({
          ...editList,
          status,
          id: response.data.data.id,
          name: response.data.data.name,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onEnter = async (event, id) => {
    try {
      if (event.keyCode === 13) {
        const payload = {
          name: editList.name,
        };
        const response = await updateTodo(id, payload);
        if (response.data.status === "success") {
          setEditList({
            ...editList,
            status: false,
            id: "",
            name: "",
          });
          getTodosAPI();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodoAPI = async (id) => {
    try {
      if (window.confirm("Yakin ingin menghapus?")) {
        const response = await destroyTodo(id);
        if (response.data.status === "success") {
          getTodosAPI();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (event) => {
    setEditList({
      ...editList,
      [event.target.name]: event.target.value,
    });
  };

  const toggleAddCard = (id) => {
    const _temp = [...card];

    _temp.forEach((card) => {
      if (card.id === id) {
        card.status = !card.status;
      }
    });

    setCard(_temp);
    setTodoID(id);
  };

  const toggleEditCard = (todoID, itemID) => {
    const _temp = [...card];

    _temp.forEach((card) => {
      if (card.id === todoID) {
        card.Items.forEach((item) => {
          if (item.id === itemID) {
            item.isEdit = !item.isEdit;
          }
        });
      }
    });

    setCard(_temp);
    setTodoID(todoID);
    setItemID(itemID);
  };

  const moveItemAPI = async (todoID, itemID) => {
    try {
      const payload = {
        targetTodoId: todoID,
      };
      const response = await moveItem(itemID, payload);
      if (response.data.status === "success") {
        getTodosAPI();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {card.map((value, index) => (
        <div key={index} className="list">
          <div className="lists-card">
            {editList.status && editList.id === value.id ? (
              <TextField
                name="name"
                value={editList.name}
                className="list-title-textarea"
                onChange={onChange}
                deleteList={() => deleteTodoAPI(editList.id)}
                handleCancel={() =>
                  setEditList({ ...editList, status: false, id: "", name: "" })
                }
                onEnter={(event) => onEnter(event, editList.id)}
              />
            ) : (
              <Title onClick={() => toggleEditList(value.id, true)}>
                {value.name}
              </Title>
            )}

            {value.Items.map((item, index2) => (
              <React.Fragment key={index2}>
                {!item.isEdit ? (
                  <div
                    className="card"
                    key={item.id}
                    onMouseEnter={() => setHover(item.id)}
                    onMouseLeave={() => setHover(null)}
                  >
                    {hover === item.id && (
                      <div className="card-icons">
                        <div
                          className="card-icon"
                          onClick={() => {
                            toggleEditCard(value.id, item.id);
                          }}
                        >
                          <ion-icon name="pencil-outline"></ion-icon>
                        </div>

                        {index !== 0 && (
                          <div
                            className="card-icon"
                            onClick={() => {
                              moveItemAPI(card[index - 1].id, item.id);
                            }}
                          >
                            <ion-icon name="arrow-back-outline"></ion-icon>
                          </div>
                        )}
                        {card.length - 1 !== index && (
                          <div
                            className="card-icon"
                            onClick={() => {
                              moveItemAPI(card[index + 1].id, item.id);
                            }}
                          >
                            <ion-icon name="arrow-forward-outline"></ion-icon>
                          </div>
                        )}
                      </div>
                    )}
                    {item.name}
                  </div>
                ) : (
                  <AddCard
                    getTodosAPI={getTodosAPI}
                    todoID={todoID}
                    itemID={itemID}
                    cancel={() => toggleEditCard(value.id, item.id)}
                  />
                )}
              </React.Fragment>
            ))}

            {value.status ? (
              <AddCard
                getTodosAPI={getTodosAPI}
                todoID={todoID}
                adding
                cancel={() => toggleAddCard(value.id)}
              />
            ) : (
              <div
                className="toggle-add-card"
                onClick={() => toggleAddCard(value.id)}
              >
                <ion-icon name="add-outline"></ion-icon> Add a card
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
