import React from "react";
import Card from "../Card/Card";
import CardAboutUs from "../CardAboutUs/CardAboutUs";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import { ContainerCardsAboutUs,H2Home,H4Link,ContainerAboutUs} from "../styles/Card";

const AboutUs = () => {
  const people = [
    {
      name: "Germán Leithner",
      picture:
        "https://pbs.twimg.com/profile_images/1012362101510160384/EjayQ10E_400x400.jpg",
      description: "Not description yet",
      linkedIn:"https://www.linkedin.com/in/german-leithner-a23049150/",
      gitHub:"https://github.com/GerLeithner"
    },
    {
      name: "Adrian Laborde",
      picture:
        "https://pbs.twimg.com/profile_images/1012362101510160384/EjayQ10E_400x400.jpg",
      description: "Not description yet",
      linkedIn:"https://www.linkedin.com/in/adrian-laborde-732091199/",
      gitHub:"https://github.com/Adrianl93"
    },
    
    {
      name: "Gabriel Basilio",
      picture:
        "https://pbs.twimg.com/profile_images/1012362101510160384/EjayQ10E_400x400.jpg",
      description: "Not description yet",
      linkedIn:"https://www.linkedin.com/in/gabriel-basilio-7558a6227/",
      gitHub:"https://github.com/GaboBas"
    },
    {
      name: "Andrea Palomeque",
      picture:
        "https://pbs.twimg.com/profile_images/1012362101510160384/EjayQ10E_400x400.jpg",
      description: "Not description yet",
      linkedIn:"https://www.linkedin.com/in/andrea-victoria-lopez-palomeque/",
      gitHub:"https://github.com/andrealopezpalomeque"
    },
    
    // {
    //   name: "Ignacio Luna",
    //   picture:
    //     "https://pbs.twimg.com/profile_images/1012362101510160384/EjayQ10E_400x400.jpg",
    //   description: "Not description yet",
    // },
    {
      name: "Kevin Tavara",
      picture:
        "https://pbs.twimg.com/profile_images/1012362101510160384/EjayQ10E_400x400.jpg",
      description: "Not description yet",
      linkedIn:"https://www.linkedin.com/in/adrian-laborde-732091199/",
      gitHub:"https://github.com/KevinZet"
    },
  ];

  // name,picture,description
  return (
    <ContainerAboutUs>
      <NavBar />
      <H2Home>About Us</H2Home>
      <ContainerCardsAboutUs>
      {people?.map((p) => {
        return (
          <div key={p.name}>
            <CardAboutUs
              name={p.name}
              picture={p.picture}
              description={p.description}
              linkedIn={p.linkedIn}
              gitHub={p.gitHub}
            />
          </div>
        );
      })}
      </ContainerCardsAboutUs>
    </ContainerAboutUs>
  );
};

export default AboutUs;
