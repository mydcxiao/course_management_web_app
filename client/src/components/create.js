import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    courseName: "",
    instructor: "",
    difficulty: "",
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPerson = { ...form };

    await fetch("/course/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    })
    .catch(error => {
      window.alert(error);
      return;
    });

    setForm({ courseName: "", instructor: "", difficulty: "" });
    navigate("/");
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Create New Course</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Course Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.courseName}
            onChange={(e) => updateForm({ courseName: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="position">Instructor</label>
          <input
            type="text"
            className="form-control"
            id="position"
            value={form.instructor}
            onChange={(e) => updateForm({ instructor: e.target.value })}
          />
        </div>
        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="positionOptions"
              id="positionIntern"
              value="Easy"
              checked={form.difficulty === "Easy"}
              onChange={(e) => updateForm({ difficulty: e.target.value })}
            />
            <label htmlFor="positionIntern" className="form-check-label">Easy</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="positionOptions"
              id="positionJunior"
              value="Medium"
              checked={form.difficulty === "Medium"}
              onChange={(e) => updateForm({ difficulty: e.target.value })}
            />
            <label htmlFor="positionJunior" className="form-check-label">Medium</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="positionOptions"
              id="positionSenior"
              value="Hard"
              checked={form.difficulty === "Hard"}
              onChange={(e) => updateForm({ difficulty: e.target.value })}
            />
            <label htmlFor="positionSenior" className="form-check-label">Hard</label>
          </div>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create course"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
