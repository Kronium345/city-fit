import React, { useState } from "react"
import {
  ScrollView,
  TextInput,
  View,
  Text,
  Button,
  ActivityIndicator,
} from "react-native"

const FitBot = () => {
  const API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY
  // console.log("API_KEY", API_KEY)

  const [typing, setTyping] = useState(false)
  const [inputMessage, setInputMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      message: "Hello, I am Fitbot!",
      sender: "Fitbot",
    },
  ])

  const handleSend = async () => {
    const newMessage = {
      message: inputMessage,
      sender: "user",
      direction: "outgoing",
    }

    const newMessages = [...messages, newMessage]
    setMessages(newMessages)
    setInputMessage("")
    setTyping(true)

    await processMessageToFitbot(newMessages)
  }

  const processMessageToFitbot = async (chatMessages) => {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = ""
      if (messageObject.sender === "Fitbot") {
        role = "assistant"
      } else {
        role = "user"
      }
      return { role: role, content: messageObject.message }
    })

    const systemMessage = {
      role: "system",
      content: "Explain all concepts as a personal trainer would.",
    }

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages],
    }

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiRequestBody),
        }
      )

      const data = await response.json()
      console.log(data)
      console.log(data.choices[0].message.content)
      setMessages([
        ...chatMessages,
        {
          message: data.choices[0].message.content,
          sender: "Fitbot",
        },
      ])
      setTyping(false)
    } catch (error) {
      console.error("Error processing message:", error)
      setTyping(false)
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#ADD8E6" }}>
      <Text style={{ padding: 10, textAlign: "center" }}>
        Fit Bot is your own personal trainer - right on your device! Ask it to
        provide you with workout plans, meals and anything fitness! Make your
        journey enjoyable with Fit Bot!
      </Text>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}
      >
        {messages.map((message, index) => (
          <View
            key={index}
            style={{
              flexDirection: message.sender === "user" ? "row-reverse" : "row",
            }}
          >
            <View
              style={{
                backgroundColor:
                  message.sender === "user" ? "#007AFF" : "#E5E5EA",
                borderRadius: 10,
                padding: 10,
                margin: 5,
                maxWidth: "70%",
              }}
            >
              <Text
                style={{ color: message.sender === "user" ? "white" : "black" }}
              >
                {message.message}
              </Text>
            </View>
          </View>
        ))}
        {typing && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              margin: 5,
            }}
          >
            <ActivityIndicator size="small" color="#0000ff" />
            <Text style={{ marginLeft: 5 }}>Fitbot is typing...</Text>
          </View>
        )}
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <TextInput
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 10,
            padding: 10,
            maxWidth: "85%",
          }}
          value={inputMessage}
          onChangeText={(text) => setInputMessage(text)}
          placeholder="Type your message here"
          onFocus={() => setInputMessage("")} // Clear input message onFocus
        />
        <Button title="Send" onPress={handleSend} />
      </View>
    </View>
  )
}

export default FitBot
