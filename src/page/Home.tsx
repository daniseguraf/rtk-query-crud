import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetContactsQuery,
  useDeleteContactMutation,
} from "../services/contactsApi";
import "./Home.css";

const Home = () => {
  const { data, isLoading, error } = useGetContactsQuery();
  const [deleteContact] = useDeleteContactMutation();

  useEffect(() => {
    error && toast.error("Something has failed");
  }, [error]);

  const handleDelete = async (id: any) => {
    await deleteContact(id);
    toast.success("Contact deleted successfully");
  };

  return (
    <>
      {isLoading ? (
        <h3>Is loading...</h3>
      ) : (
        <div style={{ marginTop: "100px" }}>
          <Link to="/addContact">
            <button className="btn btn-add">Add Contact</button>
          </Link>
          <br />
          <br />
          <table className="styled-table">
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>No.</th>
                <th style={{ textAlign: "center" }}>Name</th>
                <th style={{ textAlign: "center" }}>Email</th>
                <th style={{ textAlign: "center" }}>Contact</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((el, index) => (
                <tr key={el.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{el.name}</td>
                  <td>{el.email}</td>
                  <td>{el.contact}</td>
                  <td>
                    <Link to={`/editContact/${el.id}`}>
                      <button className="btn btn-edit">Edit Contact</button>
                    </Link>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDelete(el.id)}
                    >
                      Delete
                    </button>
                    <Link to={`/info/${el.id}`}>
                      <button className="btn btn-view">View</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Home;
