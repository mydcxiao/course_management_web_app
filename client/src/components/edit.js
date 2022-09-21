import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
  const [form, setForm] = useState({
    courseName: "",
    instructor: "",
    difficulty: "",
    records: [],
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`/course/${params.id.toString()}`);

      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Course with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedPerson = {
      courseName: form.courseName,
      instructor: form.instructor,
      difficulty: form.difficulty,
    };

    // This will send a post request to update the data in the database.
    await fetch(`/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedPerson),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    navigate("/");
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div>
      <h3>Update Course</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Course Name: </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.courseName}
            onChange={(e) => updateForm({ courseName: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="position">Instructor: </label>
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
        <br />

        <div className="form-group">
          <input
            type="submit"
            value="Update course"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
