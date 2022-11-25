import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./AddEdit.css";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import fireDb from "../firebase";
import LoadingSpinner from "../components/Animation/LoadingSpinner";
import ClipLoader from "react-spinners/ClipLoader";

const initialState = {
  name: "",
  email: "",
  contact: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { name, email, contact } = state;

  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    fireDb.child("contacts").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });
    return () => {
      setData({});
    };
  }, [id]);

  useEffect(() => {
    if (id) {
      setData({ ...data[id] });
    } else {
      setData({ ...initialState });
    }
  }, [id, data]);

  const handleInputCgange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact) {
      setIsLoading(false);
      alert("Please provide values in each input field");
    } else {
      if (!id) {
        fireDb.child("contacts").push(state, (err) => {
          if (err) {
            alert(err);
          } else {
            alert("Contact Added Successfully");
          }
        });
      } else {
        fireDb.child(`contacts/${id}`).set(state, (err) => {
          if (err) {
            alert(err);
          } else {
            alert("Contact Updated Successfully");
          }
        });
      }
      setTimeout(() => history.push("/contacts"), 500);
    }
  };

  return (
    <div style={{ marginTop: "100px" }}>
     
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
          boxShadow: "0 1px 8px rgba(0, 0, 0, 0.2)",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter Name..."
          value={name || ""}
          onChange={handleInputCgange}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter Email..."
          value={email || ""}
          onChange={handleInputCgange}
          required
        />
        <label htmlFor="contact">Name</label>
        <input
          type="number"
          id="contact"
          name="contact"
          placeholder="Enter Contact..."
          value={contact || ""}
          onChange={handleInputCgange}
          required
        />
        <input type="submit" value={id ? "Update" : "Save"} />
      </form>
    </div>
  );
};

export default AddEdit;
