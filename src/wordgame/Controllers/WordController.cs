using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using wordgame.Models;


namespace wordgame.Controllers
{
    [Route("api/[controller]")]
    public class WordController : Controller
    {
        // GET: api/word
        [HttpGet]
        public string Get()
        {
            return Word.RandomWord();
        }
    }
}
