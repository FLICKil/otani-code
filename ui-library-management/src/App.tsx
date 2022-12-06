import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { BookContextProvider } from "./context/BookContext";
import { CategoryContextProvider } from "./context/CategoryContext";
import { AdminContextProvider } from "./context/AdminContext";
import { UserContextProvider } from "./context/UserContext";
import { AuthorContextProvider } from "./context/AuthorContext";
import { PublisherContextProvider } from "./context/PublisherContext";
import { RentContextProvider } from "./context/RentContext";
import { SettingContextProvider } from "./context/SettingContext";

function App() {
  const [count, setCount] = useState(0);

  let timer: number;
  const runTimer = () => {
    timer = window.setTimeout(() => {
      localStorage.clear();
    }, 900000);
  };
  document.body.onclick = () => {
    clearTimeout(timer);
    runTimer();
  };

  return (
    <AdminContextProvider>
      <UserContextProvider>
        <SettingContextProvider>
          <BookContextProvider>
            <AuthorContextProvider>
              <CategoryContextProvider>
                <PublisherContextProvider>
                  <RentContextProvider>
                    <BrowserRouter>
                      <div className="App">
                        <Layout />
                      </div>
                    </BrowserRouter>
                  </RentContextProvider>
                </PublisherContextProvider>
              </CategoryContextProvider>
            </AuthorContextProvider>
          </BookContextProvider>
        </SettingContextProvider>
      </UserContextProvider>
    </AdminContextProvider>
  );
}

export default App;
