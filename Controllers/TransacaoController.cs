using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ControleDeGastos.Data;    
using ControleDeGastos.Models;

namespace ControleDeGastos.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransacaoController : ControllerBase
    {
        private readonly AppDbContext _context;

        // bd 
        public TransacaoController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetTransacoes()
        {
            // O Include faz o JOIN automático com a tabela de Pessoas!
            var transacoes = await _context.Transacoes
                                           .Include(t => t.Pessoa) 
                                           .ToListAsync();
            
            return Ok(transacoes); 
        }
        [HttpPost]
        public async Task<IActionResult> PostTransacao(Transacao transacao)
        {
            // 1. Vai no banco procurar quem é a pessoa dona dessa transação
            var pessoa = await _context.Pessoas.FindAsync(transacao.PessoaId);

            // Se passaram um ID de pessoa que não existe, já bloqueia aqui
            if (pessoa == null)
            {
                return NotFound("Pessoa não encontrada.");
            }

            // confere a idade e o tipo da transação
            if (pessoa.Idade < 18 && transacao.Tipo == TipoTransacao.Receita) 
            {
                return BadRequest("Menores de 18 anos só podem cadastrar despesas.");
            }

            // Se passou pelas validações....
            _context.Transacoes.Add(transacao);
            await _context.SaveChangesAsync();
            
            return CreatedAtAction(nameof(GetTransacoes), new { id = transacao.Id }, transacao);
        }
    }
}