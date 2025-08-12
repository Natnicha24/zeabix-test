import { GitHubBanner, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import StarIcon from "@mui/icons-material/Star";
import DashboardPage from "./pages/main/DashboardPage";
import LogoutIcon from "@mui/icons-material/Logout";

import {
  ErrorComponent,
  RefineSnackbarProvider,
  // ThemedLayoutV2,
  useNotificationProvider,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import RevenuePage from "./pages/main/RevenuePage";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import { Menu } from "@mui/material";
import CarRentalIcon from "@mui/icons-material/CarRental";
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";
import { ThemedLayoutV2 } from "./components/layout";
import Title from "./components/layout/title";
import CarPage from "./pages/main/CarPage";
import DriverPage from "./pages/main/DriverPage";

function App() {
  // const isLoggedIn = !!localStorage.getItem("token");

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                resources={[
                  {
                    name: "dashboard",
                    icon: <StarIcon />,
                    list: "/main",
                  },
                  {
                    name: "revenue",
                    icon: <LocalAtmIcon />,
                    list: "/main/revenues",
                  },
                  {
                    name: "car",
                    icon: <CarRentalIcon />,
                    list: "/main/cars",
                  },
                  {
                    name: "driver",
                    icon: <AirlineSeatReclineExtraIcon />,
                    list: "/main/drivers",
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "lLHSjs-myLC8F-XYCh6z",
                }}
              >
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />

                  <Route
                    element={
                      <ThemedLayoutV2
                        Header={Header}
                        Title={({ collapsed }) => (
                          <Title collapsed={collapsed} />
                        )}
                      >
                        <Outlet />
                      </ThemedLayoutV2>
                    }
                  >
                    <Route index element={<Navigate to="/login" replace />} />
                    <Route path="/main">
                      <Route index element={<DashboardPage />} />
                      <Route path="/main/revenues" element={<RevenuePage />} />
                      <Route path="/main/cars" element={<CarPage />} />
                      <Route path="/main/drivers" element={<DriverPage />} />
                    </Route>
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
            </DevtoolsProvider>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
