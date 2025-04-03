import React, { useState } from 'react';
import './App.css';
function ImageUploadForm() {
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [preview, setPreview] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const handleTagChange = (event) => {
    setTags(event.target.value.split(','));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newImage = {
      image: preview,
      tags: tags,
      title: event.target.title.value,
    };
    setUploadedImages([...uploadedImages, newImage]);
    setImage(null);
    setTags([]);
    setPreview(null);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Upload Image with Tags</h2>
        <input type="text" name="title" placeholder="upload image" />
        <input type="file" onChange={handleImageChange} />
        <input type="text" value={tags.join(',')} onChange={handleTagChange} placeholder="Tags" />
        <button type="submit">Upload</button>
      </form>
      {preview && (
        <div>
          <h3>Preview</h3>
          <img src={preview} alt="Preview" />
          <p>Tags: {tags.join(', ')}</p>
        </div>
      )}
      <h2>Uploaded Images</h2>
      <div className="grid-view">
        {uploadedImages.map((image, index) => (
          <div key={index} className="image-card">
            <img src={image.image} alt={image.title} />
            <h4>{image.title}</h4>
            <p>Tags: {image.tags.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageUploadForm;