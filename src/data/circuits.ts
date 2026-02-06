export type ComponentItem = {
  name: string;
  type: string;
  quantity: number;
};

export type QuizQuestion = {
  question: string;
  options: string[];
  answer: string;
};

export type Circuit = {
  id: string;          // same as slug
  name: string;
  category: string;
  slug: string;
  thumbnail: string;
  model3D?: string;    // path to .glb (optional)
  description: string;
  components: ComponentItem[];
  wiringSteps: string[];
  codeSnippet: string;
  safetyNotes?: string[];
  quiz?: QuizQuestion[];
};

export const circuits: Circuit[] = [
  {
    id: "ohms-law",
    name: "Ohm’s Law – Single Resistor Circuit",
    category: "Basic Electronics",
    slug: "ohms-law",
    thumbnail: "/images/circuits/ohms-law.png",
    model3D: "/models/ohms-law.glb",
    description:
      "This experiment verifies Ohm’s Law by demonstrating the linear relationship between voltage, current, and resistance using a single resistor.",
    components: [
      { name: "Breadboard", type: "hardware", quantity: 1 },
      { name: "Resistor", type: "passive", quantity: 1 },
      { name: "DC Power Supply", type: "source", quantity: 1 },
      { name: "Ammeter", type: "measurement", quantity: 1 },
      { name: "Voltmeter", type: "measurement", quantity: 1 },
      { name: "Jumper Wires", type: "wire", quantity: 5 },
    ],
    wiringSteps: [
      "Place a resistor across two separate rows (30E to 30G) on the breadboard.",
      "Connect the positive terminal of the DC power supply to positive terminal of ammeter.",
      "Connect the positive terminal of ammeter to one end of the resistor (30E).",
      "Connect the negative terminal of the DC power supply to the other end of the resistor (30G).",
      "Connect the voltmeter probes (+ve to 30E -ve to 30G) across the resistor terminals.",
      "Switch ON the power supply and observe voltage and current readings."
    ],
    codeSnippet: "Not applicable for this experiment.",
    quiz: [
      {
        question: "Ohm’s Law relates which three quantities?",
        options: ["Voltage, Current, Resistance", "Power, Energy, Time", "Charge, Voltage, Energy"],
        answer: "Voltage, Current, Resistance"
      }
    ]
  },

  {
    id: "voltage-divider",
    name: "Voltage Divider Circuit",
    category: "Analog Electronics",
    slug: "voltage-divider",
    thumbnail: "/images/circuits/voltage-divider.png",
    model3D: "/models/voltage-divider.glb",
    description:
      "This experiment demonstrates how an input voltage is divided across two series resistors, producing a lower output voltage at their junction.",
    components: [
      { name: "Breadboard", type: "hardware", quantity: 1 },
      { name: "Resistors", type: "passive", quantity: 2 },
      { name: "DC Power Supply", type: "source", quantity: 1 },
      { name: "Voltmeter", type: "measurement", quantity: 1 },
      { name: "Jumper Wires", type: "wire", quantity: 5 },
    ],
    wiringSteps: [
      "Place two resistors (R1 - 25E to 25G and R2 - 30E to 30G) in series on the breadboard.",
      "Connect the positive terminal of the DC power supply to the free end of R1 (25E).",
      "Connect the free end (30G) of R2 to the negative terminal to battery.",
      "Take the output voltage from the junction between R1 and R2 (30E and 30G).",
      "Connect the voltmeter positive probe to the junction of R1 and R2 (30E).",
      "Connect the voltmeter negative probe to ground (30G) and measure the output voltage."
    ],
    codeSnippet: "Not applicable for this experiment.",
    quiz: [
      {
        question: "Where is the output voltage taken in a voltage divider?",
        options: [
          "Across the power supply",
          "Across the first resistor",
          "At the junction of the two resistors"
        ],
        answer: "At the junction of the two resistors"
      }
    ]
  },

  {
    id: "led-current-limiting",
    name: "LED with Current-Limiting Resistor",
    category: "Basic Electronics",
    slug: "led-current-limiting",
    thumbnail: "/images/circuits/led-current-limiting.png",
    model3D: "/models/led-current-limiting.glb",
    description:
      "This experiment demonstrates safe operation of an LED using a series resistor to limit current.",
    components: [
      { name: "Breadboard", type: "hardware", quantity: 1 },
      { name: "LED", type: "active", quantity: 1 },
      { name: "Resistor", type: "passive", quantity: 1 },
      { name: "DC Power Supply", type: "source", quantity: 1 },
      { name: "Jumper Wires", type: "wire", quantity: 3 },
    ],
    wiringSteps: [
      "Place the LED on the breadboard ensuring correct polarity (long leg is anode - 25E, short leg - 24E).",
      "Connect a resistor in series with the LED anode (30G to 25E).",
      "Connect the free end (30E) of the resistor to the positive terminal of the DC power supply.",
      "Connect the LED cathode (24E) (short leg) to the negative terminal of battery.",
      "Switch ON the power supply and observe LED illumination."
    ],
    codeSnippet: "Not applicable for this experiment.",
    quiz: [
      {
        question: "Why is a resistor used in series with an LED?",
        options: [
          "To increase brightness",
          "To limit current and protect the LED",
          "To change LED color"
        ],
        answer: "To limit current and protect the LED"
      }
    ]
  },

  {
    id: "series-resistors",
    name: "Series Resistors – Equivalent Resistance",
    category: "Analog Electronics",
    slug: "series-resistors",
    thumbnail: "/images/circuits/series-resistors.png",
    model3D: "/models/series-resistors.glb",
    description:
      "This experiment demonstrates how equivalent resistance increases when resistors are connected in series.",
    components: [
      { name: "Breadboard", type: "hardware", quantity: 1 },
      { name: "Resistors", type: "passive", quantity: 2 },
      { name: "DC Power Supply", type: "source", quantity: 1 },
      { name: "Jumper Wires", type: "wire", quantity: 3 },
    ],
    wiringSteps: [
      "Place two resistors (30E to 30G) & (25E to 25G) end-to-end in series on the breadboard.",
      "Connect the positive terminal of the DC power supply to the first resistor (30E).",
      "Connect the second resistor’s free end (25G) to the negative terminal of battery.",
      "Ensure only one continuous current path exists through both resistors.",
      "Apply voltage and observe current behavior."
    ],
    codeSnippet: "Not applicable for this experiment.",
    quiz: [
      {
        question: "In a series circuit, which quantity remains the same through all components?",
        options: [
          "Voltage",
          "Current",
          "Resistance"
        ],
        answer: "Current"
      }
    ]
  },

  {
    id: "parallel-resistors",
    name: "Parallel Resistors – Current Division",
    category: "Analog Electronics",
    slug: "parallel-resistors",
    thumbnail: "/images/circuits/parallel-resistors.png",
    model3D: "/models/parallel-resistors.glb",
    description:
      "This experiment demonstrates current division when resistors are connected in parallel.",
    components: [
      { name: "Breadboard", type: "hardware", quantity: 1 },
      { name: "Resistors", type: "passive", quantity: 2 },
      { name: "DC Power Supply", type: "source", quantity: 1 },
      { name: "Jumper Wires", type: "wire", quantity: 4 },
    ],
    wiringSteps: [
      "Place two (30E to 30G) & (25E to 25G) resistors in parallel on the breadboard.",
      "Connect one end (30E and 25E) of both resistors to the positive supply rail.",
      "Connect the other end (30G and 25G) of both resistors to the ground rail.",
      "Ensure both resistors share the same voltage across them.",
      "Apply voltage and observe current division between branches."
    ],
    codeSnippet: "Not applicable for this experiment.",
    quiz: [
      {
        question: "In a parallel circuit, which quantity is the same across all branches?",
        options: [
          "Current",
          "Resistance",
          "Voltage"
        ],
        answer: "Voltage"
      }
    ]
  },

  {
    id: "rc-circuit",
    name: "RC Circuit – Charging and Discharging",
    category: "Analog Electronics",
    slug: "rc-circuit",
    thumbnail: "/images/circuits/rc-circuit.png",
    model3D: "/models/rc-charging-discharging.glb",
    description:
      "This experiment demonstrates the charging and discharging behavior of a capacitor through a resistor.",
    components: [
      { name: "Breadboard", type: "hardware", quantity: 1 },
      { name: "Resistor", type: "passive", quantity: 1 },
      { name: "Capacitor", type: "passive", quantity: 1 },
      { name: "DC Power Supply", type: "source", quantity: 1 },
      { name: "Jumper Wires", type: "wire", quantity: 3 },
    ],
    wiringSteps: [
      "Connect the resistor (30E, 30G) in series with the capacitor (25E +ve pin and 24E -ve pin) on the breadboard.",
      "Connect the positive terminal of the DC power supply to the resistor (30E).",
      "Connect the capacitor negative terminal (24E) to the negative terminal of the battery.",
      "Apply DC voltage to observe capacitor charging.",
      "Disconnect the power supply to observe capacitor discharging through the resistor."
    ],
    codeSnippet: "Not applicable for this experiment.",
    quiz: [
      {
        question: "What determines the charging and discharging rate of an RC circuit?",
        options: [
          "Only resistance",
          "Only capacitance",
          "The product of resistance and capacitance"
        ],
        answer: "The product of resistance and capacitance"
      }
    ]
  },

  {
    id: "transistor-switching",
    name: "Transistor Switching – Logic Level Demonstration",
    category: "Semiconductor Devices",
    slug: "transistor-switching",
    thumbnail: "/images/circuits/transistor-switching.png",
    model3D: "/models/transistor-switching.glb",
    description:
      "This experiment demonstrates transistor operation as a switch, where a small base current controls a larger load current.",
    components: [
      { name: "Breadboard", type: "hardware", quantity: 1 },
      { name: "NPN Transistor", type: "active", quantity: 1 },
      { name: "LED", type: "active", quantity: 1 },
      { name: "Resistor", type: "passive", quantity: 2 },
      { name: "DC Power Supply", type: "source", quantity: 1 },
      { name: "Jumper Wires", type: "wire", quantity: 5 },
    ],
    wiringSteps: [
        "Insert the NPN transistor into the breadboard as shown in the model.",
        "Identify the transistor connections based on wiring: left pin as Base, middle pin as Collector, right pin as Emitter.",
        "Connect the emitter pin (right pin - 20E) directly to the negative terminal of the battery.",
        "Connect the collector pin (middle pin - 19E) to the LED cathode (24E) using a jumper wire.",
        "Connect the LED anode (25E) to the positive terminal of the battery.",
        "Connect a resistor (16E to 16G) between the base pin (left pin - 18E) and the positive control voltage.",
        "Apply control voltage to the base through the resistor to switch the LED ON and OFF."
    ],
    codeSnippet: "Not applicable for this experiment.",
    quiz: [
      {
        question: "What controls the ON/OFF state of a transistor used as a switch?",
        options: [
          "Collector voltage",
          "Base current",
          "Emitter resistance"
        ],
        answer: "Base current"
      }
    ]
  },
  {
    id: "traffic-light-esp8266",
    name: "Traffic Light Control using ESP8266",
    category: "Embedded Systems",
    slug: "traffic-light-esp8266",
    thumbnail: "/images/circuits/traffic-light-esp8266.png",
    model3D: "/models/traffic-light-esp8266.glb",
    description:
      "This experiment demonstrates traffic light control using an ESP8266 microcontroller, where GPIO pins are used to drive red, yellow, and green LEDs in a timed sequence.",
  
    components: [
      { name: "ESP8266", type: "microcontroller", quantity: 1 },
      { name: "Traffic Light LED Module", type: "output", quantity: 1 },
      { name: "Jumper Wires", type: "wire", quantity: 4 },
      { name: "USB Power Supply", type: "source", quantity: 1 },
    ],
  
    wiringSteps: [
      "Connect ESP8266 D7 to Red LED input pin.",
      "Connect ESP8266 D6 to Yellow LED input pin.",
      "Connect ESP8266 D5 to Green LED input pin.",
      "Connect ESP8266 GND to GND of traffic light module.",      
      "Upload control logic to ESP8266.",
      "Observe timed LED switching sequence."
    ],
  
    codeSnippet: 
  `// ESP8266 Traffic Light Logic
  void setup() {
    pinMode(D7, OUTPUT);
    pinMode(D6, OUTPUT);
    pinMode(D5, OUTPUT);
  }
  
  void loop() {
    digitalWrite(D7, HIGH); // Red
    delay(5000);
    digitalWrite(D7, LOW);
  
    digitalWrite(D6, HIGH); // Yellow
    delay(2000);
    digitalWrite(D6, LOW);
  
    digitalWrite(D5, HIGH); // Green
    delay(5000);
    digitalWrite(D5, LOW);
  }`,
    quiz: [
      {
        question: "What is the main role of the ESP8266 in this circuit?",
        options: [
          "To supply power",
          "To control the timing and sequence of LEDs",
          "To limit current"
        ],
        answer: "To control the timing and sequence of LEDs"
      }
    ]
  }
];
