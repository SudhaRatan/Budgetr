import {
  Dimensions,
  Keyboard,
  Linking,
  Pressable,
  StyleSheet,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  Button,
  Chip,
  Icon,
  MD3Theme,
  Switch,
  Text,
  useTheme,
} from "react-native-paper";
import { category, transaction } from "../types/dbTypes";
import { useDataStore } from "../stores/dataStore";
import BlinkingCursor from "./BlinkingCursor";
import { ScrollView } from "react-native-gesture-handler";
import PressableWithBorder from "./PressableWithBorder";
import CategoryDropdown from "./CategoryDropdown";
import { useAuthStore } from "../stores/authStore";
import { addTransaction } from "../bl/dbFunctions";
import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";

interface TransactionFormType {
  categoryToPass: category;
  closeForm: () => void;
}

const TransactionForm = ({
  categoryToPass,
  closeForm,
}: TransactionFormType) => {
  const user = useAuthStore((state) => state.user);
  const theme = useTheme();
  const { width, height } = Dimensions.get("screen");
  const categories = useDataStore((state) => state.categories);
  const debitCategories = useDataStore((state) => state.debitCategories);

  const [categoryFrom, setCategoryFrom] = useState<category>(categories![0]);
  const [categoryTo, setCategoryTo] = useState<category>(categoryToPass);

  const [containerWidth, setContainerWidth] = useState(0);
  const [keyboardShown, setKeyboardShown] = useState<boolean>(false);

  const [amount, setAmount] = useState<string>("");
  const [subCategory, setSubCategory] = useState<string>("");

  const [cam, setCam] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [upi, setUpi] = useState<string | null>(null);
  const [flash, setFlash] = useState(false);
  const [zoom, setZoom] = useState(false);

  const setCategoryFromObj = (id: string) => {
    setCategoryFrom(categories!.find((c) => c.id === id)!);
  };

  const setCategoryToObj = (id: string) => {
    setCategoryTo(debitCategories!.find((c) => c.id === id)!);
  };
  const keyWidth = containerWidth / 4 - 2;
  const style = styles(theme, keyWidth, height);

  const AddTransaction = () => {
    if (amount == "" || Number(amount) == 0) {
      ToastAndroid.show("Enter amount", ToastAndroid.SHORT);
      return;
    }
    addTransaction(
      {
        amount: Number(amount),
        type: "Debit",
        categoryFromId: categoryFrom.id!,
        categoryToId: categoryTo.id!,
        uid: user?.uid!,
        subcategory: subCategory,
      },
      user!.uid
    );
    if (upi) {
      // var url = new URL(upi);
      // url.searchParams.delete("aid");
      // url.searchParams.delete("sign");
      // url.searchParams.delete("mode");
      // url.searchParams.delete("purpose");
      // url.searchParams.delete("mc");
      // const id = url.searchParams.get("pa")?.toString();
      // const name = url.searchParams.get("pn")?.toString();

      // url.searchParams.append("am", amount); // Add amount to UPI intent
      // subCategory != "" && url.searchParams.append("tn", subCategory); // Add note to UPI intent

      // Linking.openURL(url.toString()).catch((err) => {
      //   console.log(err);
      //   ToastAndroid.show("Failed to open UPI app", ToastAndroid.SHORT);
      // });
      // console.log(url.toString());
      try {
        const url = new URL(upi);
        url.searchParams.delete("aid");
        url.searchParams.delete("sign");
        url.searchParams.delete("mode");
        url.searchParams.delete("purpose");
        url.searchParams.delete("mc");
        url.searchParams.delete("orgid");

        // Add required parameters
        // url.searchParams.append('pa', payeeAddress);
        // url.searchParams.append('pn', payeeName);
        url.searchParams.append("am", amount);
        url.searchParams.append("cu", "INR");

        // Add optional parameters if provided
        if (subCategory) url.searchParams.append("tn", subCategory);

        console.log("UPI URL:", url.toString());

        // Open the URL
        Linking.openURL(url.toString());
        // Linking.openURL(
        //   "upi://pay?pa=rattankumar1112@ybl&pn=DK Bose&mc=0000&tr=123456789ABCDEFG&tn=HelloWorld&am=11&cu=INR"
        // );
      } catch (error) {
        console.error("Failed to open UPI app:", error);
        ToastAndroid.show("Failed to open UPI app", ToastAndroid.SHORT);
      }
      setUpi(null);
    }
    setAmount("");
    setSubCategory("");
    closeForm();
  };

  // keyboard event handler
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardShown(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardShown(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  // category to handler
  useEffect(() => {
    setCategoryTo(categoryToPass);
  }, [categoryToPass]);

  const handleScanQR = () => {
    if (!permission?.granted) {
      requestPermission();
      return;
    }
    setCam(true);
  };

  const closeCamera = () => {
    setCam(false);
  };

  const onBarcodeScan = ({ data }: BarcodeScanningResult) => {
    setUpi(data);
    closeCamera();
    // console.log(new URL(data).searchParams.get("pn"));
  };

  const toggleZoom = () => {
    setZoom(!zoom);
  };

  return (
    <ScrollView
      contentContainerStyle={style.mainContainer}
      style={{ maxHeight: height * 0.85 }}
      onLayout={({
        nativeEvent: {
          layout: { width },
        },
      }) => {
        if (!containerWidth) setContainerWidth(width);
      }}
    >
      {/* Category dropwowns */}
      <View style={style.categoryDropdownCont}>
        <CategoryDropdown
          listItems={categories!.map((c) => ({ id: c.id, title: c.name }))}
          listIcons={categories!.map((c) => ({ id: c.id, src: c.emoji }))}
          itemOnPress={setCategoryFromObj}
          parent={
            <View
              style={[
                style.categoryDropdown,
                { backgroundColor: categoryFrom?.color },
              ]}
            >
              <View style={style.categoryDropdownInner}>
                <Text>{categoryFrom?.emoji}</Text>
                <Text>{categoryFrom?.name}</Text>
              </View>
              <Icon size={20} source={"chevron-down"} />
            </View>
          }
        />
        <CategoryDropdown
          listItems={debitCategories!.map((c) => ({ id: c.id, title: c.name }))}
          listIcons={debitCategories!.map((c) => ({ id: c.id, src: c.emoji }))}
          itemOnPress={setCategoryToObj}
          parent={
            <View
              style={[
                style.categoryDropdown,
                { backgroundColor: categoryTo?.color },
              ]}
            >
              <View style={style.categoryDropdownInner}>
                <Text>{categoryTo?.emoji}</Text>
                <Text>{categoryTo?.name}</Text>
              </View>
              <Icon size={20} source={"chevron-down"} />
            </View>
          }
        />
      </View>
      <Text style={{ textAlign: "center", color: theme.colors.secondary }}>
        Expenses
      </Text>
      <View
        style={{
          alignSelf: "center",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 30, color: theme.colors.secondary }}>
          &#8377;
        </Text>
        {amount.length > 0 && <Text style={{ fontSize: 40 }}>{amount}</Text>}
        {!keyboardShown && (
          <BlinkingCursor height={50} strokeWidth={2} frequency={500} />
        )}
        {amount.length <= 0 && (
          <Text style={{ fontSize: 40, color: theme.colors.secondary }}>0</Text>
        )}
      </View>
      <TextInput
        placeholder="Add note..."
        multiline={false}
        placeholderTextColor={theme.colors.secondary}
        value={subCategory}
        onChangeText={setSubCategory}
        style={{
          alignSelf: "center",
          color: theme.colors.onSurface,
          fontSize: 16,
        }}
      />
      {upi && (
        <Chip
          closeIcon={"close"}
          onClose={() => setUpi(null)}
          style={{ flexDirection: "row" }}
          mode="flat"
        >
          <Text>Paying: </Text>
          <Text style={{ fontWeight: "bold" }}>
            {new URL(upi).searchParams.get("pn") ??
              new URL(upi).searchParams.get("pa")}
          </Text>
        </Chip>
      )}
      {!keyboardShown && !cam && (
        <View style={{ flexDirection: "row", gap: 0 }}>
          <View
            style={{ flexDirection: "row", flexWrap: "wrap", gap: 2, flex: 3 }}
          >
            <PressableWithBorder
              style={style.keyCap}
              ContainerStyle={style.keyCap}
              onPress={() => {
                setAmount((prev) => prev + "1");
              }}
            >
              <Text style={style.keyCapText}>1</Text>
            </PressableWithBorder>
            <PressableWithBorder
              style={style.keyCap}
              ContainerStyle={style.keyCap}
              onPress={() => {
                setAmount((prev) => prev + "2");
              }}
            >
              <Text style={style.keyCapText}>2</Text>
            </PressableWithBorder>
            <PressableWithBorder
              style={style.keyCap}
              ContainerStyle={style.keyCap}
              onPress={() => {
                setAmount((prev) => prev + "3");
              }}
            >
              <Text style={style.keyCapText}>3</Text>
            </PressableWithBorder>
            <PressableWithBorder
              style={style.keyCap}
              ContainerStyle={style.keyCap}
              onPress={() => {
                setAmount((prev) => prev + "4");
              }}
            >
              <Text style={style.keyCapText}>4</Text>
            </PressableWithBorder>
            <PressableWithBorder
              style={style.keyCap}
              ContainerStyle={style.keyCap}
              onPress={() => {
                setAmount((prev) => prev + "5");
              }}
            >
              <Text style={style.keyCapText}>5</Text>
            </PressableWithBorder>
            <PressableWithBorder
              style={style.keyCap}
              ContainerStyle={style.keyCap}
              onPress={() => {
                setAmount((prev) => prev + "6");
              }}
            >
              <Text style={style.keyCapText}>6</Text>
            </PressableWithBorder>
            <PressableWithBorder
              style={style.keyCap}
              ContainerStyle={style.keyCap}
              onPress={() => {
                setAmount((prev) => prev + "7");
              }}
            >
              <Text style={style.keyCapText}>7</Text>
            </PressableWithBorder>
            <PressableWithBorder
              style={style.keyCap}
              ContainerStyle={style.keyCap}
              onPress={() => {
                setAmount((prev) => prev + "8");
              }}
            >
              <Text style={style.keyCapText}>8</Text>
            </PressableWithBorder>
            <PressableWithBorder
              style={style.keyCap}
              ContainerStyle={style.keyCap}
              onPress={() => {
                setAmount((prev) => prev + "9");
              }}
            >
              <Text style={style.keyCapText}>9</Text>
            </PressableWithBorder>
            <PressableWithBorder
              style={style.keyCap}
              ContainerStyle={style.keyCap}
              onPress={() => setAmount("")}
            >
              <Text style={style.keyCapText}>C</Text>
            </PressableWithBorder>
            <PressableWithBorder
              style={style.keyCap}
              ContainerStyle={style.keyCap}
              onPress={() => {
                setAmount((prev) => prev + "0");
              }}
            >
              <Text style={style.keyCapText}>0</Text>
            </PressableWithBorder>
            <PressableWithBorder
              style={style.keyCap}
              ContainerStyle={style.keyCap}
              onPress={() => {
                if (!amount.includes(".") && amount.length > 0) {
                  setAmount((prev) => prev + ".");
                }
              }}
            >
              <Text style={style.keyCapText}>.</Text>
            </PressableWithBorder>
          </View>
          <View
            style={{ flexDirection: "row", flexWrap: "wrap", gap: 2, flex: 1 }}
          >
            <PressableWithBorder
              ContainerStyle={style.keyCap}
              style={[
                style.customKey,
                {
                  height: keyWidth,
                  backgroundColor: theme.colors.tertiaryContainer,
                },
              ]}
              onPress={() => {
                setAmount((prev) => prev.slice(0, prev.length - 1));
              }}
            >
              <Icon size={24} source={"backspace-outline"} />
            </PressableWithBorder>
            <PressableWithBorder
              ContainerStyle={style.keyCap}
              style={[
                style.customKey,
                {
                  height: keyWidth,
                  backgroundColor: theme.colors.primaryContainer,
                },
              ]}
            >
              <Icon size={24} source={"calendar-month-outline"} />
            </PressableWithBorder>
            <PressableWithBorder
              onPress={handleScanQR}
              ContainerStyle={style.keyCap}
              style={[
                style.customKey,
                {
                  height: keyWidth,
                  backgroundColor: theme.colors.primaryContainer,
                },
              ]}
            >
              <Icon size={24} source={"qrcode-scan"} />
            </PressableWithBorder>
            <PressableWithBorder
              ContainerStyle={style.keyCap}
              style={[
                style.customKey,
                {
                  height: keyWidth,
                  backgroundColor: theme.colors.onSurface,
                },
              ]}
              onPress={AddTransaction}
            >
              <Icon
                size={24}
                source={"check"}
                color={theme.colors.secondaryContainer}
              />
            </PressableWithBorder>
          </View>
        </View>
      )}
      {/* CameraView */}
      {!keyboardShown && cam && (
        <CameraView
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          facing="back"
          zoom={zoom ? 0.75 : 0.5}
          enableTorch={flash}
          style={{
            flex: 1,
            width: "100%",
            height: width,
            alignItems: "flex-end",
            justifyContent: "space-between",
            position: "relative",
          }}
          onBarcodeScanned={onBarcodeScan}
        >
          <TouchableOpacity
            onPress={closeCamera}
            style={{
              // alignSelf: "flex-end",
              padding: 10,
              backgroundColor: theme.colors.secondaryContainer,
              borderRadius: 10,
              margin: 5,
            }}
          >
            <Icon size={24} source={"close"} />
          </TouchableOpacity>
          <View
            style={{
              alignItems: "center",
              backgroundColor: "#00000050",
              padding: 10,
              flexDirection: "row",
            }}
          >
            <Text style={{ color: theme.colors.secondaryContainer }}>
              Toggle Flash
            </Text>
            <Switch
              value={flash}
              onChange={({ nativeEvent: { value } }) => {
                setFlash(value);
              }}
            />
            <TouchableOpacity
              style={{
                backgroundColor: theme.colors.secondaryContainer,
                padding: 10,
                borderRadius: 10,
              }}
              onPress={toggleZoom}
            >
              <Icon
                source={zoom ? "magnify-minus" : "magnify-plus"}
                size={24}
              />
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
    </ScrollView>
  );
};

export default TransactionForm;

const styles = (theme: MD3Theme, keyWidth: number, screenHeight: number) =>
  StyleSheet.create({
    mainContainer: {
      gap: 30,
    },
    categoryDropdownCont: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 10,
      marginTop: 15,
    },
    categoryDropdown: {
      overflow: "hidden",
      borderRadius: 100,
      flexDirection: "row",
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: theme.colors.primaryContainer,
      paddingHorizontal: 15,
      paddingVertical: 10,
    },
    categoryDropdownInner: {
      flexDirection: "row",
      gap: 5,
    },
    keyCap: {
      width: keyWidth,
      height: keyWidth,
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
    },
    customKey: {
      width: keyWidth,
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
    },
    keyCapText: {
      fontSize: 30,
      fontWeight: "bold",
      textAlign: "center",
      fontFamily: "monospace",
    },
  });
