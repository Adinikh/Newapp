# Recipro Mobile Client — Flutter Architecture

> **Framework**: **Flutter 3.x (Dart 3.x)**
> **Architecture**: Feature-First Clean Architecture with **Riverpod**
> **Platforms**: Android (Primary / 95% India share), iOS, and Flutter Web

---

## 1. Directory Structure

```
mobile/
├── pubspec.yaml
├── lib/
│   ├── main.dart                      # App entry point
│   ├── app.dart                       # MaterialApp with theme, router, and providers
│   ├── core/                          # Cross-cutting foundational modules
│   │   ├── constants/                 # Colors, typography, asset paths, API endpoints
│   │   ├── network/                   # Dio HTTP client, interceptors, auth token refresh
│   │   ├── storage/                   # Secure storage & Hive local cache
│   │   ├── theme/                     # Brand colors, dark/light theme, custom styles
│   │   └── utils/                     # Formatters, validators, permissions handler
│   └── features/                      # Feature-first modular components
│       ├── auth/                      # Phone OTP, College Email Bonafide verification
│       │   ├── presentation/          # Screens: LoginScreen, OtpScreen, BonafideScreen
│       │   ├── domain/                # Entities & validation logic
│       │   └── data/                  # Auth repository & remote data source
│       ├── discovery/                 # Campus discovery deck (fluid swipe / reciprocal cards)
│       │   ├── presentation/          # Screens: DiscoveryScreen, FilterModal
│       │   └── state/                 # Riverpod match/card state providers
│       ├── matches/                   # Reciprocal matches list & Spark Icebreaker prompts
│       │   └── presentation/          # Screens: MatchesListScreen, SparkModal
│       ├── chat/                      # Real-time WebSocket messaging with safety banners
│       │   └── presentation/          # Screens: ChatRoomScreen, VenueSuggestionCard
│       ├── ai_wingman/                # Recipro AI Coach drawer & verified safe venues
│       │   └── presentation/          # Screens: WingmanDrawer, SafeVenuesScreen
│       └── profile/                   # Student profile view, photo upload to Cloudflare R2
└── assets/
    ├── icons/
    ├── images/
    └── lottie/                        # Match celebration and liveness animations
```

---

## 2. Core Dependencies (`pubspec.yaml` Target)

```yaml
dependencies:
  flutter:
    sdk: flutter

  # State Management & DI
  flutter_riverpod: ^2.5.1
  riverpod_annotation: ^2.3.5

  # Networking & Real-time
  dio: ^5.4.3
  web_socket_channel: ^2.4.5

  # Local Storage & Caching
  flutter_secure_storage: ^9.0.0
  hive_flutter: ^1.1.0

  # Camera & Verification
  camera: ^0.10.5+9
  image_picker: ^1.0.7
  local_auth: ^2.1.8

  # UI, Animation & Haptics
  flutter_card_swiper: ^7.0.0
  cached_network_image: ^3.3.1
  google_fonts: ^6.2.1
  lottie: ^3.1.0
  flutter_svg: ^2.0.10+1

  # Deep Linking & Navigation
  go_router: ^13.2.0
```

---

## 3. Quick Start (When Flutter SDK is Installed)

```bash
# 1. Ensure Flutter is installed and added to your system PATH
flutter doctor

# 2. Create the Flutter app template inside /mobile
cd d:\dating\mobile
flutter create --org com.recipro --project-name recipro_mobile .

# 3. Run on connected Android device / emulator
flutter run
```
