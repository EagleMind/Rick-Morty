import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAllCharactersService } from "../../Network/apis";
function Recommendator(selectedCharacter) {
  const [recommended, setRecommended] = useState([]);
  let recommendations = [];
  useEffect(() => {
    getAllCharactersService().then((response) => {
      response.forEach((el) => {
        if (el.species.includes(selectedCharacter.data.species))
          recommendations.push(el.name + ",");
      });
    });
    setRecommended(recommendations);
  }, []);
  return <>{Object.values(recommended)}</>;
}

export default Recommendator;
