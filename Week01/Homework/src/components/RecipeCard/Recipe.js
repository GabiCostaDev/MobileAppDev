import Ingredients from './Ingredients.js'
import Instructions from './Instructions.js'
import RecipeImg from '../../assets/omelette.jpg'

export default function Recipe(props) {
  const { recipe } = props;
  return (
    <>
      <RecipeImg img src={RecipeImg} alt="Omelette" width={500}/>
      <h1>Recipe for {RECIPE.title}</h1>
      <h2>{RECIPE.description}</h2>
      <Ingredients ingredients={RECIPE.ingredients} />
      <Instructions instructions={RECIPE.instructions} />
    </>
  );
}
