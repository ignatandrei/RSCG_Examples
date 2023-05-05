using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DapperExampleDAL
{
    public partial  class DapperDAL
    {
        [Command("select * from person where id=@id")]
        public static partial Person GetOne(DbConnection connection, int id);

		[Command("select * from person",CommandType = CommandType.Text)]
		public static partial Person[] GetAll(DbConnection connection); 

    }


	
}
