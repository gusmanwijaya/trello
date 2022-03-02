import TextField from "../TextField";
import ButtonGroup from "../ButtonGroup";
import { useEffect, useState, useCallback } from "react";
import {
  createItem,
  destroyItem,
  getOneItem,
  updateItem,
} from "../../api/items";

export default function AddCard({
  getTodosAPI,
  todoID,
  itemID,
  adding,
  cancel,
}) {
  const [name, setName] = useState("");

  const getOneItemAPI = useCallback(async () => {
    try {
      const response = await getOneItem(itemID);
      if (response.data.status === "success") {
        setName(response.data.data.name);
      }
    } catch (error) {
      console.log(error);
    }
  }, [itemID]);

  useEffect(() => {
    getOneItemAPI();
  }, [getOneItemAPI]);

  const onChange = (event) => {
    setName(event.target.value);
  };

  const clear = () => {
    setName("");
    cancel();
  };

  const saveItemAPI = async () => {
    try {
      const payload = {
        name,
        TodoId: todoID,
      };
      const response = await createItem(payload);
      if (response.data.status === "success") {
        getTodosAPI();
        clear();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateItemAPI = async () => {
    try {
      const payload = {
        name,
        TodoId: todoID,
      };
      const response = await updateItem(itemID, payload);
      if (response.data.status === "success") {
        getTodosAPI();
        clear();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const destroyItemAPI = async (id) => {
    try {
      const response = await destroyItem(id);
      if (response.data.status === "success") {
        getTodosAPI();
        clear();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="edit-card">
      <div className="card">
        <TextField
          className="edit-card-textarea"
          name="name"
          value={name}
          placeholder="Enter a title for this card"
          onChange={onChange}
        />
      </div>

      <ButtonGroup
        handleSave={() => {
          adding ? saveItemAPI() : updateItemAPI();
        }}
        saveLabel={adding ? "Add card" : "Edit card"}
        handleCancel={cancel}
        handleDelete={() => destroyItemAPI(itemID)}
      />
    </div>
  );
}
