import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { RiEditLine } from "react-icons/ri";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useProductStore } from "../store/product";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const { handleDelte } = useProductStore();
  const toas = useToast();

  const handleDeleteProducto = async (id) => {
    const { success, message } = await handleDelte(id);
    if (!success) {
      toas({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toas({
        title: "Success",
        description: message,
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
          <IconButton icon={<RiEditLine />} colorScheme="blue" />
          <IconButton
            icon={<MdOutlineDeleteOutline />}
            onClick={() => handleDeleteProducto(product._id)}
          />
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
