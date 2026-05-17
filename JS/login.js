const HARDCODED_USERS = [
  { id: 1, nombre: "Administrador", correo:"contactoorigenescolombia@gmail.com", telefono: "3123456789",  indicativo: "+57",  contrasena: "111" }
];
/* funciones local storage */
const USUARIOS_KEY = "origenes_usuarios";
const USUARIOACTIVO_KEY ="origenes_usuario_activo"

function getUsuarios() {
  return JSON.parse(localStorage.getItem(USUARIOS_KEY)) || [];
}
function saveUsuario(usuario) {
  localStorage.setItem(USUARIOS_KEY, JSON.stringify(usuario));
}

function getUsuarioActivo() {
  return JSON.parse(localStorage.getItem(USUARIOACTIVO_KEY)) || [];
}
function saveUsuarioActivo(usuario) {
  localStorage.setItem(USUARIOACTIVO_KEY, JSON.stringify(usuario));
}

/* Registrar usuarios HARDCODED_USERS */
(function registrarHardcodeados() {
  const existentes = getUsuarios();
  const idsExistentes = existentes.map(p => p.id);
  const nuevos = HARDCODED_USERS.filter(p => !idsExistentes.includes(p.id));
  if (nuevos.length > 0) saveUsuario([...existentes, ...nuevos]);
})();

/* llamando objetos del html */
const form = document.getElementById("loginForm");
const emailInput = document.getElementById("emailInput");
const passInput = document.getElementById("passwordInput");

const errorCorreo = document.getElementById("errorCorreo");
const errorContrasena = document.getElementById("errorContrasena");
const errorFormulario= document.getElementById("errorFormulario");


form.addEventListener("submit", ingresar );

/* funciones validar formulario */
function setError (element, message) {
  element.textContent = message;
};

function clearError (element){
  element.textContent = "";
};

function validateEmail (){
  const emailValue = emailInput.value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailValue) {
    setError(errorCorreo, "Por favor ingresa un correo");
    return false;
  }

  if (!emailRegex.test(emailValue)) {
    setError(errorCorreo, "Ingresa un correo válido.");
    return false;
  }

  clearError(errorCorreo);
  return true;
};
function validateContrasena (){
  const passwordValue = passInput.value;

  if (!passwordValue) {
    setError(errorContrasena, "Por favor ingresa una contraseña");
    return false;
  }

  clearError(errorContrasena);
  return true;
};

/* función boton ingresar */

function ingresar(e) {
  // evita que se recargue la página
  e.preventDefault();
  // Validaciones antes de continuar
  const isEmailValid = validateEmail();
  const isPassValid = validateContrasena();
  if (!isEmailValid || !isPassValid) {
    return;
  }

  console.log("Formulario enviado");

  const emailValue = emailInput.value;
  const passwordValue = passInput.value;

  /* traer los usuarios y mira que el email exista */
  const usuarios = getUsuarios();
  const existingUsuario = usuarios.find((usuario) => usuario.correo === emailValue);

  if(!existingUsuario){
    setError(errorFormulario, "Correo no registrado, registrate");
  }
  
  if (existingUsuario && existingUsuario.contrasena == passwordValue) {
    console.log("Usuario existente");
    console.log("contraseña correcta");
    const usuarioActivoData ={
    id: existingUsuario.id,
    nombre: existingUsuario.nombre
    };
    const usuarioActivo = [];
    usuarioActivo.push(usuarioActivoData);
    saveUsuarioActivo(usuarioActivo);
    console.log("usuario activo guardado");
    form.reset();
    }

  if (existingUsuario && existingUsuario.contrasena != passwordValue){
     setError(errorFormulario, "Olvidaste tu contraseña?");
  }
  console.log(emailValue);
  console.log(passwordValue);
}


