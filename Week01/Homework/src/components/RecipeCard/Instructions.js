export default function Instructions(props) {
  const { instructions } = props;
  return (
    <>
      <h3>Instructions</h3>
      {instructions.map((i) => (
        <p>{i}</p>
      ))}
    </>
  );
}