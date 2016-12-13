// This #include statement was automatically added by the Particle IDE.
#include "neopixel/neopixel.h"


SYSTEM_MODE(AUTOMATIC);

// IMPORTANT: Set pixel COUNT, PIN and TYPE
#define PIXEL_PIN D2
#define PIXEL_COUNT 24
#define PIXEL_TYPE WS2812B

Adafruit_NeoPixel strip = Adafruit_NeoPixel(PIXEL_COUNT, PIXEL_PIN, PIXEL_TYPE);

// Prototypes for local build, ok to leave in for Build IDE
void rainbow(uint8_t wait);
uint32_t Wheel(byte WheelPos);

// This #include statement was automatically added by the Particle IDE.
#include "Adafruit_SSD1306/Adafruit_SSD1306.h"

#define OLED_DC     D3
#define OLED_CS     D4
#define OLED_RESET  D5
Adafruit_SSD1306 display(OLED_DC, OLED_RESET, OLED_CS);

int  x;

Servo myservo;  // create servo object to control a servo

int pos = 0;    // variable to store the servo position


void setup()
{
    Serial.begin(9600);           // set up Serial library at 9600 bps
    Serial.println("Start GP");
    myservo.attach(D0);  // attaches the servo on the A0 pin to the servo object
   strip.begin();
   strip.show(); // Initialize all pixels to 'off'
   uint16_t i;
   uint32_t noColor=strip.Color(0,0,0); //noColor
   for(i=0; i<24; i++)
        {
            strip.setPixelColor(i, noColor);
            strip.show();
        }
        
  
  display.begin(SSD1306_SWITCHCAPVCC);
  display.setTextSize(2);       // text size
  display.setTextColor(WHITE); // text color
  x = display.width();
  Spark.function("setMovie", setDisplay);
  Spark.function("setGenre", setServo);
  

}

void loop() {

}


int setDisplay(String movieName) {
    String trial = movieName;
        Serial.println(trial);
       display.clearDisplay();
   display.setCursor(x/2, 7);
    //display.print("Name of movie is: " + trial);
     display.print(trial);
     display.display();
    return 0;
}

int setServo(String genreName) {
    String trial = genreName;
    uint16_t i, j;
    uint32_t white=strip.Color(255,255,255); //White
    uint32_t noColor=strip.Color(0,0,0); //noColor
    
      if(genreName=="Action") //proximity sensor object detection
      {
          Serial.print("Action");
          pos = 10; // servo position
            myservo.write(pos);
         for(i=0; i<1; i++) 
        {
            strip.setPixelColor(i, white);
            strip.show();
        }
      }
      else if(genreName=="Comedy")
      {
          Serial.print("Comedy");
          pos = 45; // servo position
          myservo.write(pos);
           for(i=0; i<1; i++) 
        {
            strip.setPixelColor(i, white);
            strip.show();
        }
      }
       else if(genreName=="Family")
      {
          pos = 85; // servo position
          myservo.write(pos);
          Serial.print("Family");
          for(i=0; i<1; i++) 
        {
            strip.setPixelColor(i, white);
            strip.show();
        }
      }
       else if(genreName=="Horror")
      {
          Serial.print("Horror");
          pos = 120; // servo position
          myservo.write(pos);
          for(i=0; i<1; i++) 
        {
            strip.setPixelColor(i, white);
            strip.show();
        }
      }
       else if(genreName=="Romance")
      {
          Serial.print("Romance");
          pos = 155; // servo position
          myservo.write(pos);
           for(i=0; i<1; i++) 
        {
            strip.setPixelColor(i, white);
            strip.show();
        }
      }
      else 
      {
        pos = 5; // servo position
        myservo.write(pos);
        for(i=0; i<24; i++)
        {
            strip.setPixelColor(i, noColor);
            strip.show();
        }
      }
        
   delay(500); 
     return 0;
}