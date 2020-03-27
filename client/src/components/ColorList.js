import React, { useState } from "react";

import {axiosWithAuth} from '../utils/axiosWithAuth';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const newInitialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const [newColor, setNewColor] = useState(newInitialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        setColorToEdit(res.data);
        axiosWithAuth()
          .get('/colors')
          .then(res => {
            updateColors(res.data);
        })
      })
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`colors/${color.id}`)
      .then(res => {
        axiosWithAuth()
          .get('/colors')
          .then(res => {
            updateColors(res.data);
        })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err.response));
  };

  const addColor = e => {
    e.preventDefault();

    axiosWithAuth()
      .post('/colors', newColor)
      .then(res =>{
        console.log(res);
        updateColors(res.data)
      })
      .catch(err => console.log(err))

      setNewColor({
        color: "",
        code: {
          hex: ""
        }
      });
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.id} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <form onSubmit={addColor}>
          <legend>add color</legend>
          <label>
            color name:
            <input
              type="text"
              onChange={e => setNewColor({...newColor,color: e.target.value})}
              value={newColor.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setNewColor({
                  ...newColor,
                  code: { hex: e.target.value }
                })
              }
              value={newColor.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">add</button>
          </div>
        </form>
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
