using Map.Core.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;


using System.Text;

namespace Map.EF
{
    public class MapDbContext : DbContext
    {
        public MapDbContext(DbContextOptions<MapDbContext> options) : base(options)
        {
        }
        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<Shapes>()
        //        .Property<string>("JsonData")
        //        .HasField("_jsonData");
        //}

        public DbSet<Shapes> Shapes { get; set; }

    }
}
