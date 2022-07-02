using Map.Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Map.EF.Repositories
{
    public class BaseGenericRepository<T> : IGenericRepository<T> where T : class
    {
        protected MapDbContext _context;

        public BaseGenericRepository(MapDbContext context)
        {
            _context = context;
        }


        public async Task<T> AddAsync(T entity)
        {
           
            _context.Set<T>().RemoveRange(_context.Set<T>());

            await _context.Set<T>().AddAsync( entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<T> GetAsync()
        {
            var obj = await _context.Set<T>().FirstOrDefaultAsync();
            await _context.SaveChangesAsync();
            return obj;
        }

       
    }
}
