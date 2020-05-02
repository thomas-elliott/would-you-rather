using Microsoft.EntityFrameworkCore;
using WouldYouRather.Entities;

namespace WouldYouRather.Contexts
{
    public class GameContext : DbContext
    {
        public GameContext(DbContextOptions<GameContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
        
        public DbSet<Game> Games { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<Player> Players { get; set; }
        public DbSet<GameStatus> GameState { get; set; }
    }
}