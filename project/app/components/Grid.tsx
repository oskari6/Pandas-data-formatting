import Preview from "./Preview";

const Grid = ({ items }) => {
  let houses = [];
  for (var i = 0; i < 50; i++) {
    houses.push(items[i]);
  }
  return (
    <div className="flex flex-wrap">
      {houses.map((house) => {
        <Preview />;
      })}
    </div>
  );
};
