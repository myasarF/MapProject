using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Map.Core.Interfaces
{
    public interface IGenericRepository<T> where T : class
    {


        Task<T> AddAsync(T entity);

        Task<T> GetAsync();

    }
}

