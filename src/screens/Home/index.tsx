import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useQuery } from "react-query";
export const Home = ({ navigation }: any) => {
  const { singned, auth, logout, user, getOrderBydId, orders } =
    useContext(UserContext);
  const [productOrderList, setProductOrderList] = useState<any>([]);
  const [userInfos, setUserInfos] = useState<any>([]);

  useEffect(() => {
    auth();
    if (!singned) {
      navigation.navigate("SingUp");
    }
    setUserInfos(user);
  }, [singned, userInfos]);

  async function handlePress() {
    logout();
    navigation.navigate("SingUp");
  }

  const productsQuery = useQuery(["products"], async () => {
    await getOrderBydId();
    const productOrderListI = orders.map((order: any) => order);
    return productOrderListI.map((item: any) => item.products);
  });

  if (productsQuery.isError) {
    return <Text>Erro ao obter os produtos</Text>;
  }

  function renderProductList() {
    const productOrderListI = orders.map((order: any) => order);
    setProductOrderList(productOrderListI.map((item: any) => item.products));
  }

  return (
    <View style={styles.homeScreen}>
      <Text>{userInfos?.email}</Text>
      <Text>HOME</Text>
      <Pressable onPress={() => navigation.navigate("Cam")} style={{}}>
        <Text style={{ color: "black" }}>Camera</Text>
      </Pressable>
      <Pressable onPress={handlePress}>
        <Text>Logout</Text>
      </Pressable>
      <Text style={{ marginTop: 100 }}>Carrinho</Text>
      <View>
        {productsQuery.isLoading ? (
          <Text>Carregando...</Text>
        ) : productsQuery.data ? ( // Check if data is defined
          <FlatList
            data={productsQuery.data[0]}
            renderItem={({ item }) => (
              <View>
                <Text>{item.name}</Text>
                <Text>{item.price}</Text>
              </View>
            )}
          />
        ) : (
          <Text>No products available.</Text>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  homeScreen: {
    alignItems: "center",
    marginTop: 100,
  },
  productsContainer: {
    marginTop: 50,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 30,
  },
});
