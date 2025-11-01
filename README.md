# 💱 Currency Converter

A modern, responsive currency converter web application built with React and Vite. Convert between major world currencies with real-time exchange rates fetched from a reliable API.

## ✨ Features

- 🔄 **Real-time Exchange Rates**: Get up-to-date currency conversion rates from ExchangeRate-API
- 💰 **10 Major Currencies**: Support for USD, EUR, GBP, JPY, AUD, CAD, CNY, INR, BRL, and ZAR
- 🎨 **Modern UI**: Clean, intuitive interface with Tailwind CSS styling
- ⚡ **Fast & Responsive**: Built with Vite for lightning-fast performance
- 📱 **User-Friendly**: Simple input fields and dropdowns for easy currency conversion

## 🛠️ Tech Stack

- **React 19** - Modern React with hooks
- **Vite 7** - Fast build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **ESLint** - Code linting and quality

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## 🚀 Getting Started

### Installation

1. **Clone the repository** (or navigate to the project directory):
   ```bash
   cd currency
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

### Running the Application

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Open your browser** and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

### Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

The built files will be in the `dist` directory.

## 📖 Usage

1. Enter the amount you want to convert in the **Amount** field
2. Select the **From Currency** from the dropdown menu
3. Select the **To Currency** from the dropdown menu
4. The converted amount will be automatically calculated and displayed below

## 🌐 API

This application uses the [ExchangeRate-API](https://www.exchangerate-api.com/) to fetch real-time exchange rates. The API endpoint used is:

```
https://api.exchangerate-api.com/v4/latest/{CURRENCY_CODE}
```

**Note**: This API is free and doesn't require an API key for basic usage.

## 📁 Project Structure

```
currency/
├── public/              # Static assets
│   └── vite.svg
├── src/
│   ├── assets/         # Images and other assets
│   │   ├── Currency.png
│   │   └── Money.png
│   ├── Components/     # React components
│   │   └── Currency.jsx
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Application entry point
│   └── index.css       # Global styles
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
└── README.md           # Project documentation
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Supported Currencies

- 🇺🇸 USD - United States Dollar
- 🇪🇺 EUR - Euro
- 🇬🇧 GBP - British Pound Sterling
- 🇯🇵 JPY - Japanese Yen
- 🇦🇺 AUD - Australian Dollar
- 🇨🇦 CAD - Canadian Dollar
- 🇨🇳 CNY - Chinese Yuan
- 🇮🇳 INR - Indian Rupee
- 🇧🇷 BRL - Brazilian Real
- 🇿🇦 ZAR - South African Rand

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Created with ❤️ using React and Vite

---

**Note**: Exchange rates are updated daily. For the most accurate rates, refer to official financial sources for critical transactions.
