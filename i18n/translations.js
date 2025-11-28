// Translations for Oasis
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
            title: "Oasis",
            description: 'The <span class="about-bold">oasis</span> project is a collection of "interactive experiences", each experience has its own unique design and functionality. The project intends to help alleviate symptoms and reduce reactions of specific phobias on the website, with each interactive experience represented by a poster. By clicking on a poster, an interactive experience opens up specialized to a certain type of phobia.',
            contact: "If you want to contact me check out my",
            website: "website",
            copyright: "Copyright © 2025 cute centipede . All rights reserved.",
            kmlaProject: "This is a KMLA project"
        },

        // Injection experience
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
            done: "Done!"
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
            title: "오아시스",
            description: '<span class="about-bold">오아시스</span> 프로젝트는 "인터랙티브 경험"의 모음입니다. 각 경험은 고유한 디자인과 기능을 가지고 있습니다. 이 프로젝트는 웹사이트에서 특정 공포증의 증상을 완화하고 반응을 줄이는 것을 목표로 하며, 각 인터랙티브 경험은 포스터로 표현됩니다. 포스터를 클릭하면 특정 유형의 공포증에 특화된 인터랙티브 경험이 열립니다.',
            contact: "연락을 원하시면",
            website: "웹사이트",
            copyright: "Copyright © 2025 cute centipede . All rights reserved.",
            kmlaProject: "이것은 KMLA 프로젝트입니다"
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
            done: "완료!"
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
        }
    }
};

// Make it available globally
window.translations = translations;
