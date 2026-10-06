export interface EducationItem {
  year: string;
  degree: string;
  institution: string;
  score: string;
  scoreType: string;
}

export interface ControllerResult {
  id: string;
  name: string;
  shortName: string;
  category: "Advanced" | "Model-Based" | "Conventional" | "Fractional";
  isBest?: boolean;
  riseTime: number; // in seconds
  settlingTime: number; // in seconds
  overshoot: number; // in percentage
  peakValue: number;
  peakTime: number; // in seconds
  steadyStateValue: number;
  itae: number;
  ise: number;
  iae: number;
  tuningParameters: {
    kp?: number;
    ki?: number;
    lambda?: number;
    tc?: number;
    mu?: number;
    predictionHorizon?: number;
    controlHorizon?: number;
    sampleTime?: number;
  };
  keyTakeaway: string;
}

export interface LiteratureItem {
  year: number;
  authors: string;
  title: string;
  outcomes: string;
  remarks: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    fullName: "GANDHAM VEERA VENKATA MANIKANTA",
    shortName: "G.V.V. Manikanta",
    calloutName: "MANIKANTA",
    regNo: "228867602004",
    title: "Electronics and Instrumentation Engineer",
    stream: "Electronics and Instrumentation",
    specialization: "Electronics and Instrumentation",
    degreeTag: "B.Tech. – Electronics & Instrumentation (EIE)",
    subtitle: "Electronics and Instrumentation",
    email: "manikanta.eie.aknu@gmail.com",
    linkedin: "https://www.linkedin.com/in/gandham-veera-venkatamanikanta-734122374",
    gender: "Male",
    dateOfBirth: "14/11/2003",
    place: "Vetlapalem",
    stateCountry: "Andhra Pradesh, India",
    university: "AKNU College of Engineering, Adikavi Nannaya University",
    locationDetail: "Rajamahendravaram, East Godavari District, AP",
    academicYear: "2022-2026",
    bioLead: "Final Year B.Tech Electronics and Instrumentation Engineering student specializing in Process Control Engineering at AKNU College of Engineering with an outstanding 9.05 CGPA.",
    bioDescription: "Dedicated to the design, system identification, and robust controller implementation for industrial liquid level, temperature, and multi-variable dynamic processes. Author of the final year project 'Modelling and Control of a Single Tank Level System' under Dr. D. Kishore (AKNU) and research acknowledgement to Prof. A. Seshagiri Rao (IIPE). Proven expertise in Model Predictive Control (MPC), Internal Model Control (IMC), Direct Synthesis (DS), Fractional Order PI (FOPI), and MATLAB/Simulink real-time control workflows.",
    declaration: "I hereby declare that the above-mentioned information is correct to the best of my knowledge and I bear the responsibility for the correctness of the above-mentioned particulars."
  },

  finalYearProject: {
    title: "Modelling and Control of a Single Tank Level System",
    degree: "Bachelor of Technology in Electronics & Instrumentation Engineering",
    institution: "AKNU College of Engineering, Adikavi Nannaya University, Rajamahendravaram",
    academicYear: "2022-2026",
    registrationNo: "228867602004",
    guide: "Dr. D. Kishore (Assistant Professor, Department of EIE)",
    specialAcknowledgement: "Prof. A. Seshagiri Rao (Dept. of Chemical Engineering, Indian Institute of Petroleum & Energy - IIPE Vangali, Anakapalli) & Jagan Sethuraman",
    plantSetup: "Single Process Tank from Three-Tank System (JITTS-01), Smart DPT Level Transmitter (4–20 mA), Electro-Pneumatic Converter (3–15 psi), Equal % Control Valve (CV=2, 350 LPH max), DAQ USB interface.",
    transferFunction: {
      type: "First Order Transfer Function (FOTF)",
      formula: "G(s) = 0.593 / (261.03 s + 1)",
      gain: 0.593,
      timeConstant: "261.03 s",
      fitPercentage: "86.54%",
      mse: 0.3194,
      inputSignal: "Pseudo Random Binary Sequence (PRBS)"
    },
    abstract: "Identified the mathematical model of a single tank liquid level process using Blackbox System Identification in MATLAB. Designed, tuned, and tested 6 competitive controllers in real-time. Model Predictive Control (MPC) demonstrated superior tracking, near-zero overshoot, and the lowest cumulative error indices (ITAE = 16.66).",
    results: [
      {
        id: "mpc",
        name: "Model Predictive Control (MPC)",
        shortName: "MPC",
        category: "Advanced",
        isBest: true,
        riseTime: 6.4196,
        settlingTime: 12.4414,
        overshoot: 0.00017,
        peakValue: 1.0,
        peakTime: 28.0,
        steadyStateValue: 1.0,
        itae: 16.6595,
        ise: 2.54992,
        iae: 3.95448,
        tuningParameters: {
          sampleTime: 2,
          predictionHorizon: 14,
          controlHorizon: 3,
        },
        keyTakeaway: "Best Overall Performer: Minimal rise time (6.42s), fastest settling (12.44s), near-zero overshoot (0.00017%), and lowest error across ITAE, ISE, and IAE."
      },
      {
        id: "imc",
        name: "Internal Model Controller (IMC)",
        shortName: "IMC",
        category: "Model-Based",
        riseTime: 57.3524,
        settlingTime: 102.1175,
        overshoot: 0.00022,
        peakValue: 1.0,
        peakTime: 737.0,
        steadyStateValue: 1.0,
        itae: 130.1619,
        ise: 87.2478,
        iae: 913.6,
        tuningParameters: {
          kp: 8.4317,
          ki: 0.0323,
          tc: 0.2
        },
        keyTakeaway: "Chien & Fruehauf tuning: Eliminates overshoot (0.00022%) with smooth closed-loop tracking; significantly faster than conventional PI."
      },
      {
        id: "ds",
        name: "Direct Synthesis PI (DS)",
        shortName: "DS (PI)",
        category: "Model-Based",
        riseTime: 286.77,
        settlingTime: 510.577,
        overshoot: 0.0,
        peakValue: 1.0,
        peakTime: 2000.0,
        steadyStateValue: 1.0,
        itae: 884.8392,
        ise: 436.34,
        iae: 4568.0,
        tuningParameters: {
          kp: 3.372681,
          ki: 0.01292,
          lambda: 0.5
        },
        keyTakeaway: "Zero Overshoot (0.0%): Directly shapes closed-loop response. Extremely safe and smooth transition with λ = 0.5, but slower settling."
      },
      {
        id: "auto-tune",
        name: "Auto-Tuned PI (MATLAB PID Tuner)",
        shortName: "Auto Tune PI",
        category: "Conventional",
        riseTime: 38.164,
        settlingTime: 230.2357,
        overshoot: 8.4118,
        peakValue: 1.0841,
        peakTime: 100.0,
        steadyStateValue: 1.0,
        itae: 358.1092,
        ise: 75.5638,
        iae: 1027.0,
        tuningParameters: {
          kp: 18.37805,
          ki: 0.21118
        },
        keyTakeaway: "Fast initial rise (38.16s), but exhibits 8.41% transient overshoot and takes 230.2s to fully settle."
      },
      {
        id: "trial-error",
        name: "Manual / Trial & Error PI",
        shortName: "Manual PI",
        category: "Conventional",
        riseTime: 369.59,
        settlingTime: 629.529,
        overshoot: 0.04962,
        peakValue: 1.0006,
        peakTime: 1242.0,
        steadyStateValue: 1.0,
        itae: 1424.0242,
        ise: 237.3126,
        iae: 5919.0,
        tuningParameters: {
          kp: 2.5,
          ki: 0.01001
        },
        keyTakeaway: "Traditional heuristic tuning: Sluggish response (rise time 369.6s, settling 629.5s) and highest cumulative absolute error (IAE = 5919)."
      },
      {
        id: "fopi",
        name: "Fractional Order PI (FOPI)",
        shortName: "FOPI",
        category: "Fractional",
        riseTime: 139.3,
        settlingTime: 552.6,
        overshoot: 8.21,
        peakValue: 1.0821,
        peakTime: 247.8,
        steadyStateValue: 1.0,
        itae: 25546.80,
        ise: 3457.3847,
        iae: 356.1915,
        tuningParameters: {
          kp: 25.0,
          ki: 0.819,
          mu: 0.9
        },
        keyTakeaway: "Non-integer order integrator (μ = 0.9): Captures memory effects with low IAE (356.2), though higher transient oscillation."
      }
    ] as ControllerResult[]
  },

  conferencesAndLiterature: [
    {
      year: 2023,
      authors: "Midhun T. Augustine",
      title: "Model Predictive Control Using MATLAB",
      outcomes: "MATLAB implementation of Linear & Nonlinear MPC for constrained multivariable processes.",
      remarks: "Provides foundational optimization framework for predictive tank level regulation."
    },
    {
      year: 2024,
      authors: "M. Theja, N. Ramesh Raju",
      title: "Optimal Tuning of Fractional Order PID Using PSO",
      outcomes: "Particle Swarm Optimization for FOTD systems with non-integer controllers.",
      remarks: "Demonstrates superior flexibility in fractional order parameters."
    },
    {
      year: 2023,
      authors: "M.A. Hasan, R.K. Mishra",
      title: "Direct Synthesis Scheme Based PID Controller Design for Boost Converter",
      outcomes: "Analytical derivation of feedback structure based on desired closed-loop transfer function.",
      remarks: "Applied direct synthesis principles to prevent overshoot in dynamic loops."
    },
    {
      year: 2017,
      authors: "Rasika Pund, R.S. Hardas",
      title: "IMC-Based PID Controller for Pressure Control",
      outcomes: "Internal Model Control (IMC) eliminates overshoot in pressurized vessels.",
      remarks: "Confirms IMC superiority over classical trial-and-error PID."
    },
    {
      year: 2022,
      authors: "Do Chi Thanh, Dang Ngoc Huy",
      title: "Speed Control of BLDC Motor Using PI Controller in MATLAB Simulink",
      outcomes: "PI controller with PWM improves regulation efficiency.",
      remarks: "Simulink real-time modeling benchmarks."
    },
    {
      year: 2020,
      authors: "V.M. Rana",
      title: "MATLAB/Simulink Based PI Controller Modeling for Canal Pools",
      outcomes: "Stabilizes hydraulic pool level systems under unmeasured disturbances.",
      remarks: "Parallels fluid level dynamics and valve resistance."
    },
    {
      year: 2022,
      authors: "Robert Barsanti",
      title: "Teaching PID Controller Design Using MATLAB",
      outcomes: "Educational framework for manual and online PID tuning.",
      remarks: "Benchmarking manual vs. computational tuning methods."
    }
  ] as LiteratureItem[],

  education: [
    {
      year: "2026",
      degree: "B.Tech (Electronics and Instrumentation Engineering)",
      institution: "AKNU College of Engineering, Adikavi Nannaya University, Rajamahendravaram",
      score: "9.05",
      scoreType: "CGPA (Distinction - 90%)"
    },
    {
      year: "2022",
      degree: "Intermediate",
      institution: "Ideal Junior College, Kakinada",
      score: "750",
      scoreType: "Marks"
    },
    {
      year: "2020",
      degree: "S.S.C",
      institution: "Z.P. High School, Kandarada",
      score: "562",
      scoreType: "Marks"
    }
  ] as EducationItem[],

  internships: [
    {
      title: "Design a Control System for Temperature Process",
      organization: "Indian Institute of Petroleum and Energy (IIPE), Vizag",
      period: "May 2025 - Jul 2025",
      meritBadge: "Merit-Based Selection (SIP 2025)",
      description: [
        "Selected on merit basis for the competitive Summer Internship Program (SIP 2025) at premier institute IIPE Visakhapatnam.",
        "Designed, modeled, and evaluated closed-loop control system architectures tailored for industrial temperature regulation processes.",
        "Derived system transfer functions, analyzed thermal process dynamics, and designed tuned feedback controllers to achieve minimum overshoot and rapid settling time.",
        "Evaluated disturbance rejection and frequency-domain stability margins using MATLAB and system simulation toolkits."
      ],
      skills: ["Process Control", "MATLAB", "PID Tuning", "Thermal Dynamics", "System Identification"]
    },
    {
      title: "Design a Blender for Mechanical Ventilator",
      organization: "National Institute of Technology (NIT), Tiruchirappalli",
      period: "May 2024",
      meritBadge: "Biomedical Instrumentation Research",
      description: [
        "Engineered the conceptual and structural design for a precision gas blender module utilized in hospital mechanical ventilators.",
        "Modeled medical-grade air and oxygen proportioning mechanisms to ensure stable inspiratory oxygen fraction (FiO2) and flow compliance.",
        "Analyzed pressure regulation and flow dynamic sensors critical for life-support biomedical healthcare equipment."
      ],
      skills: ["Biomedical Engineering", "Ventilator Systems", "Gas Flow Control", "Medical Instrumentation"]
    }
  ],

  projects: [
    {
      id: "single-tank",
      title: "Modelling and Control of a Single Tank Level System",
      period: "Dec 2025 - Apr 2026",
      domain: "Final Year Capstone • Process Control Engineering",
      iconType: "tank",
      summary: "First-order system identification & real-time comparative benchmark of 6 controllers (MPC, IMC, DS, Auto-Tune, Manual, FOPI) on a liquid level plant.",
      details: [
        "Developed First-Order Transfer Function model G(s) = 0.593 / (261.03s + 1) with 86.54% fit using PRBS test signals in MATLAB.",
        "Implemented real-time closed-loop testing on JITTS-01 single process tank with smart DPT level transmitters and electro-pneumatic valves.",
        "Proved that Model Predictive Control (MPC) delivers the superior response with 6.42s rise time, 12.44s settling time, and 16.66 ITAE.",
        "Conducted comprehensive error criteria evaluation across ITAE, ISE, and IAE, demonstrating superiority over conventional PID tuning."
      ],
      tags: ["MPC", "IMC", "Direct Synthesis", "FOPI", "MATLAB", "System ID", "Level Control", "Real-time DAQ"]
    },
    {
      id: "sopdt-relay",
      title: "Estimation of Parameters of SOPDT Using Relay Feedback Method",
      period: "Dec 2024 - Mar 2025",
      domain: "System Identification & Adaptive Control",
      iconType: "relay",
      summary: "Parameter identification of Second Order Plus Dead Time systems using asymmetric/symmetric relay feedback oscillations.",
      details: [
        "Conducted closed-loop relay feedback experimentation to induce limit-cycle oscillations without destabilizing the plant.",
        "Derived accurate SOPDT parameters (static gain K, damping ratio, natural frequency, time delay θ) from limit cycle amplitude and period.",
        "Demonstrated higher parameter estimation fidelity compared to conventional open-loop step response methods.",
        "Applied estimated plant transfer functions to auto-tune controller coefficients for high-order sluggish industrial processes."
      ],
      tags: ["SOPDT", "Relay Feedback", "Auto-Tuning", "System ID", "Process Modeling", "Control Engineering"]
    },
    {
      id: "spherical-tank",
      title: "Real Time Control of Spherical Tank Using Traditional Methods",
      period: "Jun 2024 - Aug 2024",
      domain: "Non-Linear Process Control",
      iconType: "spherical",
      summary: "Handling highly non-linear spherical vessel geometry through piecewise operating points and traditional PID tuning.",
      details: [
        "Addressed cross-sectional area variations with liquid height in spherical storage vessels causing variable process gain and time constant.",
        "Implemented piecewise linear approximations across operating heights and developed tuned PID controllers using Ziegler-Nichols & Cohen-Coon methods.",
        "Achieved tight liquid level stabilization across all operating heights while minimizing actuator wear and valve chattering.",
        "Benchmarked system transient performance under both nominal and disturbed fluid inflow conditions."
      ],
      tags: ["Spherical Tank", "Non-Linear Systems", "Ziegler-Nichols", "Cohen-Coon", "Level Control"]
    },
    {
      id: "emg-signals",
      title: "Design and Analysis of EMG Signals Using Virtual Instrumentation Tools",
      period: "Sep 2024 - Dec 2024",
      domain: "Bio-Medical Signal Processing",
      iconType: "emg",
      summary: "Acquisition, virtual instrument design, digital filtering, and spectral feature extraction of electromyography biological signals.",
      details: [
        "Acquired surface Electromyography (EMG) muscle signals through bio-potential electrodes and analog instrumentation front-ends.",
        "Built modular LabVIEW Virtual Instruments (VIs) incorporating 20Hz-450Hz bandpass filtering and a 50Hz notch filter for powerline hum elimination.",
        "Extracted critical statistical biomarkers including Root Mean Square (RMS), Mean Absolute Value (MAV), and Mean Frequency (MNF) for muscle contraction analysis.",
        "Constructed an interactive graphical dashboard for live monitoring and recording of muscle activation and fatigue states."
      ],
      tags: ["LabVIEW", "EMG Bio-signals", "Virtual Instrumentation", "Digital Filtering", "Medical Electronics"]
    }
  ],

  technicalSkills: {
    processControl: [
      { name: "Model Predictive Control (MPC)", level: "92%", badge: "Specialist", description: "Horizon optimization, constraints, state estimation" },
      { name: "Internal Model Control (IMC)", level: "90%", badge: "Advanced", description: "Filter design, invertible factorizations, robust tuning" },
      { name: "Direct Synthesis (DS)", level: "88%", badge: "Advanced", description: "Closed-loop pole placement, analytical derivation" },
      { name: "System Identification", level: "86%", badge: "Advanced", description: "PRBS signal excitation, FOTF/SOPDT model fitting" },
      { name: "PID Tuning & Relay Feedback", level: "90%", badge: "Proficient", description: "Ziegler-Nichols, Cohen-Coon, auto-tuning" }
    ],
    softwareAndTools: [
      { name: "MATLAB & Simulink", level: "92%", badge: "Primary Tool", description: "Control System & System ID Toolboxes, real-time scopes" },
      { name: "LabVIEW", level: "85%", badge: "Proficient", description: "Virtual Instrumentation, DAQ, signal filtering" },
      { name: "LTspice XVII", level: "80%", badge: "Proficient", description: "Analog circuits, frequency response, transient analysis" },
      { name: "Arduino IDE", level: "85%", badge: "Proficient", description: "Embedded C, sensor DAQ, actuation" },
      { name: "Python", level: "70%", badge: "Intermediate", description: "Numerical modeling, scripts, data analysis" }
    ],
    hardwareAndInstrumentation: [
      { name: "Level Transmitters (DPT)", level: "88%", badge: "Hands-on", description: "4-20 mA Smart Differential Pressure Transmitters" },
      { name: "Electro-Pneumatic Converters", level: "85%", badge: "Hands-on", description: "E/P conversion (4-20mA to 3-15 psi), air regulators" },
      { name: "Control Valves & Rotameters", level: "86%", badge: "Hands-on", description: "Air-to-open, equal percentage, flow calibration" },
      { name: "Sensors & Interfacing", level: "85%", badge: "Hands-on", description: "Ultrasonic, Line sensors, EMG bio-electrodes" }
    ]
  },

  certifications: [
    {
      title: "Basics of Python",
      issuer: "Simplilearn (Simple Learn)",
      category: "Programming & Data",
      year: "2024"
    },
    {
      title: "Getting Started with Arduino Uno (Line Sensor & Ultrasonic)",
      issuer: "Infosys Springboard",
      category: "Embedded & Sensors",
      year: "2024"
    }
  ],

  achievements: [
    {
      title: "Selected for SIP 2025 at IIPE Vizag on Merit Basis",
      description: "Earned prestigious merit-based selection for Summer Internship Program at Indian Institute of Petroleum and Energy, Visakhapatnam for Temperature Process Control."
    },
    {
      title: "Graduated with Academic Distinction (9.05 CGPA / 90%)",
      description: "Consistent academic excellence in Electronics & Instrumentation Engineering at AKNU College of Engineering."
    },
    {
      title: "Active Member of National Service Scheme (NSS)",
      description: "Dedicated volunteer contributing to community outreach and leadership camps at AKNU Campus."
    }
  ]
};
