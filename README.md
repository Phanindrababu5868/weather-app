# Weather App

## Overview

This is a React-based web application that displays a table of cities with infinite scroll and search functionality. Users can view detailed weather information for any city by clicking on its name. The application includes  favorite cities management, and dynamic styling based on weather conditions.

### Features
- **City Table**: Display a list of cities with infinite scroll and search functionality.
- **Favorites**: Add or remove cities from favorites using heart icons.
- **Weather Details**: View detailed weather information for a selected city.
- **Dynamic Styling**: Backgrounds and icons change based on weather conditions.

## Technologies Used

- **React**: Frontend library for building user interfaces.
- **TypeScript**: Optional, for type safety (if used).
- **Context API**: For state management.
- **Axios**: For making HTTP requests.
- **React Router**: For routing between pages.
- **CSS**: For styling the application.
- **OpenWeatherMap API**: For fetching weather data.

## Installation

### Prerequisites

- Node.js and npm installed on your machine.
- A free API key from OpenWeatherMap (https://openweathermap.org) for weather data.

### Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Phanindrababu5868/weather-app
   cd weather-app
   ```
2. **Install Dependencies**

   ```bash
   npm install
   ```
3.  **Create a ```.env``` File Create a ```.env``` file in the root directory   of the project and add your OpenWeatherMap API key:**
  ```
  VITE_OPENWEATHER_API_KEY=your_api_key_here

  ```
4. **Run the Development Server**

  ```
  npm start

  ```
 The application will be accessible at http://localhost:5173.

## Usage 

1. #### Search for Cities
- Type the name of a city in the search box to get autocomplete    suggestions.
- Click on a city name to view its weather details.

 2. #### Manage Favorites

- Click the heart icon next to a city to add or remove it from your favorites.

3. #### View Weather Details

- Navigate to the weather page by clicking on a city name to see current weather and forecasts.

## Project Structure

```
  ├── weatherapp/
  │   ├── public/
  │   │   ├── icons/
  │   ├── src/
  │   │   ├── components/
  │   │   ├── context.tsx
  │   │   ├── App.jsx
  │   │   ├── index.css 
  │   │   ├── main.jsx
  │   └── index.html
  │   └── package.json
  │
  └── README.md
```  
## Contributing
 Feel free to open issues or submit pull requests if you have any  suggestions or improvements. Contributions are welcome!

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- React
- OpenWeatherMap API
- Font Awesome for icons
