import React from 'react';
import { useNavigate } from 'react-router-dom';

function BackButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1); // Navigue en arrière dans l'historique (-1)
  };

  return (
    <button onClick={handleClick}>Retour</button>
  );
}

export default BackButton;
