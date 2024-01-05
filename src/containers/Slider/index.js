import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>

    // Changement de l'opérateur logique pour trier dans le bon sens les images 
    // De la plus ancienne à la plus récente
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );
  const nextCard = () => {

    // Ajout condition pour gérer l'erreur console (byDateDesc.lenght : undefined)
    if (byDateDesc) {
    setTimeout(

      // Suppression de l'élément vide du carrousel en ajoutant -1 à la taille du tableau
      () => setIndex(index < byDateDesc.length -1 ? index + 1 : 0),
      5000
    );
    }
  };
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (

        // Déplacement de la key dans une autre div qui englobe le composant slidecard
        <div key={event.title}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            {/* Ajout d'un alt unique pour chaque images */}
            <img src={event.cover} alt={event.title} />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">

              {/* Modification des params et de la key (corrige erreur console pas de key unique) */}
              {byDateDesc.map((bulletPoint, radioIdx) => (
                <input
                  key={`${bulletPoint.title}`}
                  type="radio"
                  name="radio-button"

                  // Remplacement de idx par index
                  checked={index === radioIdx}
                  
                  // Ajout readOnly pour gérer erreur console : checked without onChange
                  readOnly
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
