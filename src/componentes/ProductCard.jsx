import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { RiEditLine } from "react-icons/ri";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useProductStore } from "../store/product";

const ProductCard = ({ product }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updateProduct, setUpdateProduct] = useState(product);
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const { handleDelte, updateProductHandle } = useProductStore();
  const toast = useToast();

  const handleDeleteProducto = async (id) => {
    const { success, message } = await handleDelte(id);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpdateProducto = async (id, updateProduct) => {
    const { success, message } = await updateProductHandle(id, updateProduct);
    onClose();
    if (!success) {
      toast({
        title: "Error",
        description: "No se pudo editar",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: "Editado con exito",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      shadow={"lg"}
      rounded="lg"
      overflow={"hidden"}
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={40}
        w="full"
        objectFit="cover"
      />

      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          $: {product.price}
        </Text>
        <HStack spacing={2}>
          <IconButton
            onClick={onOpen}
            icon={<RiEditLine />}
            colorScheme="blue"
          />
          <IconButton
            icon={<MdOutlineDeleteOutline />}
            onClick={() => handleDeleteProducto(product._id)}
          />
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <Input
                placeholder="Product Name"
                name="name"
                value={updateProduct.name}
                onChange={(e) =>
                  setUpdateProduct({ ...updateProduct, name: e.target.value })
                }
              />
              <Input
                placeholder="Product Price"
                name="price"
                value={updateProduct.price}
                onChange={(e) =>
                  setUpdateProduct({ ...updateProduct, price: e.target.value })
                }
              />
              <Input
                placeholder="Update Image"
                name="image"
                value={updateProduct.image}
                onChange={(e) =>
                  setUpdateProduct({ ...updateProduct, image: e.target.value })
                }
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdateProducto(product._id, updateProduct)}
            >
              Update
            </Button>
            <Button colorScheme="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
