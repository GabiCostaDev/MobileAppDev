
export default function Ingredients(props) {
  const { ingredients } = props;
  return (
    <>
      <h3>Ingredients</h3>
      {ingredients.map((i) => (
        <p>{i}</p>
      ))}
    </>
  );
}
