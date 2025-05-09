import React, { useEffect } from "react";
import { Container, Text, VStack, SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../componentes/ProductCard";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("productos", products);

  return (
    <>
      <Container maxW={"container.xl"} py={12}>
        <VStack spacing={8}>
          <Text
            fontSize={"30"}
            fontWeight={"bold"}
            bgGradient={"lineaer(to-r, cyan.400, blue.500)"}
            bgClip={"text"}
            textAlign={"center"}
          >
            Productos de la tienda
          </Text>

          <SimpleGrid
            column={{
              base: 1,
              md: 2,
              lg: 3,
            }}
            spacing={10}
            w={"full"}
          >
            {products?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>

          {products.length === 0 && (
            <Text
              fontSize="xl"
              textAlign={"center"}
              fontWeight={"bold"}
              color="gray.500"
              p={4}
            >
              {" "}
              Producto no existe
              <Link to={"/create"}>
                <Text
                  as="span"
                  p={4}
                  color="blue.500"
                  _hover={{ textDecoration: "underline" }}
                >
                  Create Producto
                </Text>
              </Link>
            </Text>
          )}
        </VStack>
      </Container>
    </>
  );
};

export default HomePage;
