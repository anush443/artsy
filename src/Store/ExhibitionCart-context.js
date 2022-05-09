import React from "react";

const ExhibitionCartContext = React.createContext({
  exhibitions: [],
  totalAmount: 0,
  addExhibition: (exhibition) => {},
  removeExhibition: (id) => {},
});

export default ExhibitionCartContext;
