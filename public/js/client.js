document.addEventListener('DOMContentLoaded', function() {
    loadUsers(); // Carga y muestra los usuarios al cargar la página

    document.getElementById('createUserForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const userName = document.getElementById('createUserName').value;
        const userEmail = document.getElementById('createUserEmail').value;

        fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: userName, email: userEmail }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Usuario creado:', data);
            loadUsers(); // Recarga la lista de usuarios después de la creación
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});

function loadUsers() {
    fetch('/users')
    .then(response => response.json())
    .then(users => {
        const usersList = document.getElementById('usersList');
        usersList.innerHTML = ''; // Limpia la lista actual
        users.forEach(user => {
            const userItem = document.createElement('div');
            userItem.textContent = `Nombre: ${user.name}, Email: ${user.email}`;
            usersList.appendChild(userItem);
        });
    })
    .catch(error => console.error('Error al cargar usuarios:', error));
}
