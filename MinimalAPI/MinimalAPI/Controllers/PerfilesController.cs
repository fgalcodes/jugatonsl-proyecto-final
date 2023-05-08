﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MinimalAPI.Models;
using MinimalAPI.Repositories;

namespace MinimalAPI.Controllers
{
    // Controlador de la tabla Perfil
    [Route("api/[controller]")]
    [ApiController]
    public class PerfilesController : ControllerBase
    {
        // Instanciación de la clase UsuariosRepository.
        private readonly PerfilesRepository perfilesRepository;
        public PerfilesController(PerfilesRepository perfilesRepository)
        {
            this.perfilesRepository = perfilesRepository;
        }

        // Método GET para recuperar todos los perfiles de la tabla.
        [HttpGet]
        public async Task<IActionResult> GetAllPerfiles()
        {
            return Ok(await perfilesRepository.GetAllPerfiles());
        }

        // Método GET para recuperar un perfil en concreto de la tabla.
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPerfil(int id)
        {
            return Ok(await perfilesRepository.GetPerfil(id));
        }

        // Método PUT para actualizar un perfil concreto de la tabla.
        [HttpPut]
        public async Task<IActionResult> UpdatePerfil([FromBody] Perfil perfil)
        {
            if (perfil == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var update = await perfilesRepository.UpdatePerfil(perfil);
            return Created("Actualizado!", update);
        }
    }
}
