#include <SoftwareSerial.h>

SoftwareSerial espSerial(2, 3); 

const int MQ135_PIN = A0;
const int MQ6_PIN   = A1;

String SSID = "ИМЕТО_НА_ТВОЯ_WIFI";
String PASS = "ПАРОЛАТА_ТИ";
String SERVER_IP = "192.168.1.100";

void setup() {
  Serial.begin(9600);         
  espSerial.begin(115200);     

  delay(2000);
  initWifi();
}

void loop() {
  int mq135Value = analogRead(MQ135_PIN);
  int mq6Value   = analogRead(MQ6_PIN);

  String quality;
  if (mq135Value < 300) {
    quality = "Dober";
  } else if (mq135Value < 600) {
    quality = "Sreden";
  } else {
    quality = "Losh";
  }

  sendDataToServer(mq135Value, mq6Value, quality);
  delay(10000);
}


void initWifi() {
  sendAT("AT", 1000);
  sendAT("AT+RST", 3000);
  sendAT("AT+CWMODE=1", 1000);
  sendAT("AT+CIPMUX=0", 1000);
  sendAT("AT+CWJAP=\"" + SSID + "\",\"" + PASS + "\"", 10000);
}

// ---------- SEND DATA ----------
void sendDataToServer(int val135, int val6, String status) {
  String url = "/air_project/save_data.php?mq135=" + String(val135) +
  "&mq6=" + String(val6) +
 "&status=" + status;

  sendAT("AT+CIPSTART=\"TCP\",\"" + SERVER_IP + "\",80", 3000);

  String httpRequest =
    "GET " + url + " HTTP/1.1\r\n" +
    "Host: " + SERVER_IP + "\r\n" +
    "Connection: close\r\n\r\n";

  sendAT("AT+CIPSEND=" + String(httpRequest.length()), 2000);
  espSerial.print(httpRequest);
  delay(2000);
  sendAT("AT+CIPCLOSE", 1000);
}


void sendAT(String command, int timeout) {
  espSerial.println(command);
  long startTime = millis();

  while (millis() - startTime < timeout) {
    while (espSerial.available()) {
      Serial.write(espSerial.read());
    }
  }
}
