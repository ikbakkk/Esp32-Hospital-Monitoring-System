# ESP32 Hospital rooms monitoring system

The [Live version](https://esp32-hospital-monitoring-system.vercel.app/) might not working because the Hardware probably turned off

As a project for my college degree, a react app modifying
[Hospital monitoing dashboard by DamascenoRafael](https://github.com/DamascenoRafael/hospital-monitor-dashboard) by changing it from MQTT protocols into using Firebase Realtime Database combined with Espressif ESP32 to get Heartrate, Spo2, and Temperature. Also migrate using Next.js

## Features

- CRUD
- Realtime monitor
- Downloadable readings history with timestamp (.xlsx)
- Color coded notification in card header

## Color Reference for Card's Heading

| Color                                               | Hex                                                              |
| --------------------------------------------------- | ---------------------------------------------------------------- |
| Danger (All Sensor Readings below parameter)        | ![#FF706F](https://via.placeholder.com/10/ff706f?text=+) #FF706F |
| Warning (1 or 2 of sensor readings below parameter) | ![#FED597](https://via.placeholder.com/10/fed597?text=+) #FED597 |
| Normal                                              | ![#5F8D4E](https://via.placeholder.com/10/5f8d4e?text=+) #5F8D4E |
| No data                                             | ![#C9C9C9](https://via.placeholder.com/10/c9c9c9?text=+) #C9C9C9 |

## Environment Variables

To connect to firebase RTDB, you will need to add the following environment variables to your .env file

`NEXT_PUBLIC_FirebaseApiKey="apiKey"`

`NEXT_PUBLIC_FirebaseDatabaseURL="databaseURL"`

`NEXT_PUBLIC_FirebaseProjectId="firebaseProjectId"`

and env for the server side

`FirebaseApiKey="apiKey"`

`FirebaseDatabaseURL="databaseURL"`

`FirebaseProjectId="firebaseProjectId"`

You can find the config [Firebase Console](https://console.firebase.google.com) under Project Settings or if you want to directly edit the
[firebase.config.js](https://github.com/ikbakkk/Esp32-Hospital-Monitoring-System/blob/main/src/config/firebase.config.js) it's the same.

## Tech

- Next.js
- [Firebase Realtime Database](https://firebase.google.com/products/realtime-database)
- [React Query](https://tanstack.com/query/v4/?from=reactQueryV3&original=https://react-query-v3.tanstack.com/)
- [React Query Firebase](react-query-firebase.invertase.dev)
- [Recharts](https://recharts.org)

**Library for used sensor in this project**

- [Firebase arduino client for ESP8266 & ESP32](https://github.com/mobizt/Firebase-ESP-Client)
- [Adafruit-MLX90614-Library](https://github.com/adafruit/Adafruit-MLX90614-Library)
- [Arduino-MAX30100 by oxullo](https://github.com/oxullo/Arduino-MAX30100)

## Firebase realtime database JSON format

JSON format for firebase realtime databse

```JSON
[
  "userId": { //main node path for react query firebase hook
    "1": { // sensor id
      "nama": "nama pasien",
      "nilai": {
        "-NHFthuz-7J7H71noisX": { //this node name will randomly created by ESP32
          "beat": 0,
          "spo2": 0,
          "temp": 0,
          "timestamp": 0
        }
  }
]
```

<!-- **How it's look like in firebase console**

![node](https://github.com/ikbakkk/Esp32-Hospital-Monitoring-System/blob/main/images/nodeData.png?raw=true)
## Screenshots

![main](https://github.com/ikbakkk/Esp32-Hospital-Monitoring-System/blob/main/images/Home.png?raw=true)

![bar](https://github.com/ikbakkk/Esp32-Hospital-Monitoring-System/blob/main/images/barcharts.png?raw=true)

![history](https://github.com/ikbakkk/Esp32-Hospital-Monitoring-System/blob/main/images/history.png?raw=true)

![gif](https://github.com/ikbakkk/Esp32-Hospital-Monitoring-System/blob/main/images/gif.gif?raw=true) -->
