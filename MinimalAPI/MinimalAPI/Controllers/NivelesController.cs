using Microsoft.AspNetCore.Mvc;
using MinimalAPI.Models;
using MinimalAPI.Repositories;
using System.Text.Json.Nodes;

namespace MinimalAPI.Controllers
{
    // Controlador de la tabla Nivel
    [Route("api/[controller]")]
    [ApiController]
    public class NivelesController : ControllerBase
    {
        // Instanciación de la clase NivelesRepository.
        private readonly NivelesRepository nivelesRepository;
        public NivelesController (NivelesRepository nivelesRepository)
        {
            this.nivelesRepository = nivelesRepository;
        }

        // Método GET para recuperar todos los niveles de la tabla.
        [HttpGet]
        public async Task<IActionResult> GetAllNiveles()
        {
            return Ok(await nivelesRepository.GetAllNiveles());

        }

        // Método GET para recuperar un nivel en concreto de la tabla.
        [HttpGet("{id}")]
        public async Task<IActionResult> GetNivelNombre(int id)
        {
            return Ok(await nivelesRepository.GetNivel(id));
        }

        // Método POST para crear un nivel e insertarlo en la tabla.
        [HttpPost]
        public async Task<IActionResult> CreateUsuarioWeb([FromForm] Nivel nivel)
        {
            if (nivel == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var insert = await nivelesRepository.InsertNivel(nivel);
            return Created("Creado!", insert);
        }

        // Método PUT para actualizar un nivel concreto de la tabla.
        [HttpPut]
        public async Task<IActionResult> UpdateNivel([FromBody] Nivel nivel)
        {
            if (nivel == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var update = await nivelesRepository.UpdateNivel(nivel);
            return Created("Actualizado!", update);
        }

        // Método DELETE para eliminar un nivel concreto de la tabla.
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNivel(int id)
        {
            var deleted = await nivelesRepository.DeleteNivel(new Nivel { idNivel = id });
            return Created("Eliminado!", deleted);
        }
    }
}

