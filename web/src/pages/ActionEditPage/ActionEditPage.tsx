import { Link, routes } from "@redwoodjs/router";
import { MetaTags } from "@redwoodjs/web";

const ActionEditPage = () => {
  return (
    <>
      <MetaTags title="ActionEdit" description="ActionEdit page" />

      <h1>ActionEditPage</h1>
      <p>
        Find me in{" "}
        <code>./web/src/pages/ActionEditPage/ActionEditPage.tsx</code>
      </p>
      <p>
        My default route is named <code>actionEdit</code>, link to me with `
        <Link to={routes.actionEdit()}>ActionEdit</Link>`
      </p>
    </>
  );
};

export default ActionEditPage;
