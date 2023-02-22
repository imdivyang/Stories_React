import {
  Button,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  Switch,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./MyStories.css";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { localStorageKey } from "../../utils/Constant";
import moment from "moment";
import StoryModal from "../../components/StoryModal";
const logo = require("../../logo.png");

const MyStories = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [myStories, setMyStories] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(
      localStorage.getItem(localStorageKey.CURRENTUSER)
    );
    const getStory = JSON.parse(localStorage.getItem(localStorageKey.STOYRIES));
    const myData = getStory.filter((e) => {
      return e.userData.userId === currentUser.userId;
    });

    setMyStories(myData);
  }, []);

  const onDelete = (index) => {
    const temp = [...myStories];
    temp.splice(index, 1);
    setMyStories(temp);
    localStorage.setItem(localStorageKey.STOYRIES, JSON.stringify(temp));
  };

  return (
    <div className="my-story-container">
      <div className="my-story-nav-bar">
        <NavLink to="/" className="my-story-company-logo">
          <img className="" src={logo} alt="this is my company logo" />
        </NavLink>
      </div>

      <div className="my-stories-container">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <NavLink to="/MyStories/addstories">
            <Button colorScheme="blue">Add Stories</Button>
          </NavLink>
        </div>
        {myStories.length ? (
          <TableContainer>
            <Table size={"sm"}>
              <TableCaption>Imperial to metric conversion factors</TableCaption>
              <Thead>
                <Tr>
                  <Th w={"15%"}>Date</Th>
                  <Th w={"15%"}>Title</Th>
                  <Th w={"15%"}>Story Cover Image</Th>
                  <Th w={"10%"}>Tags</Th>
                  <Th w="10%">Public / Private</Th>
                  <Th w={"20%"}>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {myStories.map((item, index) => {
                  return (
                    <Tr
                      key={index.toString()}
                      onClick={() => {
                        setCurrentPost(item);
                        onOpen();
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <Td>{moment(item.createdAt).format("MMMM Do YYYY")}</Td>

                      <Td>{item.topic}</Td>
                      <Td>
                        <img
                          src={item.storyImage}
                          alt={item.topic}
                          width={150}
                        />
                      </Td>

                      <Td style={{ textTransform: "uppercase" }}>
                        {item.tags.map((tag) => {
                          return (
                            <label
                              key={tag}
                              style={{
                                marginRight: 10,
                                backgroundColor: "#B9D9EB",
                                padding: 5,
                                borderRadius: 5,
                                marginBlock: 20,
                                opacity: 0.6,
                                fontSize: 10,
                              }}
                              className="story-tags"
                            >{`#${tag}`}</label>
                          );
                        })}
                      </Td>
                      <Td>
                        <Switch size="sm" isChecked={item.public} disabled />
                      </Td>

                      <Td>
                        <NavLink
                          to={`/MyStories/addstories/${item.storyId}`}
                          state={{ story: item }}
                          style={{ marginRight: 10 }}
                        >
                          <AiFillEdit />
                        </NavLink>
                        <button
                          onClick={() => {
                            onDelete(index);
                          }}
                        >
                          <AiFillDelete />
                        </button>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th w={"15%"}>Date</Th>
                  <Th w={"15%"}>Title</Th>
                  <Th w={"15%"}>Story Cover Image</Th>
                  <Th w={"10%"}>Tags</Th>
                  <Th w="10%">Public / Private</Th>
                  <Th w={"20%"}>Actions</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        ) : (
          <div
            style={{
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Heading>No Story Found</Heading>
          </div>
        )}
      </div>
      {currentPost && (
        <StoryModal item={currentPost} isOpen={isOpen} onClose={onClose} />
      )}
    </div>
  );
};

export default MyStories;
