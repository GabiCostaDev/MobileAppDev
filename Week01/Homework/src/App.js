import Recipe from './components/RecipeCard'

export default function App() {
  const RECIPE = {
    title: 'Omelette',
    imgSrc: require('../../assets/omelette.jpg'),
    description:
      'Scrumpdillyumptious egg dish!',
    ingredients: [
      '2 eggs',
      '2 tablespoons of milk',
      '1 heaped teaspoon of butter',
      'Salt and pepper to taste',
    ],
    instructions: [
      'In a bowl, lightly beat the eggs with water or milk, and add a pinch of salt and pepper.',
      'Melt the butter or heat the oil in a non-stick skillet over medium heat.',
      'Pour the beaten eggs into the pan. Let them sit for a few seconds, then gently stir with a spatula. Lift the edges to allow the uncooked eggs to flow underneath.',
      'When the eggs are mostly set but still slightly runny on top, add your desired fillings.',
      'Fold the omelette in half and slide it onto a plate. Serve immediately.',
    ],
  };
  return <Recipe recipe={recipe} />;
}
