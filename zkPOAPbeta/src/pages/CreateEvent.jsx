import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createEvent } from "../features/event/eventActions";

const CreateEvent = () => {
  const dispatch = useDispatch();

  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    userinfo: "",
    totalslots: "",
    image: null,
    imagePreview: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "image/png") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEventData((prevState) => ({
          ...prevState,
          image: file,
          imagePreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid PNG image.");
    }
  };

  const validateForm = () => {
    const { name, description, userinfo, totalslots, image } = eventData;
    return name && description && userinfo && totalslots && image;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("Please fill in all fields and upload a valid PNG image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", eventData.name);
    formData.append("description", eventData.description);
    formData.append("userinfo", eventData.userinfo);
    formData.append("totalslots", eventData.totalslots);
    formData.append("image", eventData.image);

    dispatch(createEvent(formData))
      .then((response) => {
        if (response.type === "event/create/fulfilled") {
          alert("Event created successfully!");
          setEventData({
            name: "",
            description: "",
            userinfo: "",
            totalslots: "",
            image: null,
            imagePreview: null,
          });
        }
      })
      .catch((error) => {
        console.error("Error creating event:", error);
        alert("Error creating event, please try again.");
      });
  };

  return (
    <div className="container">
      <div className="new-feature">
        <span className="new-badge">New</span>
        Location and Platform tags can now be added from the Properties section, via the detail page of POAPs you have created
      </div>
      <h1>Let's create your POAP.</h1>
      <form onSubmit={handleSubmit} className="form-grid">
        <div className="upload-card">
          {eventData.imagePreview ? (
            <img src={eventData.imagePreview} alt="Event Preview" className="upload-preview" />
          ) : (
            <label htmlFor="eventImage" className="upload-button">
              Add artwork
              <input
                type="file"
                id="eventImage"
                accept="image/png"
                onChange={handleFileChange}
                hidden
              />
            </label>
          )}
          <p>Recommended for optimal performance: 500x500px, rounded shape, less than 200KB</p>
        </div>

        <div>
          <div className="form-group">
            <label className="required" htmlFor="poap-title">POAP title</label>
            <input
              type="text"
              id="poap-title"
              name="name"
              value={eventData.name}
              onChange={handleInputChange}
              placeholder="Give your POAP a unique title."
            />
          </div>

          <div className="form-group">
            <label className="required" htmlFor="poap-description">POAP description</label>
            <textarea
              id="poap-description"
              name="description"
              value={eventData.description}
              onChange={handleInputChange}
              placeholder="Describe what makes your POAP special..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="userinfo">User Info</label>
            <input
              type="text"
              id="userinfo"
              name="userinfo"
              value={eventData.userinfo}
              onChange={handleInputChange}
              placeholder="Enter user information"
            />
          </div>

          <div className="form-group">
            <label className="required" htmlFor="totalslots">Total Slots</label>
            <input
              type="number"
              id="totalslots"
              name="totalslots"
              value={eventData.totalslots}
              onChange={handleInputChange}
              placeholder="Enter total slots"
            />
          </div>

          <div className="form-footer">
            <div className="footer-info">
              Commercial drops require credits. <a href="#">Learn more</a>
            </div>
            <div className="footer-actions">
              <button type="button" className="button button-ghost">Cancel</button>
              <button type="submit" className="button button-primary">Create POAP</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
