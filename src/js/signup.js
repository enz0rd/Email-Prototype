
document.getElementById("signup-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio do formulário padrão
    function verificarCamposPreenchidos(form) {
        var inputs = form.querySelectorAll('input');

        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].value.trim() === '') {
                return false; // Retorna falso se algum campo estiver vazio
            }
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
            if (xhr.readyState === 4 && xhr.status === 200) {
                // A solicitação foi bem-sucedida
                // var jsonResponse = JSON.parse(xhr.responseText)
                // if(jsonResponse.message != "" || jsonResponse.message != null) {
                //     alert(jsonResponse.message)
                // }
            }
        };
        xhr.send(JSON.stringify(data));
    } else {
        alert("Preencha todos os campos!");
    }
});