import React, { useState } from "react";

function CreateCommunity() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [owner, setOwner] = useState("");
  const [tags, setTags] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [coverPicture, setCoverPicture] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const communityData = {
      name,
      description,
      owner,
      tags,
      profilePicture,
      coverPicture,
    };

    try {
      const response = await fetch("/api/community/createCommunity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(communityData),
      });

      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>

      <label>
        Description:
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>

      <label>
        Owner:
        <input type="text" value={owner} onChange={(e) => setOwner(e.target.value)} />
      </label>

      <label>
        Tags:
        <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
      </label>

      <label>
        Profile Picture:
        <input type="text" value={profilePicture} onChange={(e) => setProfilePicture(e.target.value)} />
      </label>

      <label>
        Cover Picture:
        <input type="text" value={coverPicture} onChange={(e) => setCoverPicture(e.target.value)} />
      </label>

      <button type="submit">Create Community</button>
    </form>
  );
}

export default CreateCommunity;
