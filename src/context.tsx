import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  SetStateAction,
  Dispatch,
  useContext,
} from "react";

interface City {
  name: string;
  country: string;
  timezone: string;
}

interface CityContextProps {
  cities: City[];
  favoriteCities: string[];
  toggleFavorite: (cityName: string) => void;

  setCities: Dispatch<SetStateAction<City[]>>;
}

export const CityContext = createContext<CityContextProps>({
  cities: [],
  favoriteCities: [],
  toggleFavorite: () => {},
  setCities: () => {},
});

export const CityProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cities, setCities] = useState<City[]>([]);
  const [favoriteCities, setFavoriteCities] = useState<string[]>([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem("favoriteCities") || "[]"
    );
    setFavoriteCities(savedFavorites);
  }, []);

  const toggleFavorite = (cityName: string) => {
    let updatedFavorites = [];
    if (favoriteCities.includes(cityName)) {
      updatedFavorites = favoriteCities.filter((city) => city !== cityName);
    } else {
      updatedFavorites = [...favoriteCities, cityName];
    }
    setFavoriteCities(updatedFavorites);
    localStorage.setItem("favoriteCities", JSON.stringify(updatedFavorites));
  };

  return (
    <CityContext.Provider
      value={{
        cities,
        favoriteCities,
        toggleFavorite,
        setCities,
      }}
    >
      {children}
    </CityContext.Provider>
  );
};

export const AppState = () => {
  return useContext(CityContext);
};
