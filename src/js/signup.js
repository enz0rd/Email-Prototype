
document.getElementById("signup-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio do formulário padrão
    function verificarCamposPreenchidos(form) {
        var inputs = form.querySelectorAll('input');
        var passwordInput = form.querySelector('.password');
        var confirmPasswordInput = form.querySelector('.confirm-password');


        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].value.trim() === '') {
                return false; // Retorna falso se algum campo estiver vazio
            }
        }

        if (passwordInput.value !== confirmPasswordInput.value) {
            alert("The passwords must match!");
            return false; // Returns false if passwords don't match
        }

        return true; // Retorna verdadeiro se todos os campos estiverem preenchidos
    }

    var form = document.getElementById('signup-form');
    var camposPreenchidos = verificarCamposPreenchidos(form);

    if (camposPreenchidos) {
        var form = event.target;
        var name = form.querySelector('.name').value;
        var email = form.querySelector('.email').value;
        var password = form.querySelector('.password').value;
        var birth = form.querySelector('.birth').value;

        var data = {
            name: `${name}`,
            email: `${email}`,
            password: `${password}`,
            birth: `${birth}`
        };

        var xhr = new XMLHttpRequest();
        xhr.open("POST", form.action, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    // Verificar o tipo de resposta
                    var contentType = xhr.getResponseHeader("Content-Type");
                    if (contentType && contentType.includes("application/json")) {
                        // A resposta é JSON válido
                        var jsonResponse = JSON.parse(xhr.responseText);
                        if (jsonResponse.message) {
                            // Exibir mensagem de erro
                            alert(jsonResponse.message);
                        }
                    } else {
                        window.location.href = '/home';
                        // A resposta não é um JSON válido, exibir mensagem genérica
                    }
                } else {
                    // Exibir mensagem de erro genérica
                    alert('An error occurred.');
                }
            }
        };
        xhr.send(JSON.stringify(data));
    } else {
        alert("Fill in all fields!");
    }
});