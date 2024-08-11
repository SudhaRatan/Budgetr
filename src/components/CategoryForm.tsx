import { Reducer, useEffect, useMemo, useReducer, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import {
  Button,
  Chip,
  Menu,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import Emojis from "unicode-emoji-json/data-ordered-emoji.json";
import Emojiss from "emojilib";
import { FlatList } from "react-native-gesture-handler";
import { category } from "../types/dbTypes";

const CategoryForm = () => {
  const [search, setSearch] = useState("");
  const [emojis, setEmojis] = useState<string[]>();
  const [typeDropdown, setTypeDropdown] = useState(false);
  const [menuWidth, setMenuWidth] = useState(0);

  const theme = useTheme();

  const cat: category = {
    name: "",
    type: "debit",
    color: "",
    emoji: "",
    totalAmount: 0,
  };

  type IssuesAction = {
    type: "name" | "type" | "color" | "emoji";
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
      default:
        return state;
    }
  };

  const [category, categoryDispatch] = useReducer(categoryReducer, cat);

  // extra
  const [showEmojis, setShowEmojis] = useState(false);

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
        <Text
          onPress={() => setTypeDropdown(true)}
          style={{
            padding: 15,
            backgroundColor: theme.colors.surfaceVariant,
            borderRadius: theme.roundness,
          }}
          onLayout={({
            nativeEvent: {
              layout: { width },
            },
          }) => {
            setMenuWidth(width);
          }}
        >
          {category.type ? category.type : "Select category"}
        </Text>
        <Menu
          visible={typeDropdown}
          style={{ width: menuWidth }}
          onDismiss={() => setTypeDropdown(false)}
          anchor={<View style={{ height: 1 }} />}
          anchorPosition="bottom"
        >
          <Menu.Item
            title="credit"
            onPress={() => {
              categoryDispatch({ type: "type", payload: "credit" });
              setTypeDropdown(false);
            }}
          />
          <Menu.Item
            title="debit"
            onPress={() => {
              categoryDispatch({ type: "type", payload: "debit" });
              setTypeDropdown(false);
            }}
          />
        </Menu>

        <View style={{ flexDirection: "row", gap: 10 }}>
          <Chip
            onPress={() => {
              setShowEmojis(!showEmojis);
            }}
            style={{ flex: 1 }}
          >
            Select emoji <Text>{category.emoji}</Text>
          </Chip>
          <Chip onPress={() => {}} style={{ flex: 1 }}>
            Select color
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
        <Button mode="contained">Add</Button>
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
        onChangeText={setSearch}
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
