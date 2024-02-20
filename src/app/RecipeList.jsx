import React, { useState } from "react"
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  Pressable,
} from "react-native"
import Header from "../components/Header"
import SearchFilter from "../components/SearchFilter"
import CategoriesFilter from "../components/CategoriesFilter"
import RecipeCard from "../components/RecipeCard"
import { colors, recipeList } from "../../Constant"
import { useNavigation } from "@react-navigation/native"
import { FontAwesome } from "@expo/vector-icons"

export default function RecipeList() {
  const navigation = useNavigation()
  const [filteredRecipes, setFilteredRecipes] = useState(recipeList)

  const handleSearch = (text) => {
    const filtered = recipeList.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    )
    setFilteredRecipes(filtered)
  }

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 16, marginVertical: 39 }}>
      <Header headerText={"Greetings"} headerIcon={"bell-o"} />
      <SearchFilter
        icon="search"
        placeholder={"Search"}
        onSearch={handleSearch}
      />

      <View style={{ marginTop: 22 }}>
        {/* Can get rid of it if I want to */}
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>Categories</Text>
        <CategoriesFilter />
      </View>

      <View style={{ marginTop: 22, flex: 1 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>Recipes</Text>
        <FlatList
          data={filteredRecipes}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                navigation.navigate("RecipeDetails", { item: item })
              }
              style={{
                right: 20,
                backgroundColor: "colors.COLOR_LIGHT",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 7,
                borderRadius: 16,
                marginVertical: 16,
                alignItems: "center",
                paddingHorizontal: 8,
                paddingVertical: 26,
                marginHorizontal: 8,
              }}
            >
              <Image
                source={item.image}
                style={{ width: 150, height: 150, resizeMode: "center" }}
              />
              <Text>{item.name}</Text>
              <View style={{ flexDirection: "row", marginTop: 8 }}>
                <Text>{item.time}</Text>
                <Text> | </Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ marginRight: 4 }}>{item.rating}</Text>
                  <FontAwesome
                    name="star"
                    size={16}
                    color={colors.COLOR_PRIMARY}
                  />
                </View>
              </View>
            </Pressable>
          )}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  )
}
