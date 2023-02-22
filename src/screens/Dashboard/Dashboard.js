import {
  Avatar,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Tag,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { localStorageKey } from "../../utils/Constant";
import "./Dashboard.css";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import { BsChevronDown } from "react-icons/bs";
import moment from "moment";

const logo = require("../../logo.png");
const Dashboard = () => {
  const { params1 } = useParams();
  console.log("userName", params1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [allStories, setAllStories] = useState([]);
  const [data, setData] = useState([]);
  const [currPage, setCurrPage] = useState(0);
  const [userList, setUserList] = useState([]);
  const [{ user, toDate, fromdate }, setStoryFilter] = useState({
    user: {},
    fromdate: "",
    toDate: "",
  });
  const [date, setDate] = useState([new Date(), new Date()]);

  const getStories = useCallback(
    (id = user?.id, startDate = fromdate, endDate = toDate) => {
      const getStory = JSON.parse(
        localStorage.getItem(localStorageKey.STOYRIES)
      );
      const storyData = getStory.filter((st) => {
        const conditions = [];
        if (id) {
          conditions[0] = st.userData.userId === id;
        }
        if (startDate && endDate) {
          conditions[1] = st.createdAt >= startDate && st.createdAt <= endDate;
        }
        return conditions.every((conditions) => {
          if (conditions) {
            return true;
          }
          return false;
        });
      });

      console.log("storyData", storyData);
      if (user?.id || fromdate !== "" || toDate !== "") {
        setAllStories(storyData);
      } else {
        setAllStories(getStory);
      }
    },
    [fromdate, toDate, user?.id]
  );

  useEffect(() => {
    if (params1) {
      const str = params1.split("_");
      console.log("str", str);
      setStoryFilter({ user: str[1], fromdate, toDate });
    }
  }, []);

  useEffect(() => {
    const userLognInStatus = JSON.parse(
      localStorage.getItem(localStorageKey.ISLOGGEDIN)
    );
    const users = JSON.parse(localStorage.getItem(localStorageKey.USERDATA));
    setIsLoggedIn(userLognInStatus);
    setUserList(users);
    getStories();
  }, [getStories, isLoggedIn]);

  const getData = useCallback(async () => {
    const response = await axios.get(
      `https://api.instantwebtools.net/v1/passenger?page=${currPage}&size=8`
    );
    const result = response?.data?.data;
    if (currPage) {
      setData((prev) => [...prev, ...result]);
    } else {
      setData(result);
    }
  }, [currPage]);

  useEffect(() => {
    // getData();
  }, [getData]);

  const handleScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setCurrPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // window.addEventListener("scroll", handleScroll);
    // return () => window.addEventListener("scroll", handleScroll);
  }, []);
  // console.log("s", storyFilter);

  return (
    <div>
      <nav>
        <div className="container main-nav flex">
          <a href="/" className="company-logo">
            <img src={logo} alt="this is my company logo" />
          </a>
          <div className="nav-links">
            <ul className="flex">
              {isLoggedIn ? (
                <>
                  <li>
                    <NavLink
                      to="/MyStories"
                      className="hover-link secondary-button"
                    >
                      My Stories
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="hover-link primary-button"
                      onClick={() => {
                        setIsLoggedIn(false);
                        localStorage.setItem(localStorageKey.ISLOGGEDIN, false);
                      }}
                    >
                      Log Out
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      to="/signin"
                      className="hover-link secondary-button"
                    >
                      Sign in
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/signup" className="hover-link primary-button">
                      Sign up
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <div className="filter-container">
        <DateRangePicker
          className="calender-container"
          onChange={(d) => {
            console.log("toDate", moment(d[0]).format());
            console.log("fromDate", moment(d[1]).format());
            setStoryFilter({
              user: user,
              fromdate: moment(d[0]).valueOf(),
              toDate: moment(d[1]).valueOf(),
            });
            <NavLink to={`/${"21-01-2023"}`} />;
            setDate(d);
          }}
          value={date}
        />

        <Menu>
          <MenuButton as={Button} rightIcon={<BsChevronDown />}>
            {user?.name ? user?.name : "Users List"}
          </MenuButton>
          <MenuList>
            {userList.map((ele, index) => {
              return (
                <MenuItem
                  key={index.toString()}
                  minH="48px"
                  onClick={() => {
                    setStoryFilter({
                      user: { id: ele.userId, name: ele.name },
                      fromdate,
                      toDate,
                    });
                  }}
                >
                  <NavLink
                    to={`/user/${ele.name}_${ele.userId}`}
                    style={{ marginRight: 10 }}
                  >
                    <Avatar
                      size={"sm"}
                      backgroundColor={"#B9D9EB"}
                      name={ele.name}
                      src="https://bit.ly/broken-link"
                      color={"black"}
                      mr={3}
                    />
                    <span>{ele.name}</span>
                  </NavLink>
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
        <NavLink to={"/"}>
          <Button
            bg={"#B9D9EB"}
            onClick={() => {
              setDate([new Date(), new Date()]);
              setStoryFilter({
                user: {},
                toDate: "",
                fromdate: "",
              });
            }}
          >
            Clear Filter
          </Button>
        </NavLink>
      </div>
      <div className="flex-container">
        {allStories.map((item, index) => {
          return (
            <div className="flex-child" key={index.toString()}>
              {/* <Card maxW="sm">
                <CardBody>
                  <Image
                    boxSize="200px"
                    src={item.airline[0].logo}
                    alt="Green double couch with wooden legs"
                    borderRadius="lg"
                  />
                  <Stack mt="6" spacing="3">
                    <Heading size="md">{item.name}</Heading>
                    <Text>
                      This sofa is perfect for modern tropical spaces, baroque
                      inspired spaces, earthy toned spaces and for people who
                      love a chic design with a sprinkle of vintage design.
                    </Text>
                    <Text color="blue.600" fontSize="2xl">
                      {index + 1}
                    </Text>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <ButtonGroup spacing="2">
                    <Button variant="solid" colorScheme="blue">
                      <a
                        href={`https://${item.airline[0].website}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.airline[0].website}
                      </a>
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </Card> */}
              <Card maxW="sm">
                <CardBody>
                  <Wrap mb={2} w={345}>
                    <WrapItem
                      justifyContent={"space-between"}
                      display="flex"
                      // bg={"pink"}
                      width="100%"
                      alignItems={"center"}
                    >
                      <WrapItem alignItems={"center"}>
                        <Avatar
                          backgroundColor={"#B9D9EB"}
                          name={item.userData.name}
                          src="https://bit.ly/broken-link"
                          color={"black"}
                        />
                        <Heading as="h3" size="md" ml={3}>
                          {item.userData.name}
                        </Heading>
                      </WrapItem>
                      <Text fontSize="xs">
                        {moment(item.createdAt).format("MMM D yyyy")}
                      </Text>
                    </WrapItem>
                  </Wrap>

                  <Image
                    src={item.storyImage}
                    alt="Green double couch with wooden legs"
                    borderRadius="lg"
                    w={345}
                  />
                  <Stack mt="6" spacing="3">
                    <Heading size="md">{item.topic}</Heading>
                    <Text>{item.description}</Text>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  {item.tags.map((tag) => {
                    return (
                      <Tag
                        size="sm"
                        key={tag}
                        variant="solid"
                        style={{
                          marginRight: 15,
                          textTransform: "uppercase",
                          fontSize: 10,
                          opacity: 0.6,
                          backgroundColor: "#B9D9EB",
                          color: "black",
                        }}
                      >
                        #{tag}
                      </Tag>
                    );
                  })}
                </CardFooter>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
