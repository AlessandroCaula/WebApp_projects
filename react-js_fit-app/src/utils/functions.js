import { EXERCISES, SCHEMES, TEMPOS, WORKOUTS } from "./swoldier";

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
    
    // !!! The .reduce() method is used to accumulate a single output value from an array by processing each element in sequence. It takes two main arguments:
    // - Accumulator function: A function that defines how to combine each element with the accumulated result.
    // - Initial value (optional): The starting value of the accumulator. If not providede, the first element of the array is used as the initial value, and the process starts from the second element.

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
    // At the end of this reduce call: the acc object will contain two properties: - compound: An object of exercises classified as compound  based on whether they contain the required muscles. - accessory: An object of exercises classified as accessory based on the same criteria.
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
                        // A spread of the current acc (to keep previously accumulated exercises).
                        ...acc,
                        // A new property based on the exercise type (exercise[curr].type), which is either "compound" or "accessory"
                        [exercises[curr].type]: {
                            // Inside this property, it also spreads the current exercise of that type and adds the current exercise (curr) with its details from the exercises object.
                            ...acc[exercises[curr].type],
                            [curr]: exercises[curr],
                        },
                    }
                    // If exerciseHasREquiredMuscle is false, it simply returns the existing acc. 
                    : acc;
            },
            { compound: {}, accessory: {} }
        );
    
    // We are gonna generate a workout (stored in genWOD) by iterating over each item in sets, where each item specifies a setType (either "compound" or "accessory") and a muscleGroup (the target muscle group for that set).
    // sets.map(({ setType, muscleGroup }) => {...})
    // This uses the map function to iterate over each item in sets. Each set object has two properties. 
    // - setType: indicates whether the set should use "compound" or "accessory" exercises.
    // - muscleGroup: the specific muscle group targeted in this set.
    const genWOD = sets.map(({ setType, muscleGroup }) => {
        const data = 
            // Based on setType, this line selects the appropriate group of exercises. If setType is "compound", it assigns compoundExercises to data. If setType is "accessory", it assigns accessoryExercises.
            // This ensures that each set draws exercises from the correct category.
            setType === "compound" ? compoundExercises : accessoryExercises;
        // filteredObj is created by reducing data (the selected group of exercises) to include only those exercises that: - Are not already in includedTracker (a list of exercises that have already been used, which prevents duplication). Do include the specified muscleGroup in their muscles array.
        // After the reduction, filteredObj contains only those exercises from data that target the specific muscleGroup and haven't already been used in this workout (includedTracker).
        const filteredObj = Object.keys(data).reduce((acc, curr) =>{
            if (
                // includedTracker.includes(curr): Checks if the current exercise (curr) has already been used. If true, it skips adding this exercise to filteredObj.
                includeTracker.includes(curr) || 
                // !data[curr].muscles.includes(muscleGroup): Checks if the exercise doesn’t include the required muscleGroup. If the exercise doesn't target the specified muscle group, it is also skipped.
                !data[curr].muscles.includes(muscleGroup)
            ) {
                return acc;
            }
            // If neither condition is met, it adds the current exercise (curr) to filteredObj.
            return {acc, [curr]: exercises[curr] };
        }, {});
        // Create filteredDataList, an array of keys (exercise names) from filteredObj
        // filteredObj contains only exercises from the currently selected setType (either compound or accessory) that match the targeted muscle group and haven't been used in this workout yet.
        // This list serves as the primary pool of exercises to choose from for the current set. 
        const filteredDataList = Object.keys(filteredObj);
        // Create a secondary backup pool of exercises. Take exercises from the opposite set type (accessoryExercises if setType is "compound", or compoundExercises if setType is "accessory").
        // This backup list is useful if filteredDataList doesn't have a suitable exercise, allowing the function to pick an alternative from the other set type.
        const filteredOppList = Object.keys(
            setType === "compound" ? accessoryExercises : compoundExercises
        // Filter out any exercises that have already been used in the workout (sotred in includedTracker), ensuring they aren't duplicated.
        ).filter((val) => !includeTracker.includes(val));

        // Randomly select an exercise from filteredDataList (the primary pool) or, if that list is empty, falls back to selecting one from filteredOppList (the backup pool). 
        let randomExercise =
            // Pick a random item from filteredDataList using Math.floor(Math.random() * filteredDataList.length).
            filteredDataList [
                Math.floor(Math.random() * filteredDataList.length)
            ] || 
            // Doing the same thing as above, but with filteredOppList, ensuring an exercise is still chosen if filteredDataList is empty.
            filteredOppList[
                Math.floor(Math.random() * filteredOppList.length)
            ];
        
        if (!randomExercise) {
            return {};
        }

        // Assign repsOrDuraction a value based on whether the selected randomExercise should be measured in repetitions (reps) or duration (e.g. seconds).
        let repsOrDuraction = 
            // Checks if the exercise uses repetitions (reps). If it does, it executes the true case; otherwise, it defaults to the false case, which sets a duration.
            // If unit === "reps" (repetitions) calculates a random rep count within the range defined by SCHEMES[scheme].repRanges
            exercises[randomExercise].unit === "reps"
                // Math.min(...SCHEMES[scheme].repRanges) gets the minimum rep value.
                ? Math.min(...SCHEMES[scheme].repRanges) +
                Math.floor(
                    Math.random() * 
                    // Math.max(...SCHEMES[scheme].repRanges) gets the maximum rep value
                    (Math.max(...SCHEMES[scheme].repRanges) - 
                        Math.min(...SCHEMES[scheme].repRanges))
                ) + 
                // Adds 4 additional reps if the exercise type is accessory, while compound exercises receive the base random rep count.
                (setType === "accessory" ? 4 : 0)
                // If unit !== "reps" (Duration):
                : Math.floor(Math.random() * 40) + 20;
        const tempo = TEMPOS[Math.floor(Math.random() * TEMPOS.length)];

        // ADjust the repsOrDuration based on whether the exercise is measure in repetitions or duration, while ensuring the workout's intensity stays within certain bounds.
        // If the exercise is based on repetitions (reps), it calculates and potentially limits the rep count based on the tempo to avoid excessive exercise duration.
        if (exercises[randomExercise].unit === "reps") {
            const tempoSum = tempo
                // Splits the tempo string (e.g. "2 0 2") into an array of numbers representing different parts of the tempo. 
                .split(" ")
                // Sums the numbers, giving the total time per repetition in seconds.
                .reduce((acc, curr) => acc + parseInt(curr), 0);
                // Checks if the total workout time for the exercise (based on tempo and reps) exceeds 85 seconds.
            if (tempoSum * parseInt(repsOrDuraction) > 85) {
                repsOrDuraction = Math.floor(85 / tempoSum);
            }
        } else {
            // If the exercise is measure by duration (not reps): Adjusts repsOrDuraction to the nearest 5-second increment for a cleaner timing value.
            // Set to nearest 5 seconds.
            repsOrDuraction = Math.ceil(parseInt(repsOrDuraction) / 5) * 5;
        }
        // Adds randomExercise to includeTracker, keeping track of selected exercises to avoid repetitions. 
        includeTracker.push(randomExercise);

        // Creates an object for a workout set with key details about the selected exercise. 
        return {
            // The name of the randomly selected exercise (randomExercise).
            name: randomExercise,
            // The tempo chose for this exercise, likely a cadence or pace at which to perform the movement (e.g. a specific count for each phase of the exercise).
            tempo,
            // The rest time for the set. the SCHEMES[scheme]["rest"] array is accessed based on whether the set type is "compound" or "accessory". 
            // If it's a "compound" set, it takes the first element [0]; otherwise it takes the second element [1].
            rest: SCHEMES[scheme]["rest"][setType === "compound" ? 0 : 1],
            // The calculated number of repetitions or duration for the exercise (repsOrDuraction), based on the exercise type and scheme.
            reps: repsOrDuraction,
            // All additional properties of the selected exercise (randomExercise) are spread into this object. This might include information like muscle groups targeted, descriptions, or other metadat specific to the exercise 
            ...exercises[randomExercise],
        };
    });

    // Filter out any empty objects from genWOD, which is the array of workout sets generated earlier. 
    return genWOD.filter(
        (element) => Object.keys(element).lenght > 0
    );
}

