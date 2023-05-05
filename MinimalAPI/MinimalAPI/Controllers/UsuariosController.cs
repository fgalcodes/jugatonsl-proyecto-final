using Microsoft.AspNetCore.Mvc;
using MinimalAPI.Models;
using MinimalAPI.Repositories;
using System.Text.Json.Nodes;

namespace MinimalAPI.Controllers
{
    // Controlador de la tabla Usuario
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        // Instanciación de la clase UsuariosRepository.
        private readonly UsuariosRepository usuariosRepository;
        public UsuariosController(UsuariosRepository usuariosRepository)
        {
            this.usuariosRepository = usuariosRepository;
        }

        // Método GET para recuperar todos los usuarios de la tabla.
        [HttpGet]
        public async Task<IActionResult> GetAllUsuarios()
        {
            return Ok(await usuariosRepository.GetAllUsuarios());

        }

        // Método GET para recuperar un usuario en concreto de la tabla.
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUsuarioNombre(int id)
        {
            return Ok(await usuariosRepository.GetUsuario(id));
        }

        // Método POST para crear un usuario e insertarlo en la tabla.
        [HttpPost]
        public async Task<IActionResult> CreateUsuarioWeb([FromForm] UsuarioSinId usuario)
        {
            if (usuario == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var insert = await usuariosRepository.InsertUsuario(usuario);
            return Created("Creado!", insert);
        }

        // Método PUT para actualizar un usuario concreto de la tabla.
        [HttpPut]
        public async Task<IActionResult> UpdateUsuario([FromBody] Usuario usuario)
        {
            if (usuario == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var update = await usuariosRepository.UpdateUsuario(usuario);
            return Created("Actualizado!", update); 
        }

        // Método DELETE para eliminar un usuario concreto de la tabla.
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsuario(int id)
        {
            var deleted = await usuariosRepository.DeleteUsuario(new Usuario { id = id });
            return Created("Eliminado!", deleted);
        }
    }
}
