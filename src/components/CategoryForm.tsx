import { Reducer, useEffect, useMemo, useReducer, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import {
  Button,
  Chip,
  Divider,
  Icon,
  Menu,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import Emojis from "unicode-emoji-json/data-ordered-emoji.json";
import Emojiss from "emojilib";
import { FlatList } from "react-native-gesture-handler";
import { category } from "../types/dbTypes";
import { useAuthStore } from "../stores/authStore";
import { addCategory } from "../bl/dbFunctions";

interface CategoryFormPropsTypes{
  close: any,
  cat: category
}

const CategoryForm = ({ close, cat }: CategoryFormPropsTypes) => {
  const [search, setSearch] = useState("");
  const [emojis, setEmojis] = useState<string[]>();
  const [typeDropdown, setTypeDropdown] = useState(false);
  const [menuWidth, setMenuWidth] = useState(0);

  const user = useAuthStore((state) => state.user);

  const colors = useMemo(
    () => [
      "#FF6F61",
      "#6B5B95",
      "#88B04B",
      "#F7CAC9",
      "#92A8D1",
      "#F0E68C",
      "#034F84",
      "#F7786B",
      "#DEAB90",
      "#79C753",
    ],
    []
  );

  const theme = useTheme();

  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    selectColor(color);
  };

  const selectColor = (color: string) => {
    categoryDispatch({ payload: color, type: "color" });
    setShowColors(false);
  };

  type IssuesAction = {
    type:
      | "name"
      | "type"
      | "color"
      | "emoji"
      | "reset"
      | "edit"
      | "totalAmount";
    payload: any;
  };

  const categoryReducer: Reducer<category, IssuesAction> = (
    state: category,
    action: any
  ) => {
    switch (action.type) {
      case "name":
        return { ...state, name: action.payload };
      case "type":
        return { ...state, type: action.payload };
      case "color":
        return { ...state, color: action.payload };
      case "emoji":
        return { ...state, emoji: action.payload };
      case "totalAmount":
        return { ...state, totalAmount: action.payload != "" ? Number(action.payload) : 0 };
      case "reset":
        return cat;
      case "edit":
        return action.payload;
      default:
        return state;
    }
  };

  const [category, categoryDispatch] = useReducer(categoryReducer, cat);

  // extra
  const [showEmojis, setShowEmojis] = useState(false);
  const [showColors, setShowColors] = useState(false);

  const keywordToEmojiMap = useMemo(() => {
    var keywordToEmojiMap: Record<string, string[]> = {};
    for (const emoji in Emojiss) {
      Emojiss[emoji].forEach((keyword) => {
        if (!keywordToEmojiMap[keyword]) {
          keywordToEmojiMap[keyword] = [];
        }
        keywordToEmojiMap[keyword].push(emoji);
      });
    }
    return keywordToEmojiMap;
  }, []);

  const addCategoryToFB = async () => {
    if (category.name != "") {
      addCategory(category, user?.uid ?? "");
      categoryDispatch({ type: "reset", payload: "" });
      // console.log(result);
      close();
    }
  };

  //   const getColorFromValue = useMemo((val) => {
  //     // We'll map 1-100 to 0-360 degrees (hue)
  //     const hue = Math.floor((val / 100) * 360);
  //     // Using HSL to get vibrant colors
  //     return `hsl(${hue}, 100%, 50%)`;
  //   }, []);

  return (
    <View>
      <View style={{ gap: 10 }}>
        <TextInput
          label="Name"
          //   mode="outlined"
          value={category.name}
          onChangeText={(text) =>
            categoryDispatch({ type: "name", payload: text })
          }
        />
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => setTypeDropdown(true)}
          style={{
            padding: 15,
            backgroundColor: theme.colors.surfaceVariant,
            borderRadius: theme.roundness,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
          onLayout={({
            nativeEvent: {
              layout: { width },
            },
          }) => {
            setMenuWidth(width);
          }}
        >
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Text style={{ color: theme.colors.secondary }}>Type</Text>
            <Text>{category.type ? category.type : "Select category"}</Text>
          </View>
          <Icon size={20} source={"chevron-down"} />
        </TouchableOpacity>
        <Menu
          visible={typeDropdown}
          style={{ width: menuWidth }}
          onDismiss={() => setTypeDropdown(false)}
          anchor={<View style={{ height: 1 }} />}
          anchorPosition="bottom"
        >
          <Menu.Item
            title="Credit"
            onPress={() => {
              categoryDispatch({ type: "type", payload: "Credit" });
              setTypeDropdown(false);
            }}
          />
          <Menu.Item
            title="Debit"
            onPress={() => {
              categoryDispatch({ type: "type", payload: "Debit" });
              setTypeDropdown(false);
            }}
          />
        </Menu>
        <TextInput
          value={category.totalAmount != 0 ? category.totalAmount?.toString() : ""}
          onChangeText={(text) =>
            categoryDispatch({ payload: text, type: "totalAmount" })
          }
          label="Amount"
          placeholder="Enter initial amount"
          keyboardType="decimal-pad"
        />
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Chip
            onPress={() => {
              setShowEmojis(!showEmojis);
            }}
            style={{ flex: 1 }}
          >
            Select emoji <Text>{category.emoji}</Text>
          </Chip>
          <Chip
            onPress={() => {
              setShowColors(!showColors);
            }}
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text>Select color{"  "}</Text>
            <View
              style={{
                backgroundColor: category.color,
                borderRadius: 30,
                marginRight: 15,
                width: 30,
                height: 12,
              }}
            ></View>
          </Chip>
        </View>
        {showEmojis && (
          <EmojiModal
            emojis={emojis}
            search={search}
            setSearch={setSearch}
            setEmojis={setEmojis}
            setEmoji={(emoji: string) =>
              categoryDispatch({ type: "emoji", payload: emoji })
            }
            keywordToEmojiMap={keywordToEmojiMap}
            close={() => setShowEmojis(false)}
          />
        )}
        {showColors && (
          <>
            <FlatList
              horizontal
              scrollEnabled
              keyboardDismissMode="on-drag"
              data={colors}
              contentContainerStyle={{ gap: 20, marginBottom: 5 }}
              keyExtractor={(i) => i}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    style={{
                      height: 30,
                      width: 30,
                      backgroundColor: item,
                      borderRadius: 40,
                    }}
                    onPress={() => {
                      selectColor(item);
                    }}
                  />
                );
              }}
            />
            <Divider />
            <Button
              mode="contained-tonal"
              style={{ marginTop: 5 }}
              onPress={generateRandomColor}
            >
              Set random color
            </Button>
          </>
        )}
        <Button mode="contained" onPress={addCategoryToFB}>
          {category?.id ? "Update" : "Add"}
        </Button>
      </View>
    </View>
  );
};

