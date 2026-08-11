using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ControleDeGastos.Data;
using ControleDeGastos.Models;

namespace ControleDeGastos.Controllers
{
    [ApiController]
    [Route("api/[controller]")] 
    public class PessoasController : ControllerBase
    {
        private readonly AppDbContext _context;

        // bd 
        public PessoasController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetPessoas()
        {
            // pega a tabela Pessoas retiorna lista
            var pessoas = await _context.Pessoas.ToListAsync();
            
            return Ok(pessoas); 
        }
        [HttpPost]
        public async Task<IActionResult> PostPessoa(Pessoa pessoa)
        {
            // Adiciona a pessoa na memória do Entity Framework
            _context.Pessoas.Add(pessoa);
            
            // Confirma a transação e salva de fato no banco de dados SQLite
            await _context.SaveChangesAsync();
            
            // Retorna o Status 201 (Created) e mostra a pessoa que acabou de ser criada
            return CreatedAtAction(nameof(GetPessoas), new { id = pessoa.Id }, pessoa);
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePessoa(int id)
        {
            // 1. Busca a pessoa no banco pelo ID
            var pessoa = await _context.Pessoas.FindAsync(id);

            // 2. Se não existir, retorna Status 404 (Não Encontrado)
            if (pessoa == null)
            {
                return NotFound();
            }

            // 3. Remove a pessoa da memória do Entity Framework
            _context.Pessoas.Remove(pessoa);

            // 4. Salva a alteração no banco de dados
            // É EXATAMENTE AQUI que a mágica do Cascade acontece e apaga as transações junto!
            await _context.SaveChangesAsync();

            // 5. Retorna Status 204 (Sem Conteúdo), que é o padrão correto para um Delete de sucesso
            return NoContent();
        }
    }
}