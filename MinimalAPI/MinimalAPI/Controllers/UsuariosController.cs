using Microsoft.AspNetCore.Mvc;
using MinimalAPI.Models;
using MinimalAPI.Repositories;

namespace MinimalAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly UsuariosRepository usuariosRepository;
        public UsuariosController(UsuariosRepository usuariosRepository)
        {
            this.usuariosRepository = usuariosRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsuarios()
        {
            return Ok(await usuariosRepository.GetAllUsuarios());

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUsuarioNombre(int id)
        {
            return Ok(await usuariosRepository.GetUsuario(id));
        }
        [HttpPost]
        public async Task<IActionResult> CreateUsuario([FromBody] Usuario usuario)
        {
            if (usuario == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var created = await usuariosRepository.InsertUsuario(usuario);
            return Created("Creado!", created);
        }

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

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsuario(int id)
        {
            var deleted = await usuariosRepository.DeleteUsuario(new Usuario { id = id });
            return Created("Eliminado!", deleted);
        }
    }
}
