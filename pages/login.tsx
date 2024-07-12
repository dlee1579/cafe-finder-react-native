import { Alert, Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import "@fontsource/krona-one"; // Defaults to weight 400
import { useState } from "react";
import { login } from "@/api-service";
import { Controller, useForm } from "react-hook-form";
import {LoginData} from "@/types";
import * as SecureStore from 'expo-secure-store';
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";


export default function Login() {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm<LoginData>({
        defaultValues: {
          username: "",
          password: "",
        },
      })
      const [serverErrors, setServerErrors] = useState<Array<string>>([]);

    const onSubmit = async (data: LoginData) =>{
        setServerErrors([]);
        const response = await login(data.username, data.password);
        console.log(response);
        if ("non_field_errors" in response) {
            console.log(serverErrors);
            setServerErrors(response.non_field_errors);
        } else if ("token" in response) {
            await SecureStore.setItemAsync("token", response.token);
            await SecureStore.setItemAsync("userId", response.user_id.toString());
            const token = await SecureStore.getItemAsync("token");
            // console.log(token);
            navigation.navigate("Home");
        }
    };

    const styles = StyleSheet.create({
        appLogoName: {
            alignSelf: 'center',
            paddingTop: "50%",
            gap: 40,
        },
        logo: {
        },
        appName: {
            fontFamily: "Krona-One",
            fontSize: 24,
        },
        wrapper: {
            backgroundColor: "rgb(207, 182, 157)",
            height: "100%"
        },
        login: {
            paddingTop: 60,
            // alignItems: 'center',
            // justifyContent: 'space-evenly',
        },
        textInput: {
            backgroundColor: "white",
            width: "80%",
            height: 50,
            borderRadius: 20,
            alignSelf: "center",
            padding: 20,
            color: "gray",
            
        },
        loginButton: {
            borderColor: 'black',
            width: "50%",
            height: 50,
            borderRadius: 25,
            borderWidth: 1,
            color: 'black',
            alignSelf: "center",
            justifyContent: "center",
        },
        errorMessage: {
            color: "red",
            alignSelf: 'center',
        }
    });
    return <>
        <View style={styles.wrapper}>
            <View style={styles.appLogoName}>
                <Image style={styles.logo} source={require("../assets/images/cafe-finder-logo.png")}/>
                <Text style={styles.appName}>Find My Cafe</Text>
            </View>
            <View style={styles.login}>
                <View style={{justifyContent: "space-evenly", gap: 30,}}>
                    <Controller
                        control={control}
                        rules={{
                        required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder="username"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            autoCapitalize="none"
                            style={styles.textInput}
                        />
                        )}
                        name="username"
                    />
                    {errors.username && <Text>This is required.</Text>}

                    <Controller
                        control={control}
                        rules={{
                        maxLength: 100,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder="password"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            autoCapitalize="none"
                            secureTextEntry={true}
                            style={styles.textInput}
                        />
                        )}
                        name="password"
                    />
                    <View style={styles.loginButton}>
                        <Button title="Submit" onPress={handleSubmit(onSubmit)} color="black" />
                    </View>
                    {serverErrors && serverErrors.map((error, index) => (
                        <Text key={index} style={styles.errorMessage}>{error}</Text>
                    ))}
                </View>
            </View>
        </View>
    </>
}