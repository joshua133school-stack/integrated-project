// Translations for FAAH
// English (en) and Korean (ko)

const translations = {
    en: {
        // Common
        common: {
            previous: "← Previous",
            next: "Next →",
            seconds: "seconds",
            ready: "Ready",
            tryAgain: "Try Again"
        },

        // About page (index.html)
        about: {
            title: "FAAH",
            description: 'The <span class="about-bold">FAAH</span> project is a collection of "interactive experiences", each experience has its own unique design and functionality. The project intends to help alleviate symptoms and reduce reactions of specific phobias on the website, with each interactive experience represented by a poster. By clicking on a poster, an interactive experience opens up specialized to a certain type of phobia.',
            contact: "If you want to contact me check out my",
            website: "website",
            copyright: "Copyright © 2025 teamcutiejinae . All rights reserved.",
            kmlaProject: "This is a KMLA project"
        },

        // Footer (main home screen)
        footer: {
            aboutFaah: "about FAaH",
            fullscreen: "fullscreen",
            exitFullscreen: "exit fullscreen"
        },
        injection: {
            holdToClear: "Hold to Clear",
            injectionTypes: "Injection Types",
            typesSubtitle: "Different types of medical injections",
            vaccineInjection: "Vaccine Injection",
            intramuscular: "Intramuscular",
            bloodDraw: "Blood Draw",
            subcutaneous: "Subcutaneous",
            startInjection: "Start Injection",
            actualNeedleSize: "Actual Needle Size",
            needleSizeSubtitle: "See how small needles really are on your screen",
            gauge25: "25 Gauge (0.5mm) - Typical Vaccine",
            gauge23: "23 Gauge (0.6mm) - Standard Injection",
            gauge21: "21 Gauge (0.8mm) - Blood Draw",
            needleComparison1: "These lines represent the <strong>actual thickness</strong> of medical needles.",
            needleComparison2: "Compare to a human hair: 0.07mm (much thinner!)",
            needleComparison3: "The needle tip is even thinner and incredibly sharp.",
            // Simulation phases
            watch: "Watch...",
            approaching: "Approaching...",
            insert: "Insert",
            inject: "Inject",
            withdraw: "Withdraw",
            done: "Done!",
            // Breathing exercise
            inhale: "Breathe In",
            hold: "Hold",
            exhale: "Breathe Out"
        },

        // Knife safety experience
        knife: {
            // Step 1: Introduction
            understandingKnives: "Understanding Knives",
            introSubtitle: "Let's explore knives and sharp edges together",
            kitchenKnife: "Kitchen Knife",
            scissors: "Scissors",
            utilityKnife: "Utility Knife",
            introText: "Knives are common tools we use in everyday life. While they have sharp edges, understanding how to handle them properly makes them safe to use.",

            // Step 2: Safety
            safetyTitle: "How to Handle Knives Safely",
            safetyTip1Title: "Always cut away from your body",
            safetyTip1: "This prevents accidents if the knife slips",
            safetyTip2Title: "Keep a firm grip on the handle",
            safetyTip2: "A secure grip gives you better control",
            safetyTip3Title: "Use a cutting board",
            safetyTip3: "Stable surfaces prevent the knife from slipping",
            safetyTip4Title: "Store knives properly",
            safetyTip4: "Knife blocks or sheaths keep them safe when not in use",
            safetyTip5Title: "Never try to catch a falling knife",
            safetyTip5: "Let it fall and step back safely",
            safetyConclusion: "Following these simple rules makes knife use safe and routine!",

            // Step 3: Drop simulation
            dropSimulation: "Drop Simulation",
            dropSubtitle: "See how knives fall naturally",
            startDropSimulation: "Start Drop Simulation",
            dropAgain: "Drop Again",
            dropText: "Knives often land on their flat backs due to weight distribution. The handle is typically heavier than the blade, causing the knife to rotate and land safely.",
            dropSuccess: "✓ The knife landed safely on its back!",
            dropExplanation: "This demonstrates that knives don't always fall point-first. The weight distribution often causes them to rotate and land harmlessly.",

            // Step 4: Cuts info
            understandingCuts: "Understanding Cuts",
            mostCutsShallow: "Most Cuts Are Shallow",
            mostCutsShallowText: "The majority of accidental cuts from kitchen knives are superficial, affecting only the top layer of skin. These heal quickly with basic first aid.",
            controlledPressure: "Controlled Pressure",
            controlledPressureText: "Knives require deliberate pressure to cut deeply. Accidental contact typically results in minor, shallow cuts that are easily treatable.",
            quickHealing: "Quick Healing",
            quickHealingText: "Small cuts heal rapidly - usually within a few days. The body's natural healing process quickly repairs minor knife cuts with proper care.",
            preventionEasy: "Prevention Is Easy",
            preventionEasyText: "Following basic safety guidelines makes cuts very rare. Awareness and proper technique eliminate most risks when using knives.",
            cutsConclusion: "With proper handling, knives are safe, useful tools that pose minimal risk!"
        },

        // Language switcher
        langSwitch: {
            en: "EN",
            ko: "한국어"
        },

        // Diagnostic assessments
        diagnostic: {
            continueToExperience: "Continue to Experience",

            // Airplane diagnostic
            airplane: {
                title: "Fear of Flying Assessment",
                q1: "Do you feel anxious when thinking about flying?",
                q2: "Have you avoided flying due to fear?",
                q3: "Do you experience physical symptoms (sweating, racing heart) related to flying?",
                q4: "How would you rate your fear of flying?",
                q5: "Does turbulence cause you significant distress?",
                q6: "Do thoughts of plane crashes intrude on your daily life?",
                options: {
                    never: "Never",
                    sometimes: "Sometimes",
                    often: "Often",
                    always: "Always",
                    onceOrTwice: "Once or twice",
                    severalTimes: "Several times",
                    alwaysAvoid: "Always avoid",
                    noSymptoms: "No symptoms",
                    mild: "Mild",
                    moderate: "Moderate",
                    severe: "Severe",
                    noFear: "No fear",
                    notAtAll: "Not at all",
                    aLittle: "A little",
                    quiteBit: "Quite a bit",
                    extremely: "Extremely",
                    rarely: "Rarely",
                    frequently: "Frequently"
                }
            },

            // Injection diagnostic
            injection: {
                title: "Fear of Needles Assessment",
                q1: "Do you feel anxious when thinking about needles or injections?",
                q2: "Have you avoided medical procedures due to fear of needles?",
                q3: "Do you experience physical symptoms (sweating, dizziness) around needles?",
                q4: "How would you rate your fear of injections?",
                q5: "Do you feel faint or nauseous when seeing needles?",
                q6: "Does anticipating an injection cause you significant distress?"
            },

            // Thunder diagnostic
            thunder: {
                title: "Fear of Thunder Assessment",
                q1: "Do you feel anxious during thunderstorms?",
                q2: "Have you sought shelter or hidden during storms due to fear?",
                q3: "Do you experience physical symptoms (trembling, rapid heartbeat) during thunder?",
                q4: "How would you rate your fear of thunder and lightning?",
                q5: "Do you check weather forecasts obsessively to avoid storms?",
                q6: "Does the sound of thunder cause you significant distress?",
                options: {
                    occasionally: "Occasionally",
                    constantly: "Constantly"
                }
            },

            // Darkness diagnostic
            darkness: {
                title: "Fear of Darkness Assessment",
                q1: "Do you feel anxious in dark environments?",
                q2: "Have you avoided dark places due to fear?",
                q3: "Do you need a light source to fall asleep?",
                q4: "How would you rate your fear of darkness?",
                q5: "Do you imagine threatening things in the dark?",
                q6: "Does entering a dark room cause immediate anxiety?",
                options: {
                    usually: "Usually"
                }
            },

            // Heights diagnostic
            heights: {
                title: "Fear of Heights Assessment",
                q1: "Do you feel anxious when at high places?",
                q2: "Have you avoided tall buildings, bridges, or balconies due to fear?",
                q3: "Do you experience physical symptoms (dizziness, weak knees) at heights?",
                q4: "How would you rate your fear of heights?",
                q5: "Do you feel an urge to jump or fear of falling when at heights?",
                q6: "Does looking down from a height cause immediate panic?"
            }
        },

        // Poster tiles (main page)
        posters: {
            plane: { title: "Plane", date: "Fear of Airplanes" },
            injection: { title: "Injection", date: "Fear of Injections" },
            thunder: { title: "Thunder", date: "Fear of Lightning & Thunder" },
            darkness: { title: "Darkness", date: "Fear of Darkness" },
            ocean: { title: "Ocean", date: "Fear of Oceans" },
            circles: { title: "Circles", date: "Fear of Circles" },
            insects: { title: "Insects", date: "Fear of Insects" },
            heights: { title: "Heights", date: "Fear of Heights" },
            tightSpaces: { title: "Tight Spaces", date: "Fear of Dogs" },
            knives: { title: "Knives", date: "Fear of Knives" },
            injury: { title: "Injury", date: "Fear of Injury" },
            claustrophobia: { title: "Tight Spaces", date: "Fear of Tight Spaces" },
            socialEvents: { title: "Social Events", date: "Fear of Social Events" },
            germs: { title: "Germs", date: "Fear of Germs" },
            driving: { title: "Driving", date: "Fear of Driving" }
        },

        // Checkup test (end of experience)
        checkup: {
            sessionComplete: "Session Complete",
            quickCheckin: "Quick Check-in",
            submit: "Submit",
            skip: "Skip",
            notAtAll: "Not at all",
            veryMuch: "Very much",
            questions: {
                airplane: {
                    q1: "How anxious do you feel about flying right now?",
                    q2: "How much does the thought of a flight still worry you?",
                    q3: "How much discomfort do you still feel about air travel?"
                },
                injection: {
                    q1: "How anxious do you feel about needles right now?",
                    q2: "How much does the thought of an injection still worry you?",
                    q3: "How much discomfort do you still feel about medical procedures?"
                },
                thunder: {
                    q1: "How anxious do you feel about thunderstorms?",
                    q2: "How much would a storm still disturb you?",
                    q3: "How much unease do you still feel about severe weather?"
                },
                darkness: {
                    q1: "How anxious do you feel about darkness now?",
                    q2: "How much does being in the dark still worry you?",
                    q3: "How much discomfort do you feel in dark spaces?"
                },
                heights: {
                    q1: "How anxious do you feel about heights right now?",
                    q2: "How much does being up high still worry you?",
                    q3: "How much discomfort do you feel at elevated places?"
                }
            }
        },

        // Account / Doctor's note panel
        account: {
            registerCheckin: "Register / Check-in",
            checkedIn: "Checked In",
            register: "Register",
            checkIn: "Check In",
            checkOut: "Check Out",
            endSession: "End Session",
            patientId: "Patient ID",
            totalSessions: "Total Sessions",
            noSessions: "No sessions recorded yet.",
            completeExperience: "Complete an experience to begin.",
            completeDiagnostic: "Complete a diagnostic to begin tracking your progress.",
            recentActivity: "Recent Activity",
            sessions: "sessions",
            session: "session",
            change: "change",
            improving: "Improving",
            rising: "Rising",
            stable: "Stable",
            // Form fields
            name: "Name",
            email: "Email",
            password: "Password",
            patient: "Patient",
            enterName: "Enter your name...",
            enterEmail: "Enter your email...",
            createPassword: "Create a password...",
            enterPassword: "Enter password...",
            // Panel titles and buttons
            newPatientFile: "New Patient File",
            createFile: "Create File",
            alreadyRegistered: "Already Registered",
            newPatient: "New Patient",
            welcomeBack: "Welcome Back",
            signIn: "Sign In",
            globalAccount: "Global Account",
            localStorage: "Local Storage",
            findYourFile: "Find Your File",
            noAccountFound: "No account found on this device.",
            dataStoredLocally: "Your data is stored locally in this browser.",
            registerNewAccount: "Register New Account",
            // Error messages
            enterNameError: "Please enter your name",
            enterEmailError: "Please enter your email",
            createPasswordError: "Please create a password",
            passwordLengthError: "Password must be at least 6 characters",
            enterPasswordError: "Please enter your password",
            incorrectPassword: "Incorrect password",
            // Phobia short names (for session view)
            phobiaShort: {
                airplane: "Flying",
                injection: "Needles",
                thunder: "Thunder",
                darkness: "Darkness",
                heights: "Heights"
            },
            // Phobia full names
            phobias: {
                airplane: "Fear of Flying",
                injection: "Fear of Needles",
                thunder: "Fear of Thunder",
                darkness: "Fear of Darkness",
                heights: "Fear of Heights",
                ocean: "Fear of Water"
            }
        },

        // Plane simulation (3D flight experience)
        plane: {
            continueBtn: "Continue",
            // Phase labels
            phaseAirport: "Airport Terminal",
            phaseBoarding: "Boarding",
            phaseFindSeat: "Finding Your Seat",
            phaseSeated: "Seated",
            phaseTaxi: "Taxiing",
            phaseTakeoff: "Takeoff",
            phaseClimbing: "Climbing",
            phaseCruising: "Cruising — 35,000 ft",
            phaseLightTurbulence: "Light Turbulence",
            phaseSevereTurbulence: "Severe Turbulence",
            phaseStorm: "⚡ Electrical Storm",
            phaseEmergency: "🔴 EMERGENCY",
            phaseImpact: "IMPACT",
            // Prompts
            gateBoarding: "Gate 84 — Now Boarding",
            boardingAircraft: "Boarding the aircraft...",
            findSeat: "Find your marked seat",
            fastenSeatbelt: "Please fasten your seatbelt.",
            seatbeltFastened: "Seatbelt fastened.",
            taxiing: "Taxiing to runway...",
            holdingShort: "Holding short of runway...",
            clearedTakeoff: "Cleared for takeoff.",
            prepareTakeoff: "Prepare for takeoff...",
            rotate: "Rotate...",
            climbing: "Climbing to cruising altitude...",
            moveAbout: "You may now move about the cabin.",
            smoothSkies: "Smooth skies ahead...",
            weatherAhead: "Weather ahead...",
            // Sub-prompts
            subAirport: "Click to look around — WASD to walk — Board at Gate 84",
            subBoarding: "Click to look around — WASD to walk — Click green marker to sit",
            subSeatbelt: "Press E to fasten seatbelt",
            // Warnings
            severeTurbulence: "SEVERE TURBULENCE",
            lightningStrike: "⚡ LIGHTNING STRIKE",
            braceForImpact: "BRACE FOR IMPACT",
            // Survival
            youSurvived: "You survived.",
            survivalStats: 'In reality, 95.7% of passengers survive plane crashes.<br><br>Flying remains the safest form of long-distance travel.<br><br>Your chances of being in a fatal crash are<br><b style="font-size:2rem">1 in 13,700,000</b>'
        }
    },

    ko: {
        // Common
        common: {
            previous: "← 이전",
            next: "다음 →",
            seconds: "초",
            ready: "준비",
            tryAgain: "다시 시도"
        },

        // About page (index.html)
        about: {
            title: "FAAH",
            description: '<span class="about-bold">FAAH</span> 프로젝트는 "인터랙티브 경험"의 모음입니다. 각 경험은 고유한 디자인과 기능을 가지고 있습니다. 이 프로젝트는 웹사이트에서 특정 공포증의 증상을 완화하고 반응을 줄이는 것을 목표로 하며, 각 인터랙티브 경험은 포스터로 표현됩니다. 포스터를 클릭하면 특정 유형의 공포증에 특화된 인터랙티브 경험이 열립니다.',
            contact: "연락을 원하시면",
            website: "웹사이트",
            copyright: "Copyright © 2025 teamcutiejinae . All rights reserved.",
            kmlaProject: "이것은 KMLA 프로젝트입니다"
        },

        // Footer (main home screen)
        footer: {
            aboutFaah: "FAaH에 대하여",
            fullscreen: "전체화면",
            exitFullscreen: "전체화면 나가기"
        },

        // Injection experience
        injection: {
            holdToClear: "길게 눌러 지우기",
            injectionTypes: "주사 종류",
            typesSubtitle: "다양한 종류의 의료 주사",
            vaccineInjection: "백신 주사",
            intramuscular: "근육 주사",
            bloodDraw: "채혈",
            subcutaneous: "피하 주사",
            startInjection: "주사 시작",
            actualNeedleSize: "실제 바늘 크기",
            needleSizeSubtitle: "화면에서 바늘이 얼마나 작은지 확인하세요",
            gauge25: "25 게이지 (0.5mm) - 일반 백신",
            gauge23: "23 게이지 (0.6mm) - 표준 주사",
            gauge21: "21 게이지 (0.8mm) - 채혈",
            needleComparison1: "이 선들은 의료용 바늘의 <strong>실제 두께</strong>를 나타냅니다.",
            needleComparison2: "사람 머리카락과 비교: 0.07mm (훨씬 가늘어요!)",
            needleComparison3: "바늘 끝은 더 가늘고 믿을 수 없을 정도로 날카롭습니다.",
            // Simulation phases
            watch: "보세요...",
            approaching: "접근 중...",
            insert: "삽입",
            inject: "주입",
            withdraw: "빼기",
            done: "완료!",
            // Breathing exercise
            inhale: "들이쉬기",
            hold: "참기",
            exhale: "내쉬기"
        },

        // Knife safety experience
        knife: {
            // Step 1: Introduction
            understandingKnives: "칼 이해하기",
            introSubtitle: "칼과 날카로운 모서리에 대해 함께 알아봅시다",
            kitchenKnife: "주방칼",
            scissors: "가위",
            utilityKnife: "다용도칼",
            introText: "칼은 일상생활에서 사용하는 일반적인 도구입니다. 날카로운 모서리가 있지만, 올바르게 다루는 방법을 이해하면 안전하게 사용할 수 있습니다.",

            // Step 2: Safety
            safetyTitle: "칼을 안전하게 다루는 방법",
            safetyTip1Title: "항상 몸에서 멀리 자르세요",
            safetyTip1: "칼이 미끄러져도 사고를 예방합니다",
            safetyTip2Title: "손잡이를 단단히 잡으세요",
            safetyTip2: "확실한 그립이 더 나은 제어력을 제공합니다",
            safetyTip3Title: "도마를 사용하세요",
            safetyTip3: "안정적인 표면이 칼이 미끄러지는 것을 방지합니다",
            safetyTip4Title: "칼을 올바르게 보관하세요",
            safetyTip4: "칼 블록이나 칼집이 사용하지 않을 때 안전하게 보관합니다",
            safetyTip5Title: "떨어지는 칼을 절대 잡으려 하지 마세요",
            safetyTip5: "떨어지게 두고 안전하게 뒤로 물러나세요",
            safetyConclusion: "이 간단한 규칙들을 따르면 칼 사용이 안전하고 일상적이 됩니다!",

            // Step 3: Drop simulation
            dropSimulation: "낙하 시뮬레이션",
            dropSubtitle: "칼이 자연스럽게 떨어지는 모습을 보세요",
            startDropSimulation: "낙하 시뮬레이션 시작",
            dropAgain: "다시 떨어뜨리기",
            dropText: "칼은 무게 분포로 인해 종종 평평한 등으로 떨어집니다. 손잡이가 일반적으로 칼날보다 무거워서 칼이 회전하여 안전하게 착지합니다.",
            dropSuccess: "✓ 칼이 안전하게 등으로 떨어졌습니다!",
            dropExplanation: "이것은 칼이 항상 끝부터 떨어지지 않는다는 것을 보여줍니다. 무게 분포로 인해 종종 회전하여 무해하게 착지합니다.",

            // Step 4: Cuts info
            understandingCuts: "베임 이해하기",
            mostCutsShallow: "대부분의 베임은 얕습니다",
            mostCutsShallowText: "주방칼로 인한 대부분의 우발적 베임은 표피층에만 영향을 미치는 표면적입니다. 기본적인 응급처치로 빠르게 치유됩니다.",
            controlledPressure: "제어된 압력",
            controlledPressureText: "칼로 깊이 베려면 의도적인 압력이 필요합니다. 우발적 접촉은 일반적으로 쉽게 치료할 수 있는 경미하고 얕은 베임을 초래합니다.",
            quickHealing: "빠른 치유",
            quickHealingText: "작은 베임은 보통 며칠 내에 빠르게 치유됩니다. 적절한 관리로 신체의 자연 치유 과정이 경미한 칼 베임을 빠르게 회복시킵니다.",
            preventionEasy: "예방은 쉽습니다",
            preventionEasyText: "기본적인 안전 지침을 따르면 베임이 매우 드물어집니다. 인식과 적절한 기술이 칼 사용 시 대부분의 위험을 제거합니다.",
            cutsConclusion: "올바르게 다루면 칼은 최소한의 위험만 있는 안전하고 유용한 도구입니다!"
        },

        // Language switcher
        langSwitch: {
            en: "EN",
            ko: "한국어"
        },

        // Diagnostic assessments
        diagnostic: {
            continueToExperience: "체험 계속하기",

            // Airplane diagnostic
            airplane: {
                title: "비행 공포증 평가",
                q1: "비행에 대해 생각할 때 불안함을 느끼시나요?",
                q2: "두려움 때문에 비행을 피한 적이 있나요?",
                q3: "비행과 관련하여 신체적 증상(땀, 심장 두근거림)을 경험하시나요?",
                q4: "비행에 대한 두려움을 어떻게 평가하시나요?",
                q5: "난기류가 심각한 고통을 유발하나요?",
                q6: "비행기 추락에 대한 생각이 일상생활에 침투하나요?",
                options: {
                    never: "전혀 없음",
                    sometimes: "가끔",
                    often: "자주",
                    always: "항상",
                    onceOrTwice: "한두 번",
                    severalTimes: "여러 번",
                    alwaysAvoid: "항상 피함",
                    noSymptoms: "증상 없음",
                    mild: "가벼움",
                    moderate: "보통",
                    severe: "심함",
                    noFear: "두려움 없음",
                    notAtAll: "전혀 아님",
                    aLittle: "조금",
                    quiteBit: "꽤 많이",
                    extremely: "매우 심하게",
                    rarely: "드물게",
                    frequently: "자주"
                }
            },

            // Injection diagnostic
            injection: {
                title: "주사 공포증 평가",
                q1: "바늘이나 주사에 대해 생각할 때 불안함을 느끼시나요?",
                q2: "바늘에 대한 두려움 때문에 의료 시술을 피한 적이 있나요?",
                q3: "바늘 주변에서 신체적 증상(땀, 어지러움)을 경험하시나요?",
                q4: "주사에 대한 두려움을 어떻게 평가하시나요?",
                q5: "바늘을 볼 때 기절하거나 메스꺼움을 느끼시나요?",
                q6: "주사를 예상할 때 심각한 고통을 느끼시나요?"
            },

            // Thunder diagnostic
            thunder: {
                title: "천둥 공포증 평가",
                q1: "천둥번개가 치는 동안 불안함을 느끼시나요?",
                q2: "두려움 때문에 폭풍 중에 피난처를 찾거나 숨은 적이 있나요?",
                q3: "천둥 중에 신체적 증상(떨림, 빠른 심장박동)을 경험하시나요?",
                q4: "천둥과 번개에 대한 두려움을 어떻게 평가하시나요?",
                q5: "폭풍을 피하기 위해 날씨 예보를 집착적으로 확인하시나요?",
                q6: "천둥 소리가 심각한 고통을 유발하나요?",
                options: {
                    occasionally: "가끔",
                    constantly: "끊임없이"
                }
            },

            // Darkness diagnostic
            darkness: {
                title: "어둠 공포증 평가",
                q1: "어두운 환경에서 불안함을 느끼시나요?",
                q2: "두려움 때문에 어두운 곳을 피한 적이 있나요?",
                q3: "잠들기 위해 조명이 필요하신가요?",
                q4: "어둠에 대한 두려움을 어떻게 평가하시나요?",
                q5: "어둠 속에서 위협적인 것을 상상하시나요?",
                q6: "어두운 방에 들어가면 즉각적인 불안을 느끼시나요?",
                options: {
                    usually: "보통"
                }
            },

            // Heights diagnostic
            heights: {
                title: "고소 공포증 평가",
                q1: "높은 곳에 있을 때 불안함을 느끼시나요?",
                q2: "두려움 때문에 높은 건물, 다리, 발코니를 피한 적이 있나요?",
                q3: "높은 곳에서 신체적 증상(어지러움, 무릎 힘 빠짐)을 경험하시나요?",
                q4: "높은 곳에 대한 두려움을 어떻게 평가하시나요?",
                q5: "높은 곳에서 뛰어내리고 싶은 충동이나 떨어질 것 같은 두려움을 느끼시나요?",
                q6: "높은 곳에서 아래를 내려다보면 즉각적인 공황을 느끼시나요?"
            }
        },

        // Poster tiles (main page)
        posters: {
            plane: { title: "비행기", date: "비행 공포증" },
            injection: { title: "주사", date: "주사 공포증" },
            thunder: { title: "천둥", date: "번개 및 천둥 공포증" },
            darkness: { title: "어둠", date: "어둠 공포증" },
            ocean: { title: "바다", date: "바다 공포증" },
            circles: { title: "원", date: "원형 공포증" },
            insects: { title: "곤충", date: "곤충 공포증" },
            heights: { title: "높은 곳", date: "고소 공포증" },
            tightSpaces: { title: "좁은 공간", date: "개 공포증" },
            knives: { title: "칼", date: "칼 공포증" },
            injury: { title: "부상", date: "부상 공포증" },
            claustrophobia: { title: "좁은 공간", date: "폐소 공포증" },
            socialEvents: { title: "사회적 행사", date: "사회 공포증" },
            germs: { title: "세균", date: "세균 공포증" },
            driving: { title: "운전", date: "운전 공포증" }
        },

        // Checkup test (end of experience)
        checkup: {
            sessionComplete: "세션 완료",
            quickCheckin: "간단한 체크인",
            submit: "제출",
            skip: "건너뛰기",
            notAtAll: "전혀 아님",
            veryMuch: "매우 그렇다",
            questions: {
                airplane: {
                    q1: "지금 비행에 대해 얼마나 불안하신가요?",
                    q2: "비행에 대한 생각이 여전히 얼마나 걱정되시나요?",
                    q3: "항공 여행에 대해 여전히 얼마나 불편하신가요?"
                },
                injection: {
                    q1: "지금 바늘에 대해 얼마나 불안하신가요?",
                    q2: "주사에 대한 생각이 여전히 얼마나 걱정되시나요?",
                    q3: "의료 시술에 대해 여전히 얼마나 불편하신가요?"
                },
                thunder: {
                    q1: "천둥번개에 대해 얼마나 불안하신가요?",
                    q2: "폭풍이 여전히 얼마나 당신을 방해할까요?",
                    q3: "악천후에 대해 여전히 얼마나 불안하신가요?"
                },
                darkness: {
                    q1: "지금 어둠에 대해 얼마나 불안하신가요?",
                    q2: "어두운 곳에 있는 것이 여전히 얼마나 걱정되시나요?",
                    q3: "어두운 공간에서 얼마나 불편하신가요?"
                },
                heights: {
                    q1: "지금 높은 곳에 대해 얼마나 불안하신가요?",
                    q2: "높은 곳에 있는 것이 여전히 얼마나 걱정되시나요?",
                    q3: "높은 장소에서 얼마나 불편하신가요?"
                }
            }
        },

        // Account / Doctor's note panel
        account: {
            registerCheckin: "등록 / 체크인",
            checkedIn: "체크인 완료",
            register: "등록",
            checkIn: "체크인",
            checkOut: "체크아웃",
            endSession: "세션 종료",
            patientId: "환자 ID",
            totalSessions: "총 세션",
            noSessions: "아직 기록된 세션이 없습니다.",
            completeExperience: "시작하려면 체험을 완료하세요.",
            completeDiagnostic: "진행 상황 추적을 시작하려면 진단을 완료하세요.",
            recentActivity: "최근 활동",
            sessions: "세션",
            session: "세션",
            change: "변화",
            improving: "개선 중",
            rising: "상승 중",
            stable: "안정적",
            // Form fields
            name: "이름",
            email: "이메일",
            password: "비밀번호",
            patient: "환자",
            enterName: "이름을 입력하세요...",
            enterEmail: "이메일을 입력하세요...",
            createPassword: "비밀번호를 만드세요...",
            enterPassword: "비밀번호 입력...",
            // Panel titles and buttons
            newPatientFile: "새 환자 파일",
            createFile: "파일 생성",
            alreadyRegistered: "이미 등록됨",
            newPatient: "새 환자",
            welcomeBack: "다시 오신 것을 환영합니다",
            signIn: "로그인",
            globalAccount: "글로벌 계정",
            localStorage: "로컬 저장소",
            findYourFile: "파일 찾기",
            noAccountFound: "이 장치에서 계정을 찾을 수 없습니다.",
            dataStoredLocally: "데이터는 이 브라우저에 로컬로 저장됩니다.",
            registerNewAccount: "새 계정 등록",
            // Error messages
            enterNameError: "이름을 입력해주세요",
            enterEmailError: "이메일을 입력해주세요",
            createPasswordError: "비밀번호를 만들어주세요",
            passwordLengthError: "비밀번호는 최소 6자 이상이어야 합니다",
            enterPasswordError: "비밀번호를 입력해주세요",
            incorrectPassword: "비밀번호가 틀렸습니다",
            // Phobia short names (for session view)
            phobiaShort: {
                airplane: "비행",
                injection: "주사",
                thunder: "천둥",
                darkness: "어둠",
                heights: "높은 곳"
            },
            // Phobia full names
            phobias: {
                airplane: "비행 공포증",
                injection: "주사 공포증",
                thunder: "천둥 공포증",
                darkness: "어둠 공포증",
                heights: "고소 공포증",
                ocean: "물 공포증"
            }
        },

        // 비행 시뮬레이션 (3D 비행 체험)
        plane: {
            continueBtn: "계속하기",
            // 단계 라벨
            phaseAirport: "공항 터미널",
            phaseBoarding: "탑승 중",
            phaseFindSeat: "좌석 찾기",
            phaseSeated: "착석 완료",
            phaseTaxi: "지상 이동 중",
            phaseTakeoff: "이륙",
            phaseClimbing: "상승 중",
            phaseCruising: "순항 중 — 35,000 ft",
            phaseLightTurbulence: "가벼운 난기류",
            phaseSevereTurbulence: "심한 난기류",
            phaseStorm: "⚡ 뇌우",
            phaseEmergency: "🔴 비상",
            phaseImpact: "충돌",
            // 안내 문구
            gateBoarding: "84번 게이트 — 탑승 시작",
            boardingAircraft: "항공기에 탑승 중...",
            findSeat: "표시된 좌석을 찾으세요",
            fastenSeatbelt: "안전벨트를 매주세요.",
            seatbeltFastened: "안전벨트 착용 완료.",
            taxiing: "활주로로 이동 중...",
            holdingShort: "활주로 대기 중...",
            clearedTakeoff: "이륙 허가.",
            prepareTakeoff: "이륙 준비...",
            rotate: "기수 들기...",
            climbing: "순항 고도로 상승 중...",
            moveAbout: "기내를 자유롭게 이동하실 수 있습니다.",
            smoothSkies: "맑은 하늘이 이어집니다...",
            weatherAhead: "전방에 기상 이변...",
            // 하위 안내
            subAirport: "클릭하여 주위를 둘러보세요 — WASD로 이동 — 84번 게이트에서 탑승",
            subBoarding: "클릭하여 주위를 둘러보세요 — WASD로 이동 — 초록색 표시를 클릭하여 착석",
            subSeatbelt: "E를 눌러 안전벨트 착용",
            // 경고
            severeTurbulence: "심한 난기류",
            lightningStrike: "⚡ 낙뢰",
            braceForImpact: "충격에 대비하세요",
            // 생존
            youSurvived: "당신은 생존했습니다.",
            survivalStats: '실제로 항공기 사고 승객의 95.7%가 생존합니다.<br><br>비행은 여전히 가장 안전한 장거리 이동 수단입니다.<br><br>치명적인 사고를 당할 확률은<br><b style="font-size:2rem">1,370만분의 1</b>'
        }
    }
};

// Make it available globally
window.translations = translations;
