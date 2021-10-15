import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { IpcChannel } from "../../../../common/IpcChannel";
import { PageRoute } from "../../../../common/PageRoute";
import Animator from "../../../pages/Animator/Animator";
import Launcher from "../../../pages/Launcher/Launcher";

const App = (): JSX.Element => {
  library.add(fab);
  library.add(fas);

  // Tell the main process when the app changes page
  const location = useLocation();
  useEffect(() => {
    window.preload.ipc[IpcChannel.APP_WINDOW_CHANGE_PAGE](location.pathname);
  }, [location]);

  return (
    <Switch>
      <Route exact path={PageRoute.LAUNCHER} component={Launcher} />
      <Route exact path={PageRoute.ANIMATOR} component={Animator} />
    </Switch>
  );
};

export default App;
