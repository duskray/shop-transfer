// const AsyncHome = asyncComponent(() => import("./App"))

import React, { lazy, Suspense } from "react"
import { Route, Switch } from "react-router-dom"
// import asyncComponent from "./components/Route/AsyncComponent"
// import AppliedRoute from "./components/Route/AppliedRoute"
// import AuthenticatedRoute from "./components/Route/AuthenticatedRoute"
// import UnauthenticatedRoute from "./components/Route/UnauthenticatedRoute"

// const App = React.lazy(() => import("./App"))
const Home = lazy(() => import("./routes/Home"))
const Find = lazy(() => import("./routes/Find"))
const Transfer = lazy(() => import("./routes/Transfer"))
const Success = lazy(() => import("./routes/Success"))
const List = lazy(() => import("./routes/List"))
const Detail = lazy(() => import("./routes/Detail"))

class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }
  render() {
    return this.props.children;
  }
}



export default ({ childProps }) =>
  <Suspense fallback={<div></div>}>
    <Switch>
      <ScrollToTop>
        <Route exact path="/" component={Home} />
        <Route path="/find" component={Find} />
        <Route path="/transfer" component={Transfer} />
        <Route path="/success" component={Success} />
        <Route path="/list" component={List} />
        <Route path="/detail/:id" component={Detail} />
      </ScrollToTop>
    </Switch>
  </Suspense>
