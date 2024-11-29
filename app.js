document.addEventListener("DOMContentLoaded", () => {
    const userTableBody = document.getElementById("userTableBody");
    const errorMessage = document.getElementById("errorMessage"); // Optional: a div to display error messages

    const fetchUsers = async () => {
        try {
            const response = await fetch("/api/users");
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const users = await response.json();
            userTableBody.innerHTML = "";
            users.forEach(user => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>
                        <button onclick="deleteUser(${user.id})">Delete</button>
                    </td>
                `;
                userTableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error fetching users:', error);
            if (errorMessage) {
                errorMessage.innerText = 'Failed to load users. Please try again later.';
            }
        }
    };

    const deleteUser = async (id) => {
        try {
            const response = await fetch(`/api/users/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
            fetchUsers(); // Refresh the user list after deleting
        } catch (error) {
            console.error('Error deleting user:', error);
            if (errorMessage) {
                errorMessage.innerText = 'Failed to delete user. Please try again later.';
            }
        }
    };

    fetchUsers();
});
