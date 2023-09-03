import { Link, routes } from "@redwoodjs/router";
import { MetaTags } from "@redwoodjs/web";

const ActionCreatePage = () => {
  return (
    <>
      <MetaTags title="ActionCreate" description="ActionCreate page" />

      <h1>ActionCreatePage</h1>
      <p>
        Find me in{" "}
        <code>./web/src/pages/ActionCreatePage/ActionCreatePage.tsx</code>
      </p>
      <p>
        My default route is named <code>actionCreate</code>, link to me with `
        <Link to={routes.actionCreate()}>ActionCreate</Link>`
      </p>
    </>
  );
};

export default ActionCreatePage;
