import { Client, Databases, ID, Query } from "appwrite";

// Within here we are gonna do the setup for all the appwrite database.
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

// Get access to the appwrite functionalities, by defining a new appwrite client.
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Here we are pointing to the appwrite server for the request.
  .setProject(PROJECT_ID);

// Once we have the client (above). We have to define which functionality we want to use from appwrite.
const database = new Databases(client);

// Function that will update the search count. The function will take in two parameters. The searchTerm that the user has searched for. And the movie associated to that searchTerm.
export const updateSearchCount = async (searchTerm, movie) => {
  // 1. Use appwrite SDK (API) to check if the search term already exists in the database.
  try {
    // Matching what we have in the database with what the user has searched.
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", searchTerm),
    ]);

    if (result.documents.length > 0) {
      // 2. If it does, update the count.
      const doc = result.documents[0];
      // Update the count
      await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        count: doc.count + 1,
      });
    } else {
      // 3. If it doesn't, create a new document with the the search term and count as 1.
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm,
        count: 1,
        movie_id: movie.id,
        poster_url: `http://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
