import { useState } from "react";
import TextField from "../TextField";
import ButtonGroup from "../ButtonGroup";
import "./add-list.css";
import { createTodo } from "../../api/todos";

export default function AddList({ handleCancel, getTodosAPI }) {
  const [name, setName] = useState("");

  const handleClear = () => {
    setName("");
    handleCancel();
  };

  const saveTodos = async () => {
    try {
      const payload = { name };
      const response = await createTodo(payload);
      if (response.data.status === "success") {
        getTodosAPI();
        handleClear();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-list-editor">
      <TextField
        name="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Enter list title"
        className="list-title-textarea"
      />

      <ButtonGroup
        saveLabel="Add list"
        handleCancel={handleCancel}
        handleSave={() => saveTodos()}
      />
    </div>
  );
}
