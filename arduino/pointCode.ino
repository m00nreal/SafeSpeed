#include <ArduinoJson.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266HTTPClient.h>
#include <base64.h>
#include "SoftwareSerial.h"
#include <VC0706_UART.h>
#include <SD.h>
#include <SPI.h>
#define SS_SD  10

//use software serial
SoftwareSerial cameraconnection(2,3);//Rx, Tx
VC0706 cam = VC0706(&cameraconnection);

const char* ssid = "my_ssid";//Nombre de la red Wifi
const char* password = "my_password";//Contraseña de la red Wifi

float maxVelLimit = 60.0f;//Dependerá de la zona en donde sea colocado el punto de monitoreo
String APIURL = "https://safespeed.herokuapp.com/api/registros"
String key = "UniqueKey";//Esta key se registra primero en el servidor y después se obtiene para ser reemplazada en esta variable
String pointName = "Point 1";

//Pines de los dos sensores
int sensor1 = 5;
int sensor2 = 4;
//Estado activo o inactivo de los sensores
bool sensor1Active = false;
bool sensor2Active = false;
//Tiempo en el que cada sensor fue activado
long sensor1Time = 0;
long sensor2Time = 0;
//Banderas de registros de exceso de velocidad o sentido contrario
bool registro = false;
bool registroSC = false;
//Tiempo en el que se activó el registro de cada incidente
long sCTime = 0;
long eVTime = 0;
//Velocidad registrada
float velocidad = 0.0f;

bool cameraFlag = false;

void setup()
{
  if (!SD.begin(SS_SD)) {
      return;
  }
  if(true == cameraInit()){
      cameraFlag = true;
  }
  pinMode(sensor1, INPUT);
  pinMode(sensor2, INPUT);
  WiFi.begin(ssid, password);
  while(WiFi.status() != WL_CONNECTED){
    delay(500);
  }
  
}

void loop()
{
  //Se obtiene el estado de los dos sensores
  int sensor1State = digitalRead(sensor1);
  int sensor2State = digitalRead(sensor2);
  
  //Se aplica el estado de los sensores
  applySensorState(sensor1State, sensor1Active, sensor1Time);
  applySensorState(sensor2State, sensor2Active, sensor2Time);
  
  //Se verifican los casos en base al estado de los sensores
  if(!sensor1Active && sensor2Active && !registro && !registroSC){
    sCTime = millis();
    //se toma foto
    String image = snapShot(10);//Solo se dan 10 milisegundos de retraso, ya que la cámara está apuntando al auto en ese momento
    //se activa la bandera de sentido contrario
    registroSC = true;
    //se registra el incidente
    velocidad = 0.0f;
    sendRegister("Sentido contrario",image);
  }
  else if(sensor1Active && sensor2Active && !registro){
    registro = true;
    eVTime = millis();
    int totalms = sensor2Time - sensor1Time;
    velocidad = (10.0f/1000.0f)/(float)(totalms * (1.0f/3.6f) * pow(10,-6));
    if(velocidad > maxVelLimit){
      float delay = ((4.0f/1000f)/velocidad)*3600f;
      //Se toma la foto en base al delay
      String image = snapShot(10);
      //Registro del incidente
      sendRegister("Exceso de velocidad",image);
    }
  }
  
  //Se desactivan los sensores con respecto al tiempo
  changeFlag(sensor1Active, sensor1Time);
  changeFlag(sensor2Active, sensor2Time);
  changeFlag(registroSC, sCTime);
  changeFlag(registro, eVTime);
}

//Funcion que permite registrar el estado en el que se encuentran los sensores y actuar en base a ello
void applySensorState(int sensorState, bool sensorActive, long sensorTime){
  if(sensorState == HIGH && !sensorActive){
    sensorActive = true;
    sensorTime = millis();
  }
}
//Funcion que permite cambiar de estado la bandera proporcionada como parámetro
void changeFlag(bool flag, long time){
  long current = millis();
  if(current - time > 2999){//El tiempo de reestablecimiento es de 3 segundos
    flag = false;           //Es el mismo tiempo en que tarda en volver a detectar
  }                         //movimiento el sensor PIR
}
//Funcion para tomar foto y retorna el archivo en bytes

//Función para crear el json y enviarlo
void sendRegister(String type, String encodedImage){
  StaticJsonBuffer<69> jsonBuffer;
  String json = "{\"PointName\":\"";
  json.concat(pointName);
  json.concat("\",\"type\":\"");
  json.concat(type);
  json.concat("\",\"key\":\"");
  json.concat(key);
  json.concat("\",\"speed\":");
  json.concat(velocidad);
  json.concat(",\"image\":\"");
  json.concat(encodedImage);
  json.concat("\"}");
  JsonObject& root = jsonBuffer.parseObject(json);
  if(root.success){
    HttpClient http;
    if(WiFi.status() == WL_CONNECTED){
      http.begin(APIURL);
      http.addHeader("Content-Type", "application/json");
      http.addHeader("auth-key", "My_authentication_key");

      String data;
      root.printTo(data);
      //Send the request
      int httpCode = http.POST(data);

      /Check the returning code
      if (httpCode > 0) {
        //Get the request response payload
        String payload = http.getString();
        //Print the response payload
        Serial.println(payload);
      }
      //Close connection
      http.end();
    }
  }
}

bool cameraInit()
{
    cam.begin(BaudRate_19200);
    char *reply = cam.getVersion();
    if (reply == 0) {
        return false;
    } else {
        return true;
    }
}
//Función para regresar la imagén tomada en base 64
String snapShot(int delay)
{
    delay(delay);
    cam.takePicture();
    // Create an image with the name IMAGExx.JPG
    char filename[13];
    strcpy(filename, "IMAGE00.JPG");
    for (int i = 0; i < 100; i++) {
        filename[5] = '0' + i/10;
        filename[6] = '0' + i%10;
        // create if does not exist, do not open existing, write, sync after write
        if (! SD.exists(filename)) {
            break;
        }
    }
    // Open the file for returning
    File imgFile = SD.open(filename, FILE_WRITE);
    uint16_t jpglen = cam.getFrameLength();
    int encodedLen = base64_enc_len(jpglen);
    char encoded[encodedLen];
    base64_encode(encoded, imgFile, jpglen);
    imgFile.close();
    cam.resumeVideo();

    return encoded;
}
