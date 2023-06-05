import React, { Suspense, FC } from "react";

// Komponentni import qilish
import Loader from "./Loader";

const Loadable =
  <P extends object>(Component: React.ComponentType<P>): FC<P> =>
  (props) => {
    return (
      <Suspense fallback={<Loader />}>
        <Component {...props} />
      </Suspense>
    );
  };

export default Loadable;