// Define the function that takes an array and shuffles its elements in a random order. It's based on the Fisher-Yates shuffle algorithm, which ensures a fair distribution of elements.
function shuffleArray(array) {
    for (let i = array.lenght - 1; i > 0; i++) {
        let j = Math.floor(Math.random() * (i + 1))
        let temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    return array
} 

// Function that takes a complex object of exercises and creates a flattened version, restructuring it so that each exercise variant is treated as a separte entry.
function exercisesFlattener(exerciseObj) {
    const flattenedObj = {}

    for (const [key, val] of Object.entries(exerciseObj)) {
        if (!("variants" in val)) {
            flattenedObj[key] = val
        } else {
            for (const variant in val.variants) {
                let variantName = variant + "_" + key;
                let variantSubstitutes = Object.keys(val.variants).map((element) => {
                    return element + ' ' + key
                }).filter(element => element.replaceAll(' ', '_') !== variantName)

                flattenedObj[variantName] = {
                    ...val, 
                    description: val.description + '__' + val.variants[variant],
                    substitutes : [
                        ...val.substitutes, variantSubstitutes
                    ].slice(0, 5)
                }
            }
        }
    }
    return flattenedObj
}


////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

// import { EXERCISES, SCHEMES, TEMPOS, WORKOUTS } from "./swoldier"
// const exercises = exercisesFlattener(EXERCISES)

// export function generateWorkout(args) {
//     const { muscles, poison: workout, goal } = args
//     let exer = Object.keys(exercises);
//     exer = exer.filter((key) => exercises[key].meta.environment !== "home");
//     let includedTracker = [];
//     let numSets = 5;
//     let listOfMuscles;

//     if (workout === "individual") {
//         listOfMuscles = muscles;
//     } else {
//         listOfMuscles = WORKOUTS[workout][muscles[0]];
//     }

//     listOfMuscles = new Set(shuffleArray(listOfMuscles));
//     let arrOfMuscles = Array.from(listOfMuscles);
//     let scheme = goal
//     let sets = SCHEMES[scheme].ratio
//         .reduce((acc, curr, index) => {
//             //make this compound and exercise muscle -> array of objects and destructure in loop
//             return [
//                 ...acc,
//                 ...[...Array(parseInt(curr)).keys()].map((val) =>
//                     index === 0 ? "compound" : "accessory"
//                 ),
//             ];
//         }, [])
//         .reduce((acc, curr, index) => {
//             const muscleGroupToUse =
//                 index < arrOfMuscles.length
//                     ? arrOfMuscles[index]
//                     : arrOfMuscles[index % arrOfMuscles.length];
//             return [
//                 ...acc,
//                 {
//                     setType: curr,
//                     muscleGroup: muscleGroupToUse,
//                 },
//             ];
//         }, []);

//     const { compound: compoundExercises, accessory: accessoryExercises } =
//         exer.reduce(
//             (acc, curr) => {
//                 let exerciseHasRequiredMuscle = false;
//                 for (const musc of exercises[curr].muscles) {
//                     if (listOfMuscles.has(musc)) {
//                         exerciseHasRequiredMuscle = true;
//                     }
//                 }
//                 return exerciseHasRequiredMuscle
//                     ? {
//                         ...acc,
//                         [exercises[curr].type]: {
//                             ...acc[exercises[curr].type],
//                             [curr]: exercises[curr],
//                         },
//                     }
//                     : acc;
//             },
//             { compound: {}, accessory: {} }
//         );

//     const genWOD = sets.map(({ setType, muscleGroup }) => {
//         const data =
//             setType === "compound" ? compoundExercises : accessoryExercises;
//         const filteredObj = Object.keys(data).reduce((acc, curr) => {
//             if (
//                 includedTracker.includes(curr) ||
//                 !data[curr].muscles.includes(muscleGroup)
//             ) {
//                 // if (includedTracker.includes(curr)) { console.log('banana', curr) }
//                 return acc;
//             }
//             return { ...acc, [curr]: exercises[curr] };
//         }, {});
//         const filteredDataList = Object.keys(filteredObj);
//         const filteredOppList = Object.keys(
//             setType === "compound" ? accessoryExercises : compoundExercises
//         ).filter((val) => !includedTracker.includes(val));

//         let randomExercise =
//             filteredDataList[
//             Math.floor(Math.random() * filteredDataList.length)
//             ] ||
//             filteredOppList[
//             Math.floor(Math.random() * filteredOppList.length)
//             ];

//         // console.log(randomExercise)

//         if (!randomExercise) {
//             return {};
//         }

//         let repsOrDuraction =
//             exercises[randomExercise].unit === "reps"
//                 ? Math.min(...SCHEMES[scheme].repRanges) +
//                 Math.floor(
//                     Math.random() *
//                     (Math.max(...SCHEMES[scheme].repRanges) -
//                         Math.min(...SCHEMES[scheme].repRanges))
//                 ) +
//                 (setType === "accessory" ? 4 : 0)
//                 : Math.floor(Math.random() * 40) + 20;
//         const tempo = TEMPOS[Math.floor(Math.random() * TEMPOS.length)];

//         if (exercises[randomExercise].unit === "reps") {
//             const tempoSum = tempo
//                 .split(" ")
//                 .reduce((acc, curr) => acc + parseInt(curr), 0);
//             if (tempoSum * parseInt(repsOrDuraction) > 85) {
//                 repsOrDuraction = Math.floor(85 / tempoSum);
//             }
//         } else {
//             //set to nearest 5 seconds
//             repsOrDuraction = Math.ceil(parseInt(repsOrDuraction) / 5) * 5;
//         }
//         includedTracker.push(randomExercise);

//         return {
//             name: randomExercise,
//             tempo,
//             rest: SCHEMES[scheme]["rest"][setType === "compound" ? 0 : 1],
//             reps: repsOrDuraction,
//             ...exercises[randomExercise],
//         };
//     });

//     return genWOD.filter(
//         (element) => Object.keys(element).length > 0
//     );
// }

// function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         let j = Math.floor(Math.random() * (i + 1))
//         let temp = array[i]
//         array[i] = array[j]
//         array[j] = temp
//     }
//     return array
// }

// function exercisesFlattener(exercisesObj) {
//     const flattenedObj = {}

//     for (const [key, val] of Object.entries(exercisesObj)) {
//         if (!("variants" in val)) {
//             flattenedObj[key] = val
//         } else {
//             for (const variant in val.variants) {
//                 let variantName = variant + "_" + key
//                 let variantSubstitutes = Object.keys(val.variants).map((element) => {
//                     return element + ' ' + key
//                 }).filter(element => element.replaceAll(' ', '_') !== variantName)

//                 flattenedObj[variantName] = {
//                     ...val,
//                     description: val.description + '___' + val.variants[variant],
//                     substitutes: [
//                         ...val.substitutes, variantSubstitutes
//                     ].slice(0, 5)
//                 }
//             }
//         }
//     }
//     return flattenedObj
// }