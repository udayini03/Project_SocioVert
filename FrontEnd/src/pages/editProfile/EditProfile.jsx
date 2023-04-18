import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function UserProfile() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    desc: "",
    city: "",
    from: "",
  });
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users/${user.username}`);
        setUserData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/users/${user.username}`, userData);
      alert("Profile updated successfully!");
    } catch (err) {
      console.log(err);
      alert("Failed to update profile");
    }
  };

  return (
    <form onSubmit={handleUpdateProfile}>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        value={userData.username}
        onChange={handleInputChange}
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        value={userData.email}
        onChange={handleInputChange}
      />
      <label htmlFor="desc">Description</label>
      <input
        type="text"
        id="desc"
        name="desc"
        value={userData.desc}
        onChange={handleInputChange}
      />
      <label htmlFor="city">City</label>
      <input
        type="text"
        id="city"
        name="city"
        value={userData.city}
        onChange={handleInputChange}
      />
      <label htmlFor="from">From</label>
      <input
        type="text"
        id="from"
        name="from"
        value={userData.from}
        onChange={handleInputChange}
      />
      <button type="submit">Update Profile</button>
    </form>
  );
}
