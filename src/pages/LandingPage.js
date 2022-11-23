import React, { useState, useEffect } from "react";
import fireDb from "../firebase";
import { Link, useParams } from "react-router-dom";
import "./Landing.css";


const Landing = () => {
  const [data, setData] = useState({});

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
  }, []);


  const onDelete = (id) => {
    if(window.confirm("Are you sure that you want to delete this contact?")){
      fireDb.child(`contacts/${id}`).remove((err) => {
        if(err){
          alert(err)
        }else{
          alert("Contact Successfully deleted")
        }
      })
    }
  }

  return (
    <div style={{ margiTop: "100px" }}>
      <table className="styled-table">
        <thead>
          <th style={{ textAlign: "center" }}>No.</th>
          <th style={{ textAlign: "center" }}>Name</th>
          <th style={{ textAlign: "center" }}>Email</th>
          <th style={{ textAlign: "center" }}>Contact</th>
          <th style={{ textAlign: "center" }}>Action</th>
        </thead>
        <tbody>
          {Object.keys(data).map((id, index) => {
            return (
              <tr key={id}>
                <th scope="row">{index + 1}</th>
                <td>{data[id].name}</td>
                <td>{data[id].email}</td>
                <td>{data[id].contact}</td>
                <Link to={`/update/${id}`}>
                  <button className="btn btn-edit">Edit</button>
                </Link>

                <button className="btn btn-delete" onClick={() => onDelete(id)}>Delete</button>

                <Link to={`/view/${id}`}>
                  <button className="btn btn-view">View</button>
                </Link>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Landing;
