import React, { useEffect, useState } from "react";
import TripState from "../../state/TripState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

export default function EditTravel({ travelId, setEditing }) {
  const { updateTravel, getSingleTravel } = TripState();
  const [travel, setTravel] = useState({});
  useEffect(() => {
    const getTravel = async () => {
      const res = await getSingleTravel(travelId);
      console.log(res);
    };
  }, []);

  const [formData, setFormData] = useState({
    title: travelId.title || "",
    description: travelId.description || "",
    location: travelId.location || "",
    categories: travelId.categories || [],
    duration: travelId.duration || 0,
    price: travelId.price || 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const res = await updateTravel(travelId, formData);
    if (res) {
      console.log("Travel Updated Successfully");
      setEditing(false);
    }
  };

  return (
    <div className="relative bg-white p-6 rounded shadow-md w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto">
      <FontAwesomeIcon
        icon={faClose}
        className="cursor-pointer text-xl absolute right-2 top-2"
        onClick={() => setEditing(false)}
      />
      <form onSubmit={handleEdit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block font-medium mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows={3}
            required
          />
        </div>
        <div>
          <label htmlFor="location" className="block font-medium mb-1">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="categories" className="block font-medium mb-1">
            Categories (comma separated)
          </label>
          <input
            type="text"
            id="categories"
            name="categories"
            value={formData.categories.join(", ")}
            onChange={(e) =>
              setFormData({
                ...formData,
                categories: e.target.value.split(",").map((c) => c.trim()),
              })
            }
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="duration" className="block font-medium mb-1">
            Duration (days)
          </label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            min={1}
            required
          />
        </div>
        <div>
          <label htmlFor="price" className="block font-medium mb-1">
            Price ($)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            min={0}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
