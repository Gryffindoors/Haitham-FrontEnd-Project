# 🌱 Leaf & Fork - Healthy Food Web Application

## 🌱 Project Overview
Leaf & Fork is a modern, responsive web application designed for food enthusiasts looking for healthy eating options. Built using React with Vite, the platform showcases a seamless and dynamic user experience for browsing, filtering, and learning about healthy foods.

## ✨ Key Features
- **🌙 Light/Dark mode toggle**
- **🛠️ Dynamic routing**
- **🛒 Cart management**
- **⭐ Favorites management**
- **🏷️ Product and category management**
- **🔐 User authentication**

## 📦 Installation & Setup
To run this project locally, follow these steps:

### Prerequisites
- Install [Node.js](https://nodejs.org/) (latest LTS recommended)
- Install [Vite](https://vitejs.dev/)

### Clone the Repository
```bash
git clone https://github.com/yourusername/LeafAndFork.git
cd LeafAndFork
```

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

## 🛠️ Technologies Used
- **Frontend:** React (Vite), Tailwind CSS
- **State Management:** Context API
- **API Handling:** Axios
- **Routing:** React Router
- **UI Components:** Swiper.js

## 📂 Project Structure
```
Haitham-FrontEnd-Project-main/
│── public/              # Static assets
│── src/
│   ├── APIContext/      # Context API for data management
│   ├── Axios/           # Axios instance configuration
│   ├── Components/      # Reusable UI components
│   ├── Constants/       # Static data and image links
│   ├── Pages/           # Main pages of the application
│   ├── index.css        # Global styles
│   ├── App.jsx          # Main React component
│   ├── main.jsx         # Entry point of the app
│── package.json         # Project dependencies
│── vite.config.js       # Vite configuration
│── README.md            # Project documentation
```

## 🔍 Feature Breakdown

### 🔐 Authentication
- Uses React Context API to manage user authentication.
- Stores logged-in user data in `localStorage`.
- Provides signup, login, and logout functionality.
- Auto-loads user session on page reload.
- [📄 View Full Breakdown](https://drive.google.com/file/d/1sK-pU1ejO4N2HCNQBRtG_LctmUuUQKuA/view?usp=sharing)

### 🛒 Cart Management
- Uses Context API to manage cart state.
- Allows users to add, remove, and update items in the cart.
- Persists cart data in `localStorage`.
- Clears cart on user logout.
- [📄 View Full Breakdown](https://drive.google.com/file/d/1IiaSYgNTwdZITRpO-ZYtFv5C6DHsKB7w/view?usp=sharing)

### ⭐ Favourites
- Enables users to save products as favourites.
- Uses Context API to manage favourite items.
- Persists favourite products in `localStorage`.
- Clears favourites on user logout.
- [📄 View Full Breakdown](https://drive.google.com/file/d/1nZlKFZUGmfr51Sle1W4vZVp7yahBvtnh/view?usp=sharing)

### 🏷️ Product Management
- Fetches product categories and product lists via Axios.
- Organizes products by category.
- Provides a global product state using Context API.
- [📄 View Full Breakdown](https://drive.google.com/file/d/1Vuowhug-xeH-o0mRa4Tl_SI6YlcGesga/view?usp=sharing)

### 🎨 Theme Management
- Allows users to switch between light and dark mode.
- Stores user preference in `localStorage`.
- Dynamically applies theme changes to the `document`.
- [📄 View Full Breakdown](https://drive.google.com/file/d/1bcd3u_pv8RqHCg_dMmeKk3XtihCN9Seq/view?usp=sharing)

## 🤝 Contributions
Contributions are welcome! To contribute:
1. **Fork** the repository.
2. **Create a new branch** (`git checkout -b feature-name`).
3. **Commit your changes** (`git commit -m 'Added new feature'`).
4. **Push to your branch** (`git push origin feature-name`).
5. **Submit a Pull Request**.

## 📜 License
This project is licensed under the **MIT License**. Feel free to use and modify it as needed.

## 📞 Contact
For any questions, issues, or feedback, please open an issue on GitHub or contact the project owner directly.

---

