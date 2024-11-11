import { API_BASE_URL } from "../constants/constants";

// Function to get budget from the backend. Method: GET
export const fetchBudget = async (): Promise<number> => {
	const response = await fetch(`${API_BASE_URL}/budget`, {
    	method: "GET",
	});
	if (!response.ok) {
    	throw new Error("Failed to get budget");
	}

    const jsonResponse = await response.json();

	console.log("response in budget", jsonResponse.data);

	return jsonResponse.data;
 
};

// Function to update the budget in the backend. Method: PUT
export const updateBudget = async (budget: number): Promise<number> => {
	console.log("change budget", budget);
	const response = await fetch(`${API_BASE_URL}/budget`, {
    	method: "PUT",
		headers: {
            "Content-Type": "application/json",
        },
		body: JSON.stringify({budget}),
	});
	if (!response.ok) {
    	throw new Error("Failed to change budget");
	}

	

	return response.json();

};


