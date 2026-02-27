import React, { useState, useEffect } from "react";

export default function DynamicForm() {
  const defaultState = {
    skills: [""]
  };

  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("dynamicForm");
    return saved ? JSON.parse(saved) : defaultState;
  });

  useEffect(() => {
    localStorage.setItem("dynamicForm", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (index, value) => {
    const updatedSkills = [...formData.skills];
    updatedSkills[index] = value;

    setFormData({
      ...formData,
      skills: updatedSkills
    });
  };

  const addSkill = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, ""]
    });
  };

  const removeSkill = (index) => {
    const updatedSkills = formData.skills.filter(
      (_, i) => i !== index
    );

    setFormData({
      ...formData,
      skills: updatedSkills
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);

    
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Dynamic Skills Form</h2>

      <form onSubmit={handleSubmit}>
        {formData.skills.map((skill, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <input
              type="text"
              placeholder="Enter skill"
              value={skill}
              onChange={(e) =>
                handleChange(index, e.target.value)
              }
            />

            {formData.skills.length > 1 && (
              <button
                type="button"
                onClick={() => removeSkill(index)}
                style={{ marginLeft: "5px" }}
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button type="button" onClick={addSkill}>
          Add Skill
        </button>

        <br /><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}