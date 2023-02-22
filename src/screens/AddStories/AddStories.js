import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Switch,
  Tag,
  TagCloseButton,
  TagLabel,
  Textarea,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import InputFields from "../../components/InputFields";
import "./AddStories";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { localStorageKey } from "../../utils/Constant";
import { storySchema } from "../../helpers/Validation";
const logo = require("../../logo.png");

const AddStories = (props) => {
  const { state } = useLocation();
  const [imagePreview, setImagePreview] = useState("");
  const [uuid, setUuid] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unique_id = uuidv4();
    const currentUser = JSON.parse(
      localStorage.getItem(localStorageKey.CURRENTUSER)
    );
    setCurrentUser(currentUser);
    setUuid(unique_id);
  }, []);

  const formik = useFormik({
    initialValues: {
      topic: "",
      description: "",
      createdAt: moment().valueOf(),
      public: true,
      storyImg: "",
      tags: "",
    },
    validationSchema: storySchema,
    onSubmit: (_values, actions) => {
      addStories(actions);
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  const setInitialData = useCallback(() => {
    if (state) {
      const { story } = state;
      formik.values.topic = story.topic;
      formik.values.description = story.description;
      setTags(story.tags);
      setImagePreview(story.storyImage);
      formik.values.public = story.public;
      formik.values.createdAt = story.createdAt;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setInitialData();
  }, [setInitialData]);

  const addStories = (actions) => {
    const storyObj = {
      userData: currentUser ? currentUser : {},
      topic: formik.values.topic,
      description: formik.values.description,
      createdAt: moment(formik.values.createdAt).valueOf(),
      public: formik.values.public,
      tags: tags,
      storyId: uuid,
      storyImage: imagePreview,
    };

    const getLocalStorageData = localStorage.getItem(localStorageKey.STOYRIES);
    const convert = getLocalStorageData ? JSON.parse(getLocalStorageData) : [];

    if (convert) {
      let data = [];
      if (state?.story) {
        const index = convert.findIndex(
          (e) => e.storyId === state.story.storyId
        );
        convert[index] = storyObj;
        data = convert;
      } else {
        console.log("storyObj", storyObj);
        data = [storyObj, ...convert];
      }
      console.log(data);
      localStorage.setItem(localStorageKey.STOYRIES, JSON.stringify(data));
    }

    actions.setSubmitting(false);
    actions.resetForm();
    setImagePreview("");
    setUuid("");
    navigate(-1);
  };

  const convertInBase64 = (file) => {
    const url = file.target.files;
    const reader = new FileReader();
    reader.readAsDataURL(url[0]);
    reader.onload = () => {
      setImagePreview(reader.result);
    };
  };

  return (
    <>
      <div className="my-story-nav-bar">
        <NavLink to="/" className="my-story-company-logo">
          <img className="" src={logo} alt="this is my company logo" />
        </NavLink>
      </div>
      <div className="sign-up-container">
        <Heading as="h2" size="xl" noOfLines={1}>
          Write Your Story
        </Heading>
        <div className="sign-up-form-container">
          <form
            onSubmit={formik.handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 20 }}
          >
            <InputFields
              formik={formik}
              type="text"
              id="topic"
              lable="Story Title"
            />

            <FormControl isInvalid={formik.errors.description}>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Description"
                id="description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
              />
              <FormErrorMessage>{formik.errors.description}</FormErrorMessage>
            </FormControl>

            <div style={{}}>
              <FormLabel>Story Cover Image</FormLabel>
              <Input
                variant="unstyled"
                type={"file"}
                style={{ paddingBlock: 10 }}
                id="storyImg"
                onChange={(e) => {
                  convertInBase64(e);
                }}
              />
            </div>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="story priview"
                className="story-image"
                style={{ width: 200, alignSelf: "center" }}
              />
            )}
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              <InputFields
                formik={formik}
                type="text"
                id="tags"
                lable="Tags"
                // onKeyDown={(event) => {
                //   if (event.key === "Enter") {
                //     console.log(formik.values.tags);
                //     setTags([...tags, formik.values.tags]);
                //   }
                // }}
              />
              <Button
                mt={4}
                colorScheme="facebook"
                type="button"
                style={{ marginLeft: 20 }}
                onClick={() => {
                  if (formik.values.tags !== "") {
                    setTags([...tags, formik.values.tags]);
                    formik.values.tags = "";
                  }
                }}
              >
                add
              </Button>
            </div>
            <div>
              {tags.map((tag, index) => {
                return (
                  <Tag
                    size={"md"}
                    key={tag}
                    borderRadius="full"
                    variant="solid"
                    colorScheme="facebook"
                    style={{ marginRight: 15, marginBlock: 5 }}
                  >
                    <TagLabel>{tag}</TagLabel>
                    <TagCloseButton
                      onClick={() => {
                        const temp = [...tags];
                        temp.splice(index, 1);
                        setTags(temp);
                      }}
                    />
                  </Tag>
                );
              })}
            </div>
            <div>
              <FormLabel>Public</FormLabel>
              <Switch
                size="md"
                id="public"
                value={formik.values.public}
                isChecked={formik.values.public}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <FormLabel>CreatedAt</FormLabel>
              <Input
                value={moment(formik.values.createdAt).format(
                  "MMMM Do YYYY, h:mm:ss a"
                )}
                disabled
              />
            </div>
            <Button mt={4} colorScheme="facebook" type="submit">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddStories;