export default CategoryForm;

const EmojiModal = ({
  search,
  setSearch,
  emojis,
  setEmojis,
  keywordToEmojiMap,
  setEmoji,
  close,
}: any) => {
  const theme = useTheme();
  const [loadingEmojis, setLoadingEmojis] = useState(false);

  function searchEmoji(keyword: string): string[] {
    const results = new Set<string>();

    for (const key in keywordToEmojiMap) {
      if (key.startsWith(keyword)) {
        keywordToEmojiMap[key].forEach((emoji: string) => results.add(emoji));
      }
    }
    return Array.from(results);
  }

  useEffect(() => {
    setLoadingEmojis(true);
    if (search.length > 0) {
      var sub = setTimeout(() => {
        setEmojis(Emojis.filter((e) => searchEmoji(search).includes(e)));
        setLoadingEmojis(false);
      }, 500);
    } else {
      setEmojis(Emojis.slice(0, 9));
      setLoadingEmojis(false);
    }
    return () => clearTimeout(sub);
  }, [search]);

  return (
    <View>
      <TextInput
        mode="outlined"
        placeholder="search for more emojis"
        value={search}
        onChangeText={(text) => setSearch(text.toLowerCase())}
      />
      <View>
        {loadingEmojis ? (
          <Text style={{ marginVertical: 10 }}>Loading emojis...</Text>
        ) : (
          <FlatList
            scrollEnabled
            horizontal
            contentContainerStyle={{ gap: 10, marginVertical: 10 }}
            data={emojis}
            keyExtractor={(i) => i}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={{
                    padding: 10,
                    backgroundColor: theme.colors.surfaceVariant,
                    borderRadius: 10,
                  }}
                  onPress={() => {
                    setEmoji(item);
                    close();
                    setSearch("");
                  }}
                >
                  <Text variant="titleMedium">{item}</Text>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>
    </View>
  );
};
