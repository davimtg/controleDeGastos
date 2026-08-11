namespace ControleDeGastos.Dtos
{
    public class ResumoTotaisDto
    {
        public List<PessoaTotalDto> Pessoas { get; set; } = new();
        public decimal TotalGeralReceitas { get; set; }
        public decimal TotalGeralDespesas { get; set; }
        public decimal SaldoGeral => TotalGeralReceitas - TotalGeralDespesas;
    }
}
