import TextField from "@mui/material/TextField";
import React from "react";
import { useDispatch } from "react-redux";
import "./index.css";
import ProjectsList from "./ProjectsList";
import { search } from "./ProjectsSlice";

export default function Dashboard() {
  const dispatch = useDispatch();

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <a href="/">
          <h1>Projector</h1>
        </a>
      </header>
      <section className="row main-section">
        <div className="col-2 sidemenu-container">
          <TextField
            id="outlined-basic"
            label="Search By Name"
            variant="outlined"
            onChange={(e) => dispatch(search(e.target.value))}
          />
        </div>

        <main className="col-10 main">
          <div className="datagrid-container ">
            <ProjectsList />
          </div>
        </main>
      </section>
    </div>
  );
}
