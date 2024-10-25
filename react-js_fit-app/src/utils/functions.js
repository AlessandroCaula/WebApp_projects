import { EXERCISES, SCHEMES, WORKOUTS } from "./swoldier";

const exercises = exercisesFlattener(EXERCISES);

// Creating a function for generating the workout.
// !!! The export keyword is very important, in order to access this function from the other components. 
// !!! This function is going to take everything that the user has decided from the home screen, the Generator component, and is going to create a workout. 
export function generateWorkout(args) {
    // Destructuring out all the arguments that are passed to this function. These arguments are the useState variables used in the Generator to define the workout.
    const { poison: workout, goal, muscles } = args;
    // Retrieve all the exercises as the EXERCISES keys. exer will be an array that contains the keys for the different exercises.
    let exer = Object.keys(exercises);
    // Filter out and retrieve only the keys from the exer array where the corresponding 'environment' property in the exercises object is NOT "home".
    //.meta.environment: This accesses the meta property of the exercises[key] object and specifically checks the environment property.
    exer = exer.filter((key) => exercises[key].meta.environment !== "home");
    let includeTracker = [];
    let numSets = 5;
    let listOfMuscles;

    // Retrieve the list of muscles. If the workout is the "individual" one, means that the muscles have been singularely picked. otherwise we access the collection of muscles that are in the WORKOUT object with the "workout" and "muscles" keys.
    if (workout === "individual") {
        listOfMuscles = muscles;
    } else {
        listOfMuscles = WORKOUTS[workout][muscles[0]];
    }

    // Randomly rearrange the elements in the listOfMuscle arrays and store the unique muscle groups in a set, ensuring that each muscle group is included only once and in a random order.
    listOfMuscles = new Set(shuffleArray(listOfMuscles));
    // Converting the set to an Array.
    let arrOfMuscles = Array.from(listOfMuscles);
    let scheme = goal;

    //// Generate a structured array of sets, with each set being categorized as either "compound" or "accessory" amd associated with specific muscle groups based on the provided scheme. This will allow for a flexible and varies workout plan tailored to the user's goals.
    // Accessing the ratio property of the specified scheme in the SCHEME object, which is expected bo be an array of numbers.
    let sets = SCHEMES[scheme].ratio
        // The final result of this reduce is a flat array where the number of "compound" or "accessory" strings correspond to the values in ratio. 
        // The .reduce function iterates over the ratio array. acc => the accumulator array that accumulates the results. curr => the current value from the ratio array. index => the index of the current value. 
        .reduce((acc, curr, index) => {
            // Make this compound and exercise muscle -> array of objects and destructure in loop
            // Inner array creation: for each curr value. parseInt(curr) => converts curr to an integer. Array(parseInt(curr)).keys() => creates an array with a length equal to the integer value of curr and generates keys (0 to curr-1). 
            // map(...) => maps over these keys, creating either "compound" or "accessory" strings based on whether the current index is 0 (the first set type will be "compound", and others will be "accessory")
            return [
                ...acc,
                ...[...Array(parseInt(curr)).keys()].map((val) =>
                    index === 0 ? "compund" : "accessory"
                ),
            ];
        }, [])
        // The final result of this reduce is an array of objects where each object represents a set with a type and a corresponding muscle group.
        // This reduce iterates over the results of the first reduce (the array of "compounds" and "accesory" strings). acc => is the accumulator array. curr => is the current string ("compounds" or "accesory"). index => is its index.
        .reduce((acc, curr, index) => {
            // muscleGroupToUse checks if the current index is less than the length of arrOfMuscles. If true, it uses the corresponding muscle group from arrOfMuscles. If false, it uses the modulo operation to wrap around and cycle through the arrOfMuscles array.
            const muscleGroupToUse =
                index < arrOfMuscles.length
                    ? arrOfMuscles[index]
                    : arrOfMuscles[index % arrOfMuscles.length];
            // For each curr, it returns an object with: setType => either "compound" or "accessory" from previous array. muscleGroup => the determined muscle group to use. 
            return [
                ...acc,
                {
                    setType: curr,
                    muscleGroup: muscleGroupToUse,
                },
            ];
        }, []);

    // Let's now process the array of exercises to categorize them into "compound" and "accessory" exercises based on whether they target specified muscle groups.
    // The code effectively filters and categorizes exercises based on the user's specified muscles, allowing the workout generator to focus only on relevant exercises for a given workout scheme. The final result is two categorized collections of exercises that can be used later in the workout generation process.
    // Destructures the result of the reduce function, creating two variables: compoundExercises and accessoryExercises. These will hold exercises that are classified as "compound" and "accessory", respectively.
    const { compound: compoundExercises, accessory: accessoryExercises } = 
        // exer => is an array containing keys (exercise identifiers) derived from the exercises object. The reduce method processes this array to build an object that categorizes the exercises.
        exer.reduce(
            // the callback function for reduce, where: acc => The accumulator object that accumulates the results. It starts as {compoind: {}, accessory: {}}. curr => The current exercise key being processed from the exer array.
            (acc, curr) => {
                // A boolean variable, exerciseHasRequiredMuscle, is initialized to false.
                // The for loop iterates over the muscles associated with the current exercise (exercises[curr].muscles).
                // If any of the muscles are found in the listOfMuscles (which is a Set of muscles defined earlier), exerciseHasRequiredMuscle is set to true.
                let exerciseHasRequiredMuscles = false;
                for (const musc of exercises[curr].muscles) {
                    if (listOfMuscles.has(musc)) {
                        exerciseHasRequiredMuscles = true;
                    }
                }
                // If exerciseHasRequiredMuscle is true, it returns a new object that includes: A spread of the current acc (to keep previously accumulated exercises). A new property based on the exercise type (exercises[curr].type), which is either "compound" or "accessory".
                // Inside this property, it also spreads the current exercises of that type and adds the current exercise (curr) with its details from the exercises object.
                return exerciseHasRequiredMuscles
                    ? {
                        
                    }
            }
        )
}