import "./App.css";
import {
  DropdownButton,
  Dropdown,
  Form,
  Col,
  Row,
  Container,
  Card,
  Table,
  Modal,
  Button,
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
  const [searchList, setSearchListFiltered] = useState([]);
  const [characterDetails, setCharacterDetails] = useState();
  const [episodes, setEpisodes] = useState([]);

  const [recommended, setRecommended] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);

  const customSpinConfig = {
    lines: 10,
  };
  let epDetails = [];
  async function onChange(text) {
    const keyword = text.target.value;
    if (keyword !== "") {
      try {
        const searchResult = await getCharacterFilteredService(keyword);
        setCharacterListFiltered(searchResult);
      } catch (error) {
        setCharacterListFiltered({});
        alert(error);
      }
    }
  }
  async function getEpisodes(characterDetails) {
    characterDetails.map((el) => {
      for (let i = 0; i <= el["episode"].length - 1; i++) {
        axios.get(el["episode"][i]).then((res) => {
          epDetails.push(res.data);
          setIsLoaded(false);
          setEpisodes(epDetails);
          setIsLoaded(true);
        });
      }
    });
  }
  function selectName(id) {
    const selectedCharacter = allCharacters.find(
      (character) => character.id == id
    );
    getEpisodes([selectedCharacter]);
    setCharacterDetails(selectedCharacter);

    setCharacterListFiltered({});
  }

  return (
    <>
      <div className="App">
        {/* <a href='#' onClick={() => selectName(el[1])}>{el}</a> */}
        <Container>
          <Row xl={8} md={8} lg={8} className="search">
            <Col md={5} lg={5} xl={5}>
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
            </Col>
          </Row>

          <Row xl={8} md={8} lg={8} className="search">
            <Col md={5} lg={5} xl={5}>
              {" "}
              <Form.Label>Character's Name</Form.Label>
              <input list="browsers" type="text" onChange={onChange} />
              <div className="user-list ">
                {characterListFiltered.length > 0
                  ? characterListFiltered.map((character) => (
                      <li key={character.id}>
                        <span
                          className="user-name"
                          onClick={() => selectName(character.id)}
                        >
                          {character.name}
                        </span>
                      </li>
                    ))
                  : ""}
              </div>
            </Col>
          </Row>
        </Container>
        <Container fluid className="d-flex justify-content-center m-5">
          <Row>
            <Col>
              {characterDetails ? (
                <CharacterDetails data={characterDetails}></CharacterDetails>
              ) : (
                ""
              )}
            </Col>
            <Col sm={6} md={6} lg={6} xl={6}>
              {characterDetails ? (
                <Recommendator data={characterDetails}></Recommendator>
              ) : (
                ""
              )}
              {episodes ? (
                <EpisodeDetails
                  data={episodes}
                  loaded={isLoaded}
                ></EpisodeDetails>
              ) : (
                ""
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default App;
