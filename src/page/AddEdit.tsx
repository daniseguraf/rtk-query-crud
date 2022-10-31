import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useAddContactMutation,
  useGetContactQuery,
  useUpdateContactMutation,
} from "../services/contactsApi";
import { toast } from "react-toastify";
import "./AddEdit.css";

const initialValue = {
  name: "",
  email: "",
  contact: "",
};

const AddEdit = () => {
  const [formValue, setFormValue] = useState(initialValue);
  const { name, email, contact } = formValue;
  const [editMode, setEditMode] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const [addContact] = useAddContactMutation();
  const [updateContact] = useUpdateContactMutation();

  const { data } = useGetContactQuery(id!);

  useEffect(() => {
    if (id) {
      setEditMode(true);
      if (data) {
        setFormValue({ ...data });
      }
    } else {
      setEditMode(false);
      setFormValue({ ...initialValue });
    }
  }, [id, data]);

  const handleInputChange = (e: any) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!name || !email || !contact) {
      toast.error("Please provide all the fields");
      return;
    }

    if (editMode) {
      await updateContact(formValue);
      navigate("/");
      setEditMode(false);
      toast.success("Success");
      return;
    }

    await addContact(formValue);
    navigate("/");
    toast.success("Success");
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter name"
            value={name}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="name">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter email"
            value={email}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="name">Contact</label>
          <input
            type="number"
            id="contact"
            name="contact"
            placeholder="Enter contact"
            value={contact}
            onChange={handleInputChange}
          />
        </div>
        <input type="submit" value={editMode ? "Edit" : "Add"} />
      </form>
    </div>
  );
};

export default AddEdit;
