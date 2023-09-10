import { Link, routes } from "@redwoodjs/router";
import { MetaTags } from "@redwoodjs/web";
import GoalBigThreeCell from "src/components/GoalBigThreeCell";

const FocusAreaPage = () => {
  return (
    <>
      <MetaTags title="Focus Area" description="Focus Area page" />

      <GoalBigThreeCell />
    </>
  );
};

export default FocusAreaPage;
