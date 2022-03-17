import "./App.css";
import {
  DropdownButton,
  Dropdown,
  Form,
  Col,
  Row,
  Container,
  Card,
} from "react-bootstrap";
import {
  getCharacterFilteredService,
  getAllCharactersService,
} from "./Network/apis";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import CharacterDetails from "./Components/characterDetails";
import EpisodeDetails from "./Components/episodeDetails";
import Recommendator from "./Components/recommendator";

function App() {
  useEffect(() => {
    getAllCharactersService().then((response) => {
      setAllCharacters(response);
    });

    setCharacterDetails();
    setEpisodes();
  }, []);
  const [characterListFiltered, setCharacterListFiltered] = useState([]);
  const [allCharacters, setAllCharacters] = useState([]);
  const [characterDetails, setCharacterDetails] = useState();
  const [episodes, setEpisodes] = useState([]);
  const [recommended, setRecommended] = useState([]);

  let epDetails = [];
  async function onChange(text) {
    const keyword = text.target.value;
    if (keyword !== "") {
      try {
        const searchResult = await getCharacterFilteredService(keyword);
        setCharacterListFiltered(searchResult);
      } catch (error) {
        setCharacterListFiltered({});
        keyword = "";
      }
    } else {
      setCharacterListFiltered({});
    }
  }
  async function getEpisodes(characterDetails) {
    characterDetails.map((el) => {
      for (let i = 0; i <= el["episode"].length - 1; i++) {
        axios.get(el["episode"][i]).then((res) => {
          epDetails.push(res.data);
        });
      }
      // useState needs a bit to update
      setTimeout(() => {
        setEpisodes(epDetails);
      }, 500);
    });
  }
  function selectName(id) {
    const selectedCharacter = allCharacters.find(
      (character) => character.id == id
    );

    // This is the recommendation feature which i didn't have time to refactor
    let recommended = [];
    getEpisodes([selectedCharacter]);
    setCharacterDetails(selectedCharacter);
    allCharacters.forEach((el) => {
      if (el.species.includes(selectedCharacter.species))
        recommended.push({ name: el.name, id: el.id });
    });
    setRecommended(recommended);
    // This is the recommendation feature which i didn't have time to refactor

    setCharacterListFiltered({});
  }

  return (
    <Container fluid className="m-5">
      <Row>
        <Col sm={5} md={5} lg={5} xl={4}>
          <Row>
            <Card>
              <Card.Header as="h5">Search</Card.Header>
              <Card.Body>
                <Card.Title>By list</Card.Title>
                <DropdownButton
                  id="dropdown-basic-button"
                  title="Choose your character"
                >
                  {allCharacters.map((subject) => (
                    <Dropdown.Item
                      key={subject.id}
                      onClick={() => selectName(subject.id)}
                    >
                      {subject.name}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
                <Row>
                  <Card.Title>By name</Card.Title>
                </Row>
                <Row>
                  <input list="browsers" type="text" onChange={onChange} />
                </Row>
                <div>
                  {characterListFiltered.length > 0
                    ? characterListFiltered.map((character) => (
                        <li key={character.id}>
                          <span onClick={() => selectName(character.id)}>
                            {character.name}
                          </span>
                        </li>
                      ))
                    : ""}
                </div>
              </Card.Body>
            </Card>
            <Card className="mt-3">
              <Card.Body>
                <Card.Title>Recommendations</Card.Title>
                <Card.Text>
                  {characterDetails ? (
                    <Recommendator data={recommended}></Recommendator>
                  ) : (
                    ""
                  )}
                </Card.Text>
              </Card.Body>
            </Card>
          </Row>
        </Col>
        <Col sm={8} md={8} lg={8} xl={8}>
          <Row xl={8} md={8} lg={8}>
            <Col sm={4} md={4} lg={4} xl={4}>
              {characterDetails ? (
                <CharacterDetails data={characterDetails}></CharacterDetails>
              ) : (
                ""
              )}
            </Col>
            <Col sm={8} md={8} lg={8} xl={8}>
              {episodes ? (
                <EpisodeDetails data={episodes}></EpisodeDetails>
              ) : (
                ""
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
