import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetContactQuery } from "../services/contactsApi";
import "./Info.css";

const Info = () => {
  const { id } = useParams();
  const { data, error } = useGetContactQuery(id!);

  useEffect(() => {
    error && toast.error("Something went wrong");
  }, [error]);

  return (
    <div style={{ marginTop: "150px" }}>
      <div className="card">
        <div className="card-header">
          <p>User Contact Detail</p>
        </div>
        <div className="container">
          <strong>ID:</strong>
          <span>{id}</span>
          <br />
          <br />
          <strong>Name:</strong>
          <span>{data && data.name}</span>
          <br />
          <br />
          <strong>Name:</strong>
          <span>{data && data.email}</span>
          <br />
          <br />
          <strong>Contact:</strong>
          <span>{data && data.contact}</span>
          <br />
          <br />
          <Link to="/">
            <button className="btn btn-edit">Go back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Info;
