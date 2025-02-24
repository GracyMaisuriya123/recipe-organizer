import { firestore } from './firebase-config.js';
import { 
    collection, addDoc, query, orderBy, onSnapshot, updateDoc, doc, deleteDoc, getDoc, getDocs 
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js"; 

const recipesCollection = collection(firestore, "recipes");

// Global variable to hold the current recipe ID being edited
let editingRecipeId = null;

// Function to add a recipe
document.getElementById("recipe-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("recipe-name").value;
    const ingredients = document.getElementById("ingredients").value;
    const mealType = document.getElementById("meal-type").value;

    if (name && ingredients && mealType) {
        if (editingRecipeId) {
            // If editing a recipe, update it
            const recipeRef = doc(firestore, "recipes", editingRecipeId);
            await updateDoc(recipeRef, {
                name,
                ingredients: ingredients.split(",").map(ing => ing.trim().toLowerCase()), 
                mealType: mealType.trim().toLowerCase(),
            });

            // Reset editingRecipeId
            editingRecipeId = null;
        } else {
            // Otherwise, add a new recipe
            await addDoc(recipesCollection, {
                name,
                ingredients: ingredients.split(",").map(ing => ing.trim().toLowerCase()), 
                mealType: mealType.trim().toLowerCase(),
                favorite: false,  // Ensure default is false
                timestamp: new Date()
            });
        }

        // Reset the form to its initial state
        document.getElementById("recipe-form").reset();
        document.getElementById("recipe-form").innerHTML = `
            <input type="text" id="recipe-name" placeholder="Recipe Name" required>
            <input type="text" id="ingredients" placeholder="Ingredients (comma separated)" required>
            <input type="text" id="meal-type" placeholder="Meal Type" required>
            <button type="submit">Add Recipe</button>
        `;
    }
});

// Query to fetch recipes ordered by timestamp
const q = query(recipesCollection, orderBy("timestamp", "desc"));

// Function to render recipes
function renderRecipes(snapshot) {
    const recipeList = document.getElementById("recipe-list");
    recipeList.innerHTML = "";
    snapshot.forEach(docSnap => {
        const recipe = docSnap.data();
        const li = document.createElement("li");

        li.innerHTML = `
            <strong>${recipe.name}</strong> - ${recipe.mealType}  
            <button class="favorite-btn" data-id="${docSnap.id}" style="color: ${recipe.favorite ? 'gold' : 'gray'};">⭐</button>
            <button class="edit-btn" data-id="${docSnap.id}">Edit</button>
            <button class="delete-btn" data-id="${docSnap.id}">Delete</button>
        `;

        recipeList.appendChild(li);
    });

    // Attach event listeners to favorite buttons
    document.querySelectorAll(".favorite-btn").forEach(button => {
        button.addEventListener("click", async (e) => {
            const recipeId = e.target.getAttribute("data-id");
            await toggleFavorite(recipeId, e.target);
        });
    });

    // Attach event listeners to edit buttons
    document.querySelectorAll(".edit-btn").forEach(button => {
        button.addEventListener("click", async (e) => {
            const recipeId = e.target.getAttribute("data-id");
            const recipeRef = doc(firestore, "recipes", recipeId);
            const recipeSnap = await getDoc(recipeRef);
            if (recipeSnap.exists()) {
                const recipeData = recipeSnap.data();
                
                // Populate the form with the existing recipe data
                document.getElementById("recipe-name").value = recipeData.name;
                document.getElementById("ingredients").value = recipeData.ingredients.join(", ");
                document.getElementById("meal-type").value = recipeData.mealType;
                
                // Set the global variable to the current recipe ID
                editingRecipeId = recipeId;
                
                // Update the form to show the "Update Recipe" button
                const form = document.getElementById("recipe-form");
                form.innerHTML = `
                    <input type="text" id="recipe-name" value="${recipeData.name}" required placeholder="Recipe Name">
                    <input type="text" id="ingredients" value="${recipeData.ingredients.join(", ")}" required placeholder="Ingredients (comma separated)">
                    <input type="text" id="meal-type" value="${recipeData.mealType}" required placeholder="Meal Type">
                    <button type="submit" id="update-recipe-btn">Update Recipe</button>
                `;
            }
        });
    });

    // Attach event listeners to delete buttons
    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", async (e) => {
            const recipeId = e.target.getAttribute("data-id");
            await deleteRecipe(recipeId);
        });
    });
}

// Function to toggle favorite status
async function toggleFavorite(recipeId, button) {
    const recipeRef = doc(firestore, "recipes", recipeId);
    const recipeSnap = await getDoc(recipeRef);

    if (recipeSnap.exists()) {
        const currentFavorite = recipeSnap.data().favorite || false;
        await updateDoc(recipeRef, { favorite: !currentFavorite });

        // Change button color instantly
        button.style.color = currentFavorite ? "gray" : "gold";
    }
}

// Function to delete a recipe
async function deleteRecipe(recipeId) {
    const recipeRef = doc(firestore, "recipes", recipeId);
    await deleteDoc(recipeRef);
}

// Listen for real-time updates
onSnapshot(q, renderRecipes);

// Function to filter recipes by ingredient or meal type
document.getElementById("search").addEventListener("input", async (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const querySnapshot = await getDocs(query(recipesCollection, orderBy("timestamp", "desc")));

    const filteredRecipes = querySnapshot.docs.filter(docSnap => {
        const recipe = docSnap.data();
        const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : [recipe.ingredients];

        return (
            ingredients.some(ing => ing.includes(searchTerm)) ||
            recipe.mealType.includes(searchTerm)
        );
    });

    renderRecipes({ forEach: (callback) => filteredRecipes.forEach(callback) });
});









