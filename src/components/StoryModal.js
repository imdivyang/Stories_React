import {
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tag,
  Text,
} from "@chakra-ui/react";
import React from "react";

const StoryModal = (props) => {
  const { item, isOpen, onClose } = props;

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{item.topic}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Image
            boxSize="100%"
            src={item.storyImage}
            alt="Dan Abramov"
            borderRadius="2xl"
          />
          <Text fontSize="md" style={{ marginTop: 20 }}>
            {item.description}
          </Text>
        </ModalBody>
        <ModalFooter>
          {item.tags.map((tag) => {
            return (
              <Tag
                size={"md"}
                key={tag}
                variant="solid"
                colorScheme="teal"
                style={{
                  marginLeft: 15,
                  textTransform: "uppercase",
                  fontSize: 10,
                  opacity: 0.6,
                  backgroundColor: "#B9D9EB",
                  color: "black",
                }}
              >
                {tag}
              </Tag>
            );
          })}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default StoryModal;
