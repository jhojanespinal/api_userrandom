let currentPage = 3;
const usersPerPage = 6;

async function getRandomUserData() {
	try {
		const response = await fetch('https://randomuser.me/api/');
		const data = await response.json();
		return data.results[0];
	} catch (error) {
		console.error('Error fetching random user data:', error);
		throw error;
	}
}

async function displayUsers(startIndex, endIndex) {
	const userContainer = document.getElementById('user-container');

	try {
		// Limpiar el contenedor antes de agregar nuevos usuarios
		userContainer.innerHTML = '';

		for (let i = startIndex; i < endIndex; i++) {
			const userData = await getRandomUserData();

			const userCard = document.createElement('div');
			userCard.classList.add('user-card');

			const userImage = document.createElement('img');
			userImage.classList.add('user-image');
			userImage.src = userData.picture.large;
			userImage.alt = 'User Image';

			const userName = document.createElement('p');
			userName.textContent = `${userData.name.first} ${userData.name.last}`;

			const userEmail = document.createElement('p');
			userEmail.textContent = userData.email;

			userCard.appendChild(userImage);
			userCard.appendChild(userName);
			userCard.appendChild(userEmail);

			userContainer.appendChild(userCard);
		}
	} catch (error) {
		// Manejar el error, si es necesario
	}
}

function updatePaginationButtons() {
	const pagination = document.getElementById('pagination');
	const previousButton = pagination.querySelector('.btnA');
	const nextButton = pagination.querySelector('.btnS');

	previousButton.disabled = currentPage === 1;
	nextButton.disabled = currentPage * usersPerPage >= 10; // Cambiar este valor según el número total de usuarios
}

function previousPage() {
	if (currentPage > 1) {
		currentPage--;
		displayUsers((currentPage - 3) * usersPerPage, currentPage * usersPerPage);
		updatePaginationButtons();
	}
}

function nextPage() {
	if (currentPage * usersPerPage < 40) { // Cambiar este valor según el número total de usuarios
		currentPage++;
		displayUsers((currentPage - 3) * usersPerPage, currentPage * usersPerPage);
		updatePaginationButtons();
	}
}

// Llamar a la función al cargar la página para mostrar la primera página de usuarios
displayUsers(0, usersPerPage);
updatePaginationButtons();

function updatePaginationButtons() {
	const pagination = document.getElementById('pagination');
	const previousButton = pagination.querySelector('button:first-child');
	const nextButton = pagination.querySelector('button:last-child');

	previousButton.disabled = currentPage === 1;
	nextButton.disabled = currentPage * usersPerPage >= 40; // Cambiar este valor según el número total de usuarios
}

function previousPage() {
	if (currentPage > 1) {
		currentPage--;
		displayUsers((currentPage - 2) * usersPerPage, currentPage * usersPerPage);
		updatePaginationButtons();
	}
}

function nextPage() {
	if (currentPage * usersPerPage < 40) { // Cambiar este valor según el número total de usuarios
		currentPage++;
		displayUsers((currentPage - 2) * usersPerPage, currentPage * usersPerPage);
		updatePaginationButtons();
	}
}

// Llamar a la función al cargar la página para mostrar la primera página de usuarios
displayUsers(0, usersPerPage);
updatePaginationButtons();
